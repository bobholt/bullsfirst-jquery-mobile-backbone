define([

  'pubsub',

  'superview'

], function(E) {


  var GainLossLayout = Backbone.GainLossLayout = Backbone.SuperView.extend({

      selectChart: function() {

        // TODO: keep track of state on a model
        var chart = this.$el.find('.gain-loss-chart-wrapper');
        var table = this.$el.find('.gain-loss-table-wrapper');
        var chartSelect = this.$el.find('.chart-select');
        var tableSelect = this.$el.find('.table-select');

        if (!chart.is(':visible')) {
          chart.show();
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

      }

  });

  return GainLossLayout;

});