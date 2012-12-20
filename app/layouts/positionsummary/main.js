define(
  [

    'positionsummaryModule',

    'app'

  ],

  function(positionsummaryModule, app){

    return function(ticker) {

      var positionAccounts = app.userModel.getAccounts(ticker);

      var securityName = app.userModel.getSecurityName(ticker);

      var positionsummaryCollection = new positionsummaryModule.Collection(positionAccounts);

      var positionsummaryModel = new positionsummaryModule.Model({

        security: securityName

      });

      var positionsummaryView = new positionsummaryModule.View({

        el: $('#position-summary'),
        collection: positionsummaryCollection,
        model: positionsummaryModel

      }).render();

    };

  }

);