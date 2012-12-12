define(
  [

    'backbone',

    'superview'

  ],

  function(){

    var Module = {};

    Module.Collection = Backbone.Collection.extend();

    Module.View = Backbone.SuperView.extend({

      render: function() {

        return this.renderInPlace();

      },

      postRender: function() {

        var positionsView = this;

        require([
          'layoutinfoMain',
          'summarytableMain',
          'gainlosschartMain',
          'gainlosstableMain'
        ], function(layoutinfo, summarytable, gainlosschart, gainlosstable) {

          gainlosschart(positionsView.collection);
          gainlosstable(positionsView.collection);

        });

      }

    });

    return Module;

  }

);