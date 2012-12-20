define(
  [

    'text!widgets/positiondetailmodal/templates/base.html',

    'app',

    'backbone',

    'modalview'

  ],

  function(baseTemplate, app){

    var Module = {};

    Module.View = Backbone.ModalView.extend({

      template: baseTemplate,

      events: {

        "click .close-button": "closeModal"

      },

      postPlaceAt: function(){

        // Trigger jQuery Mobile to do its magic on the inserted form
        this.$el.trigger('create');

      }

    });

    return Module;

  }

);