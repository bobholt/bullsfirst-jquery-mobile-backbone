define(
  [

    'summarytableModule',

    'app',

    'pubsub'

  ],

  function(summarytableModule, app, E){

    var userModel = app.userModel;

    var summarytableModel = new summarytableModule.Model({

      marketValue: userModel.get('marketValue'),
      totalCost: userModel.get('totalCost'),
      gain: userModel.get('gain')

    });

    var summarytableView = new summarytableModule.View({

      model: summarytableModel

    }).render().placeAt('#positions-section');

    E.subscribe('newPage', function() {

      summarytableView.destroy();

    });

  }

);