define(
  [

    'baseWidget',

    'addaccountmodalModule'

  ],

  function(Widget, addaccountmodalModule){

    return function(options) {

      var addaccountmodal = new Widget();

      addaccountmodal.view = new addaccountmodalModule.View().render().placeAt(options.element);

    };

  }

);