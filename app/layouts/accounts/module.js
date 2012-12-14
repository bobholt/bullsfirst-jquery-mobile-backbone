define(
  [

    'app',

    'backbone',

    'superview'

  ],

  function(app){

    var Module = {};

    Module.Collection = Backbone.Collection.extend();

    Module.View = Backbone.SuperView.extend({

      render: function() {

        return this.renderInPlace();

      },

      postRender: function() {

        var accountsView = this;

        app.widgets.create([
          {
            widget: 'layoutinfo',
            element: '#accounts-section'
          },
          {
            widget: 'summarytable',
            element: '#accounts-section'
          },
          {
            widget: 'gainlosschart',
            chartData: accountsView.collection,
            element: '#accounts-section'
          },
          {
            widget: 'gainlosstable',
            tableData: accountsView.collection,
            element: '#accounts-section',
            tableWrapperId: 'accounts-table-wrapper'
          }
        ]);

      }

    });

    return Module;

  }

);