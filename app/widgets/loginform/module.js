define(
  [

    'text!widgets/loginform/templates/base.html',

    'app',

    'backbone',

    'superview'

  ],

  function(baseTemplate, app){

    var Module = {};

    Module.View = Backbone.SuperView.extend({

      tagName: 'form',

      id: 'login-form',

      template: baseTemplate,

      events: {

        'click #l-login-button': 'login'

      },

      login: function(e) {

        e.preventDefault();
        e.stopPropagation();

        var username = this.$el.find('#l-username').val();
        var password = this.$el.find('#l-password').val();

        // Should check username/password on the server here
        // For demonstration, just pass through
        // Load in the user's data
        app.widgets.create({
          widget: 'user',
          href: e.currentTarget.href
        });

      },

      postPlaceAt: function(){

        // Trigger jQuery Mobile to do its magic on the inserted form
        this.$el.trigger('create');

      }

    });

    return Module;

  }

);