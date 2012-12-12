define(
  [

    'text!widgets/layoutinfo/templates/base.html',

    'app',

    'backbone',

    'superview'

  ],

  function(baseTemplate, app){

    var Module = {};

    Module.View = Backbone.SuperView.extend({

      className: 'layout-info',

      template: baseTemplate,

      displayWindowSize: function() {

        var win = $(window);

        // Display window size on resize events
        this.$el.find('.window-size').html("(" + win.width() + ", " + win.height() + ")");

      },

      postRender: function() {

        this.displayWindowSize();

      }

    });

    return Module;

  }

);