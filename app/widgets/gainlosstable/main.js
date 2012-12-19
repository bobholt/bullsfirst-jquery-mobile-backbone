define(
  [

    'baseWidget',

    'gainlosstableModule',

    'pubsub'

  ],

  function(Widget, gainlosstableModule, E){

    return function(options) {

      var gainlosstable = new Widget();
      var gainlosstableModel = null;
      var gainlosstableView = null;

      gainlosstable.model = gainlosstableModel = new gainlosstableModule.Model({

        tableData: options.tableData.toJSON()

      });

      gainlosstable.view = gainlosstableView = new gainlosstableModule.View({

        model: gainlosstableModel,
        scrollElement: options.scrollElement,
        id: options.tableWrapperId

      }).render().placeAt(options.element);

      // Attach event listeners
      $(window).on('resize', function() {

        gainlosstableView.fitTable();

      });

      E.subscribe('showTable', function() {

        gainlosstableView.showTable();

      });

    };

  }

);