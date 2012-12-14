define(
  [

    'gainlosstableModule',

    'app',

    'pubsub'

  ],

  function(gainlosstableModule, app, E){

    return function(options) {

      var gainlosstableModel = new gainlosstableModule.Model({

        tableData: options.tableData.toJSON()

      });

      var gainlosstableView = new gainlosstableModule.View({

        model: gainlosstableModel,
        scrollElement: options.scrollElement,
        id: options.tableWrapperId

      }).render().placeAt(options.element);

      $(window).on('resize', $.proxy(gainlosstableView.fitTable, gainlosstableView));

    };

  }

);