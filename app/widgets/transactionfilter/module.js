define(
  [

    'text!widgets/transactionfilter/templates/base.html',

    'app',

    'backbone',

    'superview'

  ],

  function(baseTemplate, app){

    var Module = {};

    Module.View = Backbone.SuperView.extend({

      tagName: 'form',

      id: 'filter-form',

      template: baseTemplate,

      events: {

        "click .show-hide": 'showHideFilters'
      },

      postPlaceAt: function(){

        // Trigger jQuery Mobile to do its magic on the inserted form
        this.$el.trigger('create');

      },

      showHideFilters: function(e) {

        e.preventDefault();

        var filters = this.$el.find('.filters');

        if (filters.is(':visible')) {

          filters.slideUp();
          $(e.currentTarget).find('.label').text('Show');

        } else {

          filters.slideDown();
          $(e.currentTarget).find('.label').text('Hide');

        }

      }

    });

    return Module;

  }

);