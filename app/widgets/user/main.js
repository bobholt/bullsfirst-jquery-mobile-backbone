define(
  [

    'userModule',

    'app'

  ],

  function(userModule, app){

    return function(options) {

      var userData = {
        marketValue: 0,
        totalCost: 0,
        gain: 0
      };

      app.isLoggedIn = true;

      var userModel = null;

      var accountsCollection = new userModule.AccountsCollection();

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

          userData.accounts = collection;

          userModel = app.userModel = new userModule.UserModel(userData);

          app.router.navigate(options.href, {trigger: true});

        }

      });

    };

  }

);