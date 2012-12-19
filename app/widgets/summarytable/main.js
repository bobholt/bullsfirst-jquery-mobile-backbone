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

      summarytable.model = summarytableModel = new summarytableModule.Model({

        marketValue: userModel.get('marketValue'),
        totalCost: userModel.get('totalCost'),
        gain: userModel.get('gain')

      });

      summarytable.view = summarytableView = new summarytableModule.View({

        model: summarytableModel

      }).render().placeAt(options.element);

    };

  }

);