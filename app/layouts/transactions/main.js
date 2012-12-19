define(
  [

    'transactionsModule',

    'pubsub'

  ],

  function(transactionsModule, E){

    return function() {

      var transactionsView = new transactionsModule.View({

        el: $('#transactions')

      }).render();

    };

  }

);