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

    // The user object to attach user-specific data to
    user: {
      marketValue: 0,
      totalCost: 0,
      gain: 0
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


    // function renderPage(accountsData) {

    //     var accountsChartData = computeAccountsData(accountsData);
    //     var positionsChartData = computePositionsData(accountsData);

    //     // renderAccountsChart(accountsChartData);

    //     function computeAccountsData(accountsData) {

    //         var chartData = [];

    //         $.each(accountsData, function(index, account) {

    //             var accountData = {};

    //             accountData.name = account.name;
    //             accountData.symbol = account.name;
    //             accountData.cashPosition = account.cashPosition.amount;
    //             accountData.marketValue = account.marketValue.amount;
    //             accountData.totalCost = 0;

    //             $.each(account.positions, function (index, position) {

    //                 if (position.totalCost) {

    //                     accountData.totalCost += position.totalCost.amount;

    //                 } else if (position.instrumentSymbol === "CASH") {

    //                     accountData.totalCost += position.marketValue.amount;

    //                 }

    //             });

    //             accountData.gain = accountData.marketValue = accountData.totalCost;
    //             accountData.gainPercent = accountData.gain / accountData.totalCost * 100;

    //             chartData.push(accountData);

    //         });

    //         return chartData.sort(function(a, b){

    //             return b.gainPercent - a.gainPercent;

    //         });

    //     }

    //     function renderAccountsChart(accountsChartData) {

    //         // Render chart
    //         var accountsGainLossChart = new GLChart('#accounts-chart', accountsChartData);

    //         // Render chart whenever the positions page shows
    //         // This is required because SVG does not show when app loads due to display:none
    //         $('#accounts').on('pageshow', $.proxy(accountsGainLossChart.render, accountsGainLossChart));

    //         $(window).resize($.proxy(accountsGainLossChart.render, accountsGainLossChart));

    //         // Render the chart
    //         // This is required in the case when positions page is loaded directly using a bookmark
    //         // In this case a 'pageshow' event is not fired
    //         accountsGainLossChart.render();

    //         return accountsGainLossChart;

    //     }

    // }

  return app;

});
