define(
  [

    'baseWidget',

    'positiondetailmodalModule'

  ],

  function(Widget, positiondetailmodalModule){

    return function(options) {

      var positiondetailmodal = new Widget();

      positiondetailmodal.model = positiondetailModel = options.positionDetail;

      positiondetailmodal.view = new positiondetailmodalModule.View({

        model: options.positionDetail

      }).render().placeAt(options.element);

    };

  }

);