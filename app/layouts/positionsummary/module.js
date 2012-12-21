define(
  [

    'app',

    'pubsub',

    'backbone',

    'gainLossLayoutView'

  ],

  function(app, E){

    var Module = {};

    Module.PositionModel = Backbone.Model.extend({

      initialize: function() {

        this.set('cid', this.cid);

      }

    });

    Module.Collection = Backbone.Collection.extend({

      model: Module.PositionModel

    });

    Module.Model = Backbone.Model.extend();

    Module.View = Backbone.GainLossLayout.extend({

      events: {
        "click .chart-select" : "selectChart",
        "click .table-select" : "selectTable"
      },

      postRender: function() {

        var positionsummaryView = this;

        positionsummaryView.$el.find('h1').html('Positions <span class="divider"> &lsaquo; </span><span class="security-name">' + this.model.get('security') + '</span>');

        positionsummaryView.$el.find('.chart-select').addClass('active-view');

        app.widgets.create([
          {
            widget: 'gainlossheader',
            element: '#position-summary'
          },
          {
            widget: 'summarytable',
            tableData: positionsummaryView.collection,
            element: '#position-summary-summary-wrapper'
          },
          {
            widget: 'gainlosschart',
            chartData: positionsummaryView.collection,
            element: '#position-summary-chart-wrapper'
          },
          {
            widget: 'gainlosstable',
            tableData: positionsummaryView.collection,
            element: '#position-summary-section',
            tableWrapperId: 'position-summary-table-wrapper'
          },
          {
            widget: 'gainlossfooter',
            element: '#position-summary-footer div',
            active: 'positions'
          }
        ]);

      }

    });

    return Module;

  }

);