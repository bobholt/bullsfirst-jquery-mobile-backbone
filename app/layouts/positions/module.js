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

        var positionsView = this;

        positionsView.$el.find('.chart-select').addClass('active-view');

        app.widgets.create([
          {
            widget: 'gainlossheader',
            element: '#positions'
          },
          {
            widget: 'summarytable',
            tableData: positionsView.collection,
            element: '#positions-summary-wrapper'
          },
          {
            widget: 'gainlosschart',
            chartData: positionsView.collection,
            element: '#positions-chart-wrapper'
          },
          {
            widget: 'gainlosstable',
            tableData: positionsView.collection,
            element: '#positions-section',
            tableWrapperId: 'positions-table-wrapper'
          },
          {
            widget: 'gainlossfooter',
            element: '#positions-footer div',
            active: 'positions'
          }
        ]);

      }

    });

    return Module;

  }

);