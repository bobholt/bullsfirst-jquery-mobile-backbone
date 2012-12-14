define(
  [

    'text!widgets/summarytable/templates/base.html',

    'app',

    'backbone',

    'superview'

  ],

  function(baseTemplate, app){

    var Module = {};

    Module.Model = Backbone.Model.extend({

    });

    Module.View = Backbone.SuperView.extend({

      tagName: 'table',

      className: "summary-table",

      template: baseTemplate

    });

    return Module;

  }

);