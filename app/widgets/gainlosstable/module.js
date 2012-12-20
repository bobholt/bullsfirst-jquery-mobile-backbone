define(
  [

    'text!widgets/gainlosstable/templates/base.html',

    'app',

    'backbone',

    'superview',

    'raphael',

    'iscroll'

  ],

  function(baseTemplate, app){

    var Module = {};

    Module.Model = Backbone.Model.extend();

    Module.View = Backbone.SuperView.extend({

      className: 'gain-loss-table-wrapper',

      template: baseTemplate,

      events: {

        "click tbody tr": "showDetail"

      },

      fitTable: function() {

        var tableView = this;

        // Fit table on resize events
        var headerHeight = $('.gain-loss-header:visible').outerHeight(true);
        var summaryHeight = $('.summary-table:visible').outerHeight(true);
        var chartHeight = $('.gain-loss-chart:visible').outerHeight(true);
        var topHeight = headerHeight + summaryHeight + chartHeight;
        var footerHeight = $('.gain-loss-footer:visible').outerHeight(true);
        var fixedSectionsHeight = topHeight + footerHeight;

        var winHeight = $(window).height();

        this.$el.height(winHeight - fixedSectionsHeight);

        setTimeout(function() {

          tableView.myScroll.refresh();

        }, 0);

      },

      postPlaceAt: function() {

        var tableView = this;

        // Setup iScroll
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        this.myScroll = new iScroll(tableView.options.id);

        setTimeout(function() {

          tableView.fitTable();

        }, 100);

      },

      showDetail: function(e) {

        if (this.options.tableType === 'positions') {

          app.router.navigate("positions/" + $(e.currentTarget).data('ticker'), {trigger: true});

        }

        if (this.options.tableType === 'position-summary') {

          app.widgets.create({

            widget: 'positiondetailmodal',
            element: 'body',
            positionDetail: this.collection.get($(e.currentTarget).data('cid'))

          });

        }

      },

      showTable: function() {

        var tableView = this;

        this.$el.show(function() {

          tableView.fitTable();

        });

      }

    });

    return Module;

  }

);