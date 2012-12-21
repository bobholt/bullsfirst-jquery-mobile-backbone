define(
  [

    'baseWidget',

    'transactionfilterModule',

    'pubsub'

  ],

  function(Widget, transactionfilterModule, E){

    return function(options) {

      var transactionfilter = new Widget();

      transactionfilter.view = new transactionfilterModule.View().render().placeAt(options.element);

    };

  }

);