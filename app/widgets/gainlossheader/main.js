define(
  [

    'baseWidget',

    'gainlossheaderModule',

    'pubsub'

  ],

  function(Widget, gainlossheaderModule, E){

    return function(options) {

      var gainlossheader = new Widget();

      gainlossheader.view = new gainlossheaderModule.View({

        activeEl: options.active

      }).render().placeAt(options.element, 'first');

    };

  }

);