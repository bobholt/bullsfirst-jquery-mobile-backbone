define(
  [

    'transactionsModule',

    'pubsub'

  ],

  function(transactionsModule, E){

    var transactionsView = new transactionsModule.View({

      el: $('#transactions')

    }).render();

  }

);