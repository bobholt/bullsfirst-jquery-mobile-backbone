define(
  [

    'layoutinfoModule',

    'app',

    'pubsub'

  ],

  function(layoutinfoModule, app, E){

    var layoutinfoView = new layoutinfoModule.View().render().placeAt('#positions-section');

    $(window).on('resize', $.proxy(layoutinfoView.displayWindowSize, layoutinfoView));

    E.subscribe('newPage', function() {

      layoutinfoView.destroy();

    });

  }

);