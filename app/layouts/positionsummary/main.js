define(
  [

    'positionsummaryModule',

    'app'

  ],

  function(positionsummaryModule, app){

    return function() {

      var userAccounts = app.userModel.get('allAccounts');

      var positionsCollection = new positionsummaryModule.Collection(userAccounts);

      var positionsView = new positionsummaryModule.View({

        el: $('#position-summary'),
        collection: positionsCollection

      }).render();

    };

  }

);