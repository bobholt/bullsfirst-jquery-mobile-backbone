define(
  [

    'text!widgets/gainlossfooter/templates/base.html',

    'app',

    'backbone',

    'superview'

  ],

  function(baseTemplate, app){

    var Module = {};

    Module.View = Backbone.SuperView.extend({

      tagName: 'ul',

      template: baseTemplate,

      postPlaceAt: function() {

        this.$el.find('.' + this.options.activeEl + ' a').addClass('active-tab');

      }

    });

    return Module;

  }

);