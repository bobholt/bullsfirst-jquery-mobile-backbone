define(
  [

    'accountsummaryModule',

    'app'

  ],

  function(accountsummaryModule, app){

    return function(accountName) {

      accountName = decodeURIComponent(accountName);

      var accountAccounts = app.userModel.getPositions(accountName);

      var accountsummaryCollection = new accountsummaryModule.Collection(accountAccounts);

      var accountsummaryModel = new accountsummaryModule.Model({

        account: accountName

      });

      var accountsummaryView = new accountsummaryModule.View({

        el: $('#account-summary'),
        collection: accountsummaryCollection,
        model: accountsummaryModel

      }).render();

    };

  }

);