define([
  // Application.
  "app",

  'pubsub',

  'backbone'

],

function(app, E) {

  var redrawTimeout = null;

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    initialize: function() {

      // Trigger the initial route and enable HTML5 History API support, set the
      // root folder to '/' by default.  Change in app.js.
      Backbone.history.start({ pushState: true, root: app.root });

    },

    routes: {
      "":       "index",
      "login": "index",
      ":page":  "goToPage",
      "positions/:ticker": "showPositionSummary"
    },

    index: function() {

      E.publish('newPage');

      require(['homeMain'], function(main) {

        $.mobile.changePage('#home', {changeHash: false});

        main();

      });

    },

    goToPage: function(page) {

      E.publish('pageChange');

      if (app.isLoggedIn) {

        require([page + 'Main'], function(main) {

          $.mobile.changePage('#' + page, {changeHash: false});

          main();

        });

      } else {

        this.navigate("login", {trigger: true});

      }

    },

    showPositionSummary: function(ticker) {

      E.publish('pageChange');

      if (app.isLoggedIn) {

        require(['positionsummaryMain'], function(main) {

          $.mobile.changePage('#position-summary', {changeHash: false});

          main(ticker);

        });

      } else {

        this.navigate("login", {trigger: true});

      }

    }

  });

  return Router;

});
