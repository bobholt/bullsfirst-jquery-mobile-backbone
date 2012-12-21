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

      gainlosstable.collection = gainlosstableCollection = options.tableData;

      console.log(gainlosstableCollection);

      gainlosstable.model = gainlosstableModel = new gainlosstableModule.Model({

        tableData: gainlosstableCollection.toJSON()

      });

      gainlosstable.view = gainlosstableView = new gainlosstableModule.View({

        collection: gainlosstableCollection,
        model: gainlosstableModel,
        scrollElement: options.scrollElement,
        id: options.tableWrapperId,
        tableType: options.element.replace(/^#(.+)-section/g, '$1')

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