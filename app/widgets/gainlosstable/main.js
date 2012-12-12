define(
  [

    'gainlosstableModule',

    'app',

    'pubsub'

  ],

  function(gainlosstableModule, app, E){

    return function(chartData) {

      var gainlosstableModel = new gainlosstableModule.Model({

        chartData: chartData.toJSON()

      });

      var gainlosstableView = new gainlosstableModule.View({

        model: gainlosstableModel

      }).render().placeAt('#positions-section');

      $(window).on('resize', $.proxy(gainlosstableView.fitTable, gainlosstableView));

      E.subscribe('newPage', function() {

        gainlosstableView.destroy();

      });

    };

  }

);