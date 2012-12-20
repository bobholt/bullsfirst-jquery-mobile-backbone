define(
  [

    'baseWidget',

    'openaccountmodalModule'

  ],

  function(Widget, openaccountmodalModule){

    return function(options) {

      var openaccountmodal = new Widget();

      openaccountmodal.view = new openaccountmodalModule.View().render().placeAt(options.element);

    };

  }

);