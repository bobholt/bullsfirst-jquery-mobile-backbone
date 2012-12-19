define(
  [

    'homeModule',

    'pubsub'

  ],

  function(homeModule, E){

    return function() {

      var homeView = new homeModule.View({

        el: '#home'

      }).render();

    };

  }

);