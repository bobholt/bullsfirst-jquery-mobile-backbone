define(
  [

    'app',

    'backbone',

    'superview',

    'raphael'

  ],

  function(app){

    var Module = {};

    Module.View = Backbone.SuperView.extend({

      className: 'gain-loss-chart',

      createChart: function() {

        var chartView = this;

        chartView.chart = new Raphael(chartView.el, chartView.$el.width(), chartView.$el.height());

      },

      drawChart: function() {

        var chartView = this;

        var chart = chartView.chart;

        var chartData = chartView.collection;

        var colorInvestment = '#D9D9D9';
        var colorGain = '#F89F20';
        var colorLoss = '#EF4723';
        var colorCash = '#C4C4C4';
        var gapWidth = 2;

        var numGaps = chartData.length - 1;

        var chartWidth = chartView.$el.width();
        var chartHeight = chartView.$el.height();

        var totalPositionWidth = chartWidth - (numGaps * gapWidth);

        var totalInvestment = 0;

        var nextX = 0;
        var height = 0;

        chartData.each(function(position, i) {

          totalInvestment += position.get('totalCost');

        });

        chart.setSize(chartWidth, chartHeight);
        chart.clear();

        // Draw chartData
        chartData.each(function(position, index) {

          var positionWidth = Math.round((position.get('totalCost')/totalInvestment) * totalPositionWidth);

          var gainPercent = position.get('gainPercent');

          if (gainPercent >= 0) {

            if (gainPercent > 0) {

              // Draw the gain bar
              height = Math.round((gainPercent/100) * (chartHeight/2));
              chart.rect(nextX, (chartHeight/2) - height, positionWidth, height).attr({'stroke-width': 0, 'fill': colorGain});

            }

            // Draw the investment bar
            var color = (position.get('symbol') === 'CASH') ? colorCash : colorInvestment;
            chart.rect(nextX, chartHeight/2, positionWidth, chartHeight/2).attr({'stroke-width': 0, 'fill': color});

          }

          else {

            // Draw the loss bar
            height = Math.round((-gainPercent/100) * (chartHeight/2));
            chart.rect(nextX, (chartHeight/2), positionWidth, (chartHeight/2) + height).attr({'stroke-width': 0, 'fill': colorLoss});

            // Draw the remaining investmet bar
            chart.rect(nextX, chartHeight/2 + height, positionWidth, chartHeight).attr({'stroke-width': 0, 'fill': colorInvestment});

          }

          nextX += (positionWidth + gapWidth);

        });

        this.chart = chart;

      },

      postPlaceAt: function() {

        var chartView = this;

        this.$el.empty();

        chartView.createChart();

        // Have to setTimeout because the browser redraw hasn't completed before the chart renders
        setTimeout(function(){

          chartView.drawChart();

        }, 100);

      }

    });

    return Module;

  }

);