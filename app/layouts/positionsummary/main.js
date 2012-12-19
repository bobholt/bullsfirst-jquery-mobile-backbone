define(
  [

    'positionsummaryModule',

    'app'

  ],

  function(positionsummaryModule, app){

    return function(ticker) {

      var positionAccounts = app.userModel.getAccounts(ticker);

      var positionsCollection = new positionsummaryModule.Collection(positionAccounts);

      var positionsView = new positionsummaryModule.View({

        el: $('#position-summary'),
        collection: positionsCollection

      }).render();

    };

  }

);