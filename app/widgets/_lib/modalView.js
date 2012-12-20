define([

  'superview'

], function() {


  var ModalView = Backbone.ModalView = Backbone.SuperView.extend({

    className: 'modal',

    initialize: function() {

      var modalView = this;

      $(window).on('keyup', function(e) {

        if (e.which === 27) { // Escape

          modalView.closeModal();

        }

      });

    },

    closeModal: function(e) {

      if (e) {
        e.preventDefault();
      }

      this.destroy();

    }

  });

  return ModalView;

});