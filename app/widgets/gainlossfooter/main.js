define(
  [

    'gainlossfooterModule',

    'app',

    'pubsub'

  ],

  function(gainlossfooterModule, app, E){

    return function(options) {

      var gainlossFooterView = new gainlossfooterModule.View({
        activeEl: options.active
      }).render().placeAt(options.element);

    };

  }

);