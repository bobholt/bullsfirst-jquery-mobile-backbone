define(
  [

    'backbone',

    'superview'

  ],

  function(){

    var Module = {};

    Module.Model = Backbone.Model.extend({

    });

    Module.View = Backbone.SuperView.extend({

      render: function() {

        return this.renderInPlace();

      }

    });

    return Module;

  }

);