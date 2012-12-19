define(
  [

    'backbone',

    'superview'

  ],

  function(){

    var Module = {};

    Module.UserModel = Backbone.Model.extend({

      defaults: {

        marketValue: 0,
        totalCost: 0,
        gain: 0

      },

      getAccounts: function(ticker) {

        var accounts = this.get('accounts');

        var chartData = [];

        accounts.each(function(account, index) {

            var accountData = {};
            var positions = account.get('positions');

            if (ticker) {

              positions = _.where(positions, {instrumentSymbol: ticker});

            }

            accountData.name = account.get('name');
            accountData.symbol = account.get('name');
            accountData.cashPosition =  ticker ? 0 : account.get('cashPosition').amount;
            accountData.marketValue = 0;
            accountData.totalCost = 0;

            $.each(positions, function (index, position) {

                accountData.marketValue += position.marketValue.amount;

                if (position.totalCost) {

                    accountData.totalCost += position.totalCost.amount;

                } else if (position.instrumentSymbol === "CASH") {

                    accountData.totalCost += position.marketValue.amount;

                }

            });

            accountData.gain = accountData.marketValue - accountData.totalCost;
            accountData.gainPercent = accountData.gain === 0 ? 0 : accountData.gain / accountData.totalCost * 100;

            chartData.push(accountData);

        });

        return chartData.sort(function (a, b) {

          return b.gainPercent - a.gainPercent;

        });

      },

      getPositions: function() {

        var accounts = this.get('accounts');

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

    });

    Module.AccountsCollection = Backbone.Collection.extend({

      url: 'sample-data/sample.json'

    });

    return Module;

  }

);