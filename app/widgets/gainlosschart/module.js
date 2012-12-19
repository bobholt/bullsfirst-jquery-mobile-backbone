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

        chartView.paper = new Raphael(chartView.el, chartView.$el.width(), chartView.$el.height());

      },

      destroy: function() {

        this.$el.parent().show();

        this.unbind();
        this.remove();

      },

      drawChart: function() {

        if (this.$el.is(':visible')) {

          var chartView = this;

          var paper = chartView.paper;

          var chartData = chartView.collection;

          var colorInvestment = '#D9D9D9';
          var colorGain = '#F89F20';
          var colorLoss = '#EF4723';
          var colorCash = '#C4C4C4';
          var gapWidth = 1;
          var labelSpace = 15;
          var labelAttr = {
            "font-family": "Arial",
            "font-size": "9",
            "transform": "r-90"
          };

          var numGaps = chartData.length - 1;

          var chartWidth = chartView.$el.width();
          var chartHeight = chartView.$el.height();

          var totalPositionWidth = chartWidth - labelSpace - (numGaps * gapWidth);

          var totalInvestment = 0;

          // Set the 'next' bar to start after the label gutter
          var nextX = labelSpace;

          chartData.each(function(position, i) {

            totalInvestment += position.get('totalCost');

          });

          paper.setSize(chartWidth, chartHeight);
          paper.clear();

          // Draw chartData
          chartData.each(function(position, index) {

            var height = 0;
            var x = nextX;
            var y = 0;
            var tooltipCss = {};

            var tooltip = $('<p>').addClass('tooltip').html(position.get('name') + '<br />' + '|');

            var positionWidth = Math.round((position.get('totalCost')/totalInvestment) * totalPositionWidth);

            var gainPercent = position.get('gainPercent');

            if (gainPercent >= 0) {

              height = Math.round((gainPercent/100) * (chartHeight/2));
              y = chartHeight / 2 - height;

              tooltipCss = {
                top: Math.max(y - 18, -18),
                textAlign: x + (positionWidth / 2) - 1 > chartWidth / 2 ? 'right' : 'left'
              };

              if ((x + positionWidth / 2) - 1 > chartWidth / 2) {
                tooltipCss.right = chartWidth - x - (positionWidth / 2);
              } else {
                tooltipCss.left = x + (positionWidth / 2) - 1;
              }

              if (gainPercent > 0) {

                // Draw the gain bar
                paper.rect(x, y, positionWidth, height).attr({'stroke-width': 0, 'fill': colorGain}).mouseover(function() {
                  tooltip.css(tooltipCss).appendTo(chartView.$el);
                }).mouseout(function() {
                  tooltip.remove();
                });

              }

              // Draw the investment bar
              var color = (position.get('symbol') === 'CASH') ? colorCash : colorInvestment;
              paper.rect(nextX, chartHeight/2, positionWidth, chartHeight/2).attr({'stroke-width': 0, 'fill': color}).mouseover(function() {
                  tooltip.css(tooltipCss).appendTo(chartView.$el);
              }).mouseout(function() {
                tooltip.remove();
              });

            }

            else {

              // Draw the loss bar
              height = Math.round((-gainPercent/100) * (chartHeight/2));
              y = chartHeight / 2;

              tooltipCss = {
                top: chartHeight / 2 - 18,
                textAlign: x + (positionWidth / 2) - 1 > chartWidth / 2 ? 'right' : 'left'
              };

              if ((x + positionWidth / 2) - 1 > chartWidth / 2) {
                tooltipCss.right = chartWidth - x - (positionWidth / 2);
              } else {
                tooltipCss.left = x + (positionWidth / 2) - 1;
              }

              paper.rect(x, y, positionWidth, (chartHeight/2) + height).attr({'stroke-width': 0, 'fill': colorLoss}).mouseover(function() {
                  tooltip.css(tooltipCss).appendTo(chartView.$el);
              }).mouseout(function() {
                tooltip.remove();
              });

              // Draw the remaining investmet bar
              paper.rect(nextX, chartHeight/2 + height, positionWidth, chartHeight).attr({'stroke-width': 0, 'fill': colorInvestment}).mouseover(function() {
                  tooltip.css(tooltipCss).appendTo(chartView.$el);
              }).mouseout(function() {
                tooltip.remove();
              });

            }

            nextX += (positionWidth + gapWidth);

          });

          paper.text(4, 62, "GAIN").attr(labelAttr);

          paper.text(4, 185, "INVESTMENT").attr(labelAttr);

          this.paper = paper;

        }

      },

      postPlaceAt: function() {

        var chartView = this;

        chartView.$el.empty();

        chartView.createChart();

        // Have to setTimeout because the browser redraw hasn't completed before the chart renders
        setTimeout(function(){

          chartView.drawChart();

        }, 250);

      },

      showChart: function() {

        var chartView = this;

        chartView.$el.parent().show(function() {

          chartView.drawChart();

        });

      }

    });

    return Module;

  }

);