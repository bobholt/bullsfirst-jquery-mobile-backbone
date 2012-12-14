define(
  [

    'loginformModule',

    'app',

    'pubsub'

  ],

  function(loginformModule, app, E){

    return function(options) {

      var loginformView = new loginformModule.View().render().placeAt(options.element);

      E.subscribe('newPage', function() {

        loginformView.destroy();

      });

      E.subscribe('newPage', function() {

        loginformView.destroy();

      });

    };

  }

);