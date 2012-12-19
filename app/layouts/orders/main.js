define(
  [

    'ordersModule',

    'pubsub'

  ],

  function(ordersModule, E){

    return function() {

      var ordersView = new ordersModule.View({

        el: $('#orders')

      }).render();

    };
  }

);