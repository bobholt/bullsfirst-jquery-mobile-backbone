define(
  [

    'app',

    'backbone',

    'superview'

  ],

  function(app){

    var Module = {};

    Module.Model = Backbone.Model.extend({

    });

    Module.View = Backbone.SuperView.extend({

      postRender: function() {

        app.widgets.create({
          widget: 'loginform',
          element: '#home'
        });

      },

      render: function() {

        return this.renderInPlace();

      }

    });

    return Module;

  }

);