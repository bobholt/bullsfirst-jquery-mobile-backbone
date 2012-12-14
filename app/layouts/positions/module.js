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

        var positionsView = this;

        app.widgets.create([
          {
            widget: 'layoutinfo',
            element: '#positions-section'
          },
          {
            widget: 'summarytable',
            element: '#positions-section'
          },
          {
            widget: 'gainlosschart',
            chartData: positionsView.collection,
            element: '#positions-section'
          },
          {
            widget: 'gainlosstable',
            tableData: positionsView.collection,
            element: '#positions-section',
            tableWrapperId: 'positions-table-wrapper'
          }
        ]);

      }

    });

    return Module;

  }

);