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

        var accountsummaryView = this;

        accountsummaryView.$el.find('h1').html('Accounts <span class="divider"> &lsaquo; </span><span class="security-name">' + this.model.get('account') + '</span>');

        accountsummaryView.$el.find('.chart-select').addClass('active-view');

        app.widgets.create([
          {
            widget: 'gainlossheader',
            element: '#account-summary'
          },
          {
            widget: 'summarytable',
            tableData: accountsummaryView.collection,
            element: '#account-summary-summary-wrapper'
          },
          {
            widget: 'gainlosschart',
            chartData: accountsummaryView.collection,
            element: '#account-summary-chart-wrapper'
          },
          {
            widget: 'gainlosstable',
            tableData: accountsummaryView.collection,
            element: '#account-summary-section',
            tableWrapperId: 'account-summary-table-wrapper'
          },
          {
            widget: 'gainlossfooter',
            element: '#account-summary-footer div',
            active: 'accounts'
          }
        ]);

      }

    });

    return Module;

  }

);