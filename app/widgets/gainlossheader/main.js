define(
  [

    'gainlossheaderModule',

    'app',

    'pubsub'

  ],

  function(gainlossheaderModule, app, E){

    return function(options) {

      var gainlossFooterView = new gainlossheaderModule.View({
        activeEl: options.active
      }).render().placeAt(options.element, 'first');

    };

  }

);