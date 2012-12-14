define(
  [

    'layoutinfoModule',

    'app',

    'pubsub'

  ],

  function(layoutinfoModule, app, E){

    return function(options) {

      var layoutinfoView = new layoutinfoModule.View().render().placeAt(options.element);

      $(window).on('resize', $.proxy(layoutinfoView.displayWindowSize, layoutinfoView));

    };

  }

);