define(
  [

    'accountsModule',

    'app',

    'pubsub'

  ],

  function(accountsModule, app, E){

    return function() {

      var allAccounts = app.userModel.get('allAccounts');

      var accountsCollection = new accountsModule.Collection(allAccounts);

      var accountsView = new accountsModule.View({

        el: $('#accounts'),
        collection: accountsCollection

      }).render();

      E.subscribe('pageChange', function() {

        accountsView.selectChart();

      });

    };

  }

);