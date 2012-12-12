(function(){

var GLChart = window.GLChart = function(selector, chartData, options){

  var chart = this;
  var chartSection = chart.chartSection = $(selector);

  chart.chartData = chartData;
  chart.options = options;

  chart.paper = new Raphael(chartSection.get(0), chartSection.width(), chartSection.height());

};

GLChart.prototype.render = function(){

  var chartSection = this.chartSection;
  var chartData = this.chartData;
  var paper = this.paper;

  var colorInvestment = '#D9D9D9';
  var colorGain = '#F89F20';
  var colorLoss = '#EF4723';
  var colorCash = '#C4C4C4';
  var gapWidth = 2;

  // Calculate aggregates
  var totalInvestment = 0;

  $.each(chartData, function(index, position) {

      totalInvestment += position.totalCost;

  });


  var chartWidth = chartSection.width();
  var chartHeight = chartSection.height();

  var numGaps = chartData.length - 1;

  var totalPositionWidth = chartWidth - (numGaps * gapWidth);

  paper.setSize(chartWidth, chartHeight);
  paper.clear();

  // Draw chartData
  var nextX = 0;
  var height = 0;

  $.each(chartData, function(index, position) {

    var positionWidth = Math.round((position.totalCost/totalInvestment) * totalPositionWidth);
    var gainPercent = position.gainPercent;

    if (gainPercent >= 0) {

      if (gainPercent > 0) {

        // Draw the gain bar
        height = Math.round((gainPercent/100) * (chartHeight/2));
        paper.rect(nextX, (chartHeight/2) - height, positionWidth, height).attr({'stroke-width': 0, 'fill': colorGain});

      }

      // Draw the investment bar
      var color = (position.symbol === 'CASH') ? colorCash : colorInvestment;
      paper.rect(nextX, chartHeight/2, positionWidth, chartHeight/2).attr({'stroke-width': 0, 'fill': color});

    }

    else {

      // Draw the loss bar
      height = Math.round((-gainPercent/100) * (chartHeight/2));
      paper.rect(nextX, (chartHeight/2), positionWidth, (chartHeight/2) + height).attr({'stroke-width': 0, 'fill': colorLoss});

      // Draw the remaining investmet bar
      paper.rect(nextX, chartHeight/2 + height, positionWidth, chartHeight).attr({'stroke-width': 0, 'fill': colorInvestment});

    }

    nextX += (positionWidth + gapWidth);

  });

};

return this;

}());