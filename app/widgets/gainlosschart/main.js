define(
  [

    'baseWidget',

    'gainlosschartModule',

    'pubsub'

  ],

  function(Widget, gainlosschartModule, E){

    return function(options) {

      var gainlosschart = new Widget();
      var gainlosschartView = null;

      gainlosschart.view = gainlosschartView = new gainlosschartModule.View({

        collection: options.chartData,
        chartType: options.element.replace('#','').split('-')[0]

      }).render().placeAt(options.element);

      // Attach event listeners
      $(window).on('resize', function() {

        gainlosschartView.drawChart();

      });

      E.subscribe('refreshChart', function() {

        gainlosschartView.drawChart();

      });

      E.subscribe('showChart', function() {

        gainlosschartView.showChart();

      });

    };

  }

);