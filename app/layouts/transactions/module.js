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

      render: function() {

        return this.renderInPlace();

      },

      postRender: function() {

        app.widgets.create([
          {
            widget: 'gainlossheader',
            element: '#transactions'
          },
          {
            widget: 'gainlossfooter',
            element: '#transactions-footer div',
            active: 'transactions'
          }
        ]);

      }

    });

    return Module;

  }

);