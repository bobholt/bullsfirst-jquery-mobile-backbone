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
          var newPosition = {};

          newPosition.quantity = position.quantity;
          newPosition.name = position.instrumentName;
          newPosition.symbol = position.instrumentSymbol;
          newPosition.marketValue = position.marketValue.amount;

          if (position.totalCost) {

              newPosition.lastTrade = position.lastTrade.amount;
              newPosition.pricePaid = position.pricePaid.amount;
              newPosition.totalCost = position.totalCost.amount;
              newPosition.cashPosition = 0;

          } else if (position.instrumentSymbol === "CASH") {

              newPosition.totalCost = position.marketValue.amount;
              newPosition.cashPosition = position.marketValue.amount;
              newPosition.quantity = position.marketValue.amount;
              newPosition.lastTrade = 1;
              newPosition.pricePaid = 1;

          }

          newPosition.gain = newPosition.marketValue - newPosition.totalCost;
          newPosition.gainPercent = (newPosition.gain / newPosition.totalCost) * 100;

          if (duplicateIndex === -1) {

              chartData.push(newPosition);
              nameArray.push(position.instrumentSymbol);

          } else {

              chartItem.marketValue += newPosition.marketValue;
              chartItem.totalCost += newPosition.totalCost;
              chartItem.cashPosition += newPosition.cashPosition;
              chartItem.quantity += newPosition.quantity;

              chartItem.gain += newPosition.gain;
              chartItem.gainPercent = chartItem.gain / chartItem.totalCost * 100;

          }

      });

      return chartData.sort(function(a, b) {

        return b.gainPercent - a.gainPercent;

      });

    }

  }

);