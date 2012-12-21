define(
  [

    'app',

    'pubsub',

    'backbone',

    'gainLossLayoutView'

  ],

  function(app, E){

    var Module = {};

    Module.Collection = Backbone.Collection.extend();

    Module.View = Backbone.GainLossLayout.extend({

      events: {
        "click .chart-select" : "selectChart",
        "click .table-select" : "selectTable"
      },

      postRender: function() {

        var accountsView = this;

        accountsView.$el.find('.chart-select').addClass('active-view');

        app.widgets.create([
          {
            widget: 'gainlossheader',
            element: '#accounts'
          },
          {
            widget: 'summarytable',
            tableData: accountsView.collection,
            element: '#accounts-summary-wrapper'
          },
          {
            widget: 'gainlosschart',
            chartData: accountsView.collection,
            element: '#accounts-chart-wrapper'
          },
          {
            widget: 'gainlosstable',
            tableData: accountsView.collection,
            element: '#accounts-section',
            tableWrapperId: 'accounts-table-wrapper'
          },
          {
            widget: 'gainlossfooter',
            element: '#accounts-footer div',
            active: 'accounts'
          }
        ]);

      }

    });

    return Module;

  }

);