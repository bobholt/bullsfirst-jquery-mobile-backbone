define(
  [

    'backbone',

    'superview'

  ],

  function(){

    var Module = {};

    Module.UserModel = Backbone.Model.extend({
      defaults: {
        marketValue: 0,
        totalCost: 0,
        gain: 0
      }
    });

    Module.AccountsCollection = Backbone.Collection.extend({

      url: '/sample-data/sample.json'

    });

    return Module;

  }

);