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

      events: {

        "click .open-account a": "openAccount"

      },

      openAccount: function() {

        app.widgets.create({
          widget: 'openaccountmodal',
          element: 'body'
        });

      },

      postRender: function() {

        app.widgets.create({
          widget: 'loginform',
          element: '#login-section'
        });

      },

      render: function() {

        return this.renderInPlace();

      }

    });

    return Module;

  }

);