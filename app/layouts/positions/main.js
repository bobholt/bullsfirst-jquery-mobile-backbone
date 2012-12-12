define(
  [

    'positionsModule',

    'app',

    'pubsub'

  ],

  function(positionsModule, app, E){

    var userAccounts = computePositionData(app.userModel.get('accounts'));

    var positionsCollection = new positionsModule.Collection(userAccounts);

    var positionsView = new positionsModule.View({

      el: $('#positions'),
      collection: positionsCollection

    }).render();

    function computePositionData(accounts) {

      var allPositions = _.flatten(accounts.pluck('positions'));
      var nameArray = [];
      var chartData = [];

      $.each(allPositions, function(index, position) {

          var duplicateIndex = nameArray.indexOf(position.instrumentSymbol);
          var chartItem = chartData[duplicateIndex];

          position.name = position.instrumentName;
          position.symbol = position.instrumentSymbol;
          position.marketValue = position.marketValue.amount;

          if (position.totalCost) {

              position.lastTrade = position.lastTrade.amount;
              position.pricePaid = position.pricePaid.amount;
              position.totalCost = position.totalCost.amount;
              position.cashPosition = 0;

          } else if (position.instrumentSymbol === "CASH") {

              position.totalCost = position.marketValue;
              position.cashPosition = position.marketValue;
              position.quantity = position.marketValue;
              position.lastTrade = 1;
              position.pricePaid = 1;

          }

          position.gain = position.marketValue - position.totalCost;
          position.gainPercent = (position.gain/position.totalCost) * 100;


          if (duplicateIndex === -1) {

              chartData.push(position);
              nameArray.push(position.instrumentSymbol);

          } else {

              chartItem.marketValue += position.marketValue;
              chartItem.totalCost += position.totalCost;
              chartItem.cashPosition += position.cashPosition;
              chartItem.quantity += position.quantity;

              chartItem.gain += position.gain;
              chartItem.gainPercent = chartItem.gain / chartItem.totalCost * 100;

          }

      });

      return chartData.sort(function(a, b){

        return b.gainPercent - a.gainPercent;

      });

    }

    // E.subscribe('newPage', function() {

    //   positionsView.destroy();

    // });

  }

);