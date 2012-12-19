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
        var chart = this.$el.find('.gain-loss-chart-wrapper');
        var table = this.$el.find('.gain-loss-table-wrapper');
        var chartSelect = this.$el.find('.chart-select');
        var tableSelect = this.$el.find('.table-select');

        if (!chart.is(':visible')) {
          E.publish('showChart');
          chartSelect.addClass('active-view');
          table.hide();
          tableSelect.removeClass('active-view');
        }

      },

      selectTable: function() {

        var chart = this.$el.find('.gain-loss-chart-wrapper');
        var table = this.$el.find('.gain-loss-table-wrapper');
        var chartSelect = this.$el.find('.chart-select');
        var tableSelect = this.$el.find('.table-select');

        if (!table.is(':visible')) {
          E.publish('showTable');
          tableSelect.addClass('active-view');
          chart.hide();
          chartSelect.removeClass('active-view');
        }

      },

      render: function() {

        return this.renderInPlace();

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