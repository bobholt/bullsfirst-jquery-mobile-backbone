define(
  [

    'app',

    'pubsub',

    'backbone',

    'superview'

  ],

  function(app, E){

    var Module = {};

    Module.Collection = Backbone.Collection.extend();

    Module.View = Backbone.SuperView.extend({

      events: {
        "click .chart-select" : "selectChart",
        "click .table-select" : "selectTable"
      },

      selectChart: function() {

        // TODO: keep track of state on a model
        // TODO: extract these out to a prototype
        // var chart = this.$el.find('.gain-loss-chart-wrapper');
        // var table = this.$el.find('.gain-loss-table-wrapper');
        // var chartSelect = this.$el.find('.chart-select');
        // var tableSelect = this.$el.find('.table-select');

        // if (!chart.is(':visible')) {
        //   chart.show();
        //   chartSelect.addClass('active-view');
        //   table.hide();
        //   tableSelect.removeClass('active-view');
        // }

      },

      selectTable: function() {

        // var chart = this.$el.find('.gain-loss-chart-wrapper');
        // var table = this.$el.find('.gain-loss-table-wrapper');
        // var chartSelect = this.$el.find('.chart-select');
        // var tableSelect = this.$el.find('.table-select');

        // if (!table.is(':visible')) {
        //   E.publish('showTable');
        //   tableSelect.addClass('active-view');
        //   chart.hide();
        //   chartSelect.removeClass('active-view');
        // }

      },

      render: function() {

        return this.renderInPlace();

      },

      postRender: function() {

        // var positionsView = this;

        // positionsView.$el.find('.chart-select').addClass('active-view');

        app.widgets.create([
          {
            widget: 'gainlossheader',
            element: '#position-summary'
          },
        //   {
        //     widget: 'summarytable',
        //     element: '#positions-summary-wrapper'
        //   },
        //   {
        //     widget: 'gainlosschart',
        //     chartData: positionsView.collection,
        //     element: '#positions-chart-wrapper'
        //   },
        //   {
        //     widget: 'gainlosstable',
        //     tableData: positionsView.collection,
        //     element: '#positions-section',
        //     tableWrapperId: 'positions-table-wrapper'
        //   },
          {
            widget: 'gainlossfooter',
            element: '#position-summary-footer div',
            active: 'positions'
          }
        ]);

      }

    });

    return Module;

  }

);