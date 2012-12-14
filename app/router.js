define([
  // Application.
  "app",

  'pubsub',

  'backbone',

  'jqmobile'

],

function(app, E) {

  var redrawTimeout = null;

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    initialize: function() {

      // Trigger the initial route and enable HTML5 History API support, set the
      // root folder to '/' by default.  Change in app.js.
      Backbone.history.start({ pushState: false, root: app.root });

    },

    routes: {
      "":       "index",
      ":page":  "goToPage"
    },

    index: function() {

      E.publish('newPage');

      require(['homeMain'], function(main) {

        $.mobile.changePage('#home');

      });

    },

    goToPage: function(page) {

      if (app.isLoggedIn) {

        require([page + 'Main'], function(main) {

          $.mobile.changePage('#' + page, {reverse: false, changeHash: false});

        });

      } else {

        require(['homeMain'], function(main) {

          $.mobile.changePage('#home');

        });

      }

      redrawTimeout = setTimeout(function() {

        E.publish('refreshChart');

      }, 200);

    }

  });

  return Router;

});
