define(
  [

    'ordersModule',

    'pubsub'

  ],

  function(ordersModule, E){

    var ordersView = new ordersModule.View({

      el: $('#orders')

    }).render();

  }

);