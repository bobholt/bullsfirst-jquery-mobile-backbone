define(
  [

    'baseWidget',

    'loginformModule',

    'pubsub'

  ],

  function(Widget, loginformModule, E){

    return function(options) {

      var loginform = new Widget();

      loginform.view = new loginformModule.View().render().placeAt(options.element);

    };

  }

);