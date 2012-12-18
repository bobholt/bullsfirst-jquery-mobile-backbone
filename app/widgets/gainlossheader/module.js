define(
  [

    'text!widgets/gainlossheader/templates/base.html',

    'app',

    'backbone',

    'superview'

  ],

  function(baseTemplate, app){

    var Module = {};

    Module.View = Backbone.SuperView.extend({

      tagName: 'header',

      className: 'gain-loss-header',

      template: baseTemplate,

      postPlaceAt: function() {
        this.$el.trigger('create');
      }

    });

    return Module;

  }

);