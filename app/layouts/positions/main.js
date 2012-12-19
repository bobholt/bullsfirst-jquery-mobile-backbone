define(
  [

    'positionsModule',

    'app',

    'pubsub'

  ],

  function(positionsModule, app, E){

    return function() {

      var allPositions = app.userModel.getPositions();

      var positionsCollection = new positionsModule.Collection(allPositions);

      var positionsView = new positionsModule.View({

        el: $('#positions'),

        collection: positionsCollection

      }).render();

      E.subscribe('pageChange', function() {

        positionsView.selectChart();

      });

    };

  }

);