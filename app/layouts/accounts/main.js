define(
  [

    'accountsModule',

    'pubsub'

  ],

  function(accountsModule, E){

    var accountsView = new accountsModule.View({

      el: $('#accounts')

    }).render();

    // E.subscribe('newPage', function() {

    //   accountsView.destroy();

    // });

  }

);