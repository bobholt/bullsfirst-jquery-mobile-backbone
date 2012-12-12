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

      id: 'positions-table-wrapper',

      template: baseTemplate,

      fitTable: function() {

        var tableView = this;

        // Fit table on resize events
        var headerHeight = $('#positions-header').outerHeight(true);
        var summaryHeight = $('#positions-summary').outerHeight(true);
        var chartHeight = $('.gain-loss-chart').outerHeight(true);
        var topHeight = headerHeight + summaryHeight + chartHeight;
        var footerHeight = $('#positions-footer').outerHeight(true);
        var fixedSectionsHeight = topHeight + footerHeight;

        var winHeight = $(window).height();

        $('#positions-table-wrapper').height(winHeight - fixedSectionsHeight);

        setTimeout(function() {

          tableView.myScroll.refresh();

        }, 0);

      },

      postPlaceAt: function() {

        var tableView = this;

        // Setup iScroll
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        this.myScroll = new iScroll('positions-table-wrapper');

        setTimeout(function() {

          tableView.fitTable();

        }, 100);

      }

    });

    return Module;

  }

);