define(
  [

    'baseWidget',

    'positiondetailmodalModule'

  ],

  function(Widget, positiondetailmodalModule){

    return function(options) {

      var positiondetailmodal = new Widget();

      positiondetailmodal.view = new positiondetailmodalModule.View({

        model: options.positionDetail

      }).render().placeAt(options.element);

      console.log(options.positionDetail);

    };

  }

);