define(
  [

    'accountsModule',

    'app',

    'pubsub'

  ],

  function(accountsModule, app, E){

    var userAccounts = computeAccountData(app.userModel.get('accounts'));

    var accountsCollection = new accountsModule.Collection(userAccounts);

    var accountsView = new accountsModule.View({

      el: $('#accounts'),
      collection: accountsCollection

    }).render();

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

  }

);