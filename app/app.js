define([

  'pubsub',

  'handlebars',

  'iscroll',

  'jqformat'

],

function(E) {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {

    // The root path to run the application.
    root: "/",

    widgets: {

      create: function(widgets) {

        var args = [].slice.call(arguments, 1);

        if (typeof widgets === 'string') {
          widgets = [{
            widget: widgets
          }];
        }

        if (typeof widgets === 'object' && !Array.isArray(widgets)) {

          widgets = [widgets];

        }

        _.each(widgets, function(widget, index) {

          require([widget.widget + 'Main'], function(main) {

            main(widget);

          });

        });

      },

      destroy: function(widget) {

        require.undef(widget + 'Main');

      }

    }

  };

  // Register Handlebar helpers
  Handlebars.registerHelper('formatMoney', function(amount) {
      return (amount >= 0) ?
          '$' + $.format.number(amount, '#,##0.00') :
          '($' + $.format.number(-amount, '#,##0.00') + ')';
  });

  Handlebars.registerHelper('formatPercent', function(percent) {
      return (percent >= 0) ?
          $.format.number(percent, '#,##0.00') + '%' :
          '(' + $.format.number(-percent, '#,##0.00') + '%)';
  });

  Handlebars.registerHelper('getSign', function(number) {
      return (number >= 0) ? 'positive' : 'negative';
  });

  return app;

});
