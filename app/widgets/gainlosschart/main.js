define(
  [

    'gainlosschartModule',

    'app',

    'pubsub'

  ],

  function(gainlosschartModule, app, E){

    return function(options) {

      var gainlosschartView = new gainlosschartModule.View({

        collection: options.chartData

      }).render().placeAt(options.element);

      $(window).on('resize', $.proxy(gainlosschartView.drawChart, gainlosschartView));

      E.subscribe('newPage', function() {

        gainlosschartView.destroy();

      });

    };

  }

);