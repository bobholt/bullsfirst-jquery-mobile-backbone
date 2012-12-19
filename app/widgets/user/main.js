define(
  [

    'baseWidget',

    'userModule',

    'app'

  ],

  function(Widget, userModule, app){

    return function(options) {

      var user = new Widget();
      var userModel = null;

      var userData = {
        marketValue: 0,
        totalCost: 0,
        gain: 0
      };

      var accountsCollection = new userModule.AccountsCollection();

      app.isLoggedIn = true;

      accountsCollection.fetch({

        success: function(collection) {

          userData = collection.reduce(function(memo, account) {

            var accountCost = _.reduce(account.get('positions'), function(memo, position) {

              var totalCost = 0;

              if (position.totalCost) {

                totalCost = position.totalCost.amount;

              } else if (position.instrumentSymbol === "CASH") {

                totalCost = position.marketValue.amount;

              }

              return memo + totalCost;

            }, 0);

            memo.marketValue += account.get('marketValue').amount;
            memo.totalCost += accountCost;

            return memo;

          }, userData);

          userData.gain = userData.marketValue - userData.totalCost;

          userData.allAccounts = computeAccountData(collection);
          userData.allPositions = computePositionData(collection);

          user.model = userModel = app.userModel = new userModule.UserModel(userData);

          app.router.navigate(options.href, {trigger: true});

        }

      });

      function computeAccountData(accounts) {

        var chartData = [];

        accounts.each(function(account, index) {

            var accountData = {};

            accountData.name = account.get('name');
            accountData.symbol = account.get('name');
            accountData.cashPosition = account.get('cashPosition').amount;
            accountData.marketValue = account.get('marketValue').amount;
            accountData.totalCost = 0;

            $.each(account.get('positions'), function (index, position) {

                if (position.totalCost) {

                    accountData.totalCost += position.totalCost.amount;

                } else if (position.instrumentSymbol === "CASH") {

                    accountData.totalCost += position.marketValue.amount;

                }

            });

            accountData.gain = accountData.marketValue = accountData.totalCost;
            accountData.gainPercent = accountData.gain / accountData.totalCost * 100;

            chartData.push(accountData);

        });

        return chartData.sort(function (a, b) {

          return b.gainPercent - a.gainPercent;

        });

      }

      function computePositionData(accounts) {

        var allPositions = _.flatten(accounts.pluck('positions'));
        var nameArray = [];
        var chartData = [];

        $.each(allPositions, function(index, position) {

            var duplicateIndex = nameArray.indexOf(position.instrumentSymbol);
            var chartItem = chartData[duplicateIndex];
            var newPosition = {};

            newPosition.quantity = position.quantity;
            newPosition.name = position.instrumentName;
            newPosition.symbol = position.instrumentSymbol;
            newPosition.marketValue = position.marketValue.amount;

            if (position.totalCost) {

                newPosition.lastTrade = position.lastTrade.amount;
                newPosition.pricePaid = position.pricePaid.amount;
                newPosition.totalCost = position.totalCost.amount;
                newPosition.cashPosition = 0;

            } else if (position.instrumentSymbol === "CASH") {

                newPosition.totalCost = position.marketValue.amount;
                newPosition.cashPosition = position.marketValue.amount;
                newPosition.quantity = position.marketValue.amount;
                newPosition.lastTrade = 1;
                newPosition.pricePaid = 1;

            }

            newPosition.gain = newPosition.marketValue - newPosition.totalCost;
            newPosition.gainPercent = (newPosition.gain / newPosition.totalCost) * 100;

            if (duplicateIndex === -1) {

                chartData.push(newPosition);
                nameArray.push(position.instrumentSymbol);

            } else {

                chartItem.marketValue += newPosition.marketValue;
                chartItem.totalCost += newPosition.totalCost;
                chartItem.cashPosition += newPosition.cashPosition;
                chartItem.quantity += newPosition.quantity;

                chartItem.gain += newPosition.gain;
                chartItem.gainPercent = chartItem.gain / chartItem.totalCost * 100;

            }

        });

        return chartData.sort(function(a, b) {

          return b.gainPercent - a.gainPercent;

        });

      }

    };

  }

);