define(
  [

    'loginformModule',

    'app',

    'pubsub'

  ],

  function(loginformModule, app, E){

    var loginformView = new loginformModule.View().render().placeAt('#home');

    E.subscribe('newPage', function() {

      loginformView.destroy();

    });

    E.subscribe('newPage', function() {

      loginformView.destroy();

    });

  }

);