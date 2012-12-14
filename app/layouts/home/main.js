define(
  [

    'homeModule',

    'pubsub'

  ],

  function(homeModule, E){

    var homeView = new homeModule.View({

      el: '#home'

    }).render();

  }

);