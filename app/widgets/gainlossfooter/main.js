define(
  [

    'baseWidget',

    'gainlossfooterModule',

    'pubsub'

  ],

  function(Widget, gainlossfooterModule, E){

    return function(options) {

      var gainlossfooter = new Widget();

      gainlossfooter.view = new gainlossfooterModule.View({

        activeEl: options.active

      }).render().placeAt(options.element);

    };

  }

);