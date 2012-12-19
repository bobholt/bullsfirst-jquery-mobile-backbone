define(
  [

    'baseWidget',

    'app',

    'summarytableModule',

    'pubsub'

  ],

  function(Widget, app, summarytableModule, E){

    return function(options) {

      var summarytable = new Widget();
      var summarytableModel = null;
      var summarytableView = null;

      var userModel = app.userModel;

      var summaryData = {
        marketValue: 0,
        totalCost: 0,
        gain: 0
      };

      summaryData = options.tableData.reduce(function(memo, num) {

        memo.marketValue += num.get('marketValue');
        memo.totalCost += num.get('totalCost');

        return memo;

      }, summaryData);

      summaryData.gain = summaryData.marketValue - summaryData.totalCost;

      summarytable.model = summarytableModel = new summarytableModule.Model({

        marketValue: summaryData.marketValue,
        totalCost: summaryData.totalCost,
        gain: summaryData.gain

      });

      summarytable.view = summarytableView = new summarytableModule.View({

        model: summarytableModel

      }).render().placeAt(options.element);

    };

  }

);