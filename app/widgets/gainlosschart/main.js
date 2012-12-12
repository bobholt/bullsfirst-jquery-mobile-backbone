define(
  [

    'gainlosschartModule',

    'app',

    'pubsub'

  ],

  function(gainlosschartModule, app, E){

    return function(chartData) {

      var gainlosschartView = new gainlosschartModule.View({

        collection: chartData

      }).render().placeAt('#positions-section');

      $(window).on('resize', $.proxy(gainlosschartView.drawChart, gainlosschartView));

      E.subscribe('newPage', function() {

        gainlosschartView.destroy();

      });

    };

  }

);