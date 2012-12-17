// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {

    app:                  "app",

    // jQuery
    jquery:               "../libs/js/jquery-1.8.3.min",
    jqformat:             "../libs/js/jquery.format-1.2",
    jqmobile:             "../libs/js/jquery.mobile-1.2.0-rc.1.min",

    // Underscore/Lodash
    underscore:           "../libs/js/lodash.underscore.min",

    // Backbone
    backbone:             "../libs/js/backbone",
    router:               "../app/router",
    superview:            "../libs/js/superview",

    // Templating
    handlebars:           "../libs/js/handlebars-1.0.rc.1",

    // Additional Libraries
    iscroll:              "../libs/js/iscroll",
    raphael:              "../libs/js/raphael",
    pubsub:               "../libs/js/pubsub",

    // Layouts
    accountsMain:         "layouts/accounts/main",
    accountsModule:       "layouts/accounts/module",
    homeMain:             "layouts/home/main",
    homeModule:           "layouts/home/module",
    ordersMain:           "layouts/orders/main",
    ordersModule:         "layouts/orders/module",
    positionsMain:        "layouts/positions/main",
    positionsModule:      "layouts/positions/module",
    transactionsMain:     "layouts/transactions/main",
    transactionsModule:   "layouts/transactions/module",

    // Widgets
    gainlosschartMain:    "widgets/gainlosschart/main",
    gainlosschartModule:  "widgets/gainlosschart/module",
    gainlossfooterMain:   "widgets/gainlossfooter/main",
    gainlossfooterModule: "widgets/gainlossfooter/module",
    gainlosstableMain:    "widgets/gainlosstable/main",
    gainlosstableModule:  "widgets/gainlosstable/module",
    layoutinfoMain:       "widgets/layoutinfo/main",
    layoutinfoModule:     "widgets/layoutinfo/module",
    loginformMain:        "widgets/loginform/main",
    loginformModule:      "widgets/loginform/module",
    summarytableMain:     "widgets/summarytable/main",
    summarytableModule:   "widgets/summarytable/module",
    userMain:             "widgets/user/main",
    userModule:           "widgets/user/module"

  },

  shim: {

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    handlebars: {
      exports: 'Handlebars'
    },

    jqformat: {
      deps: ['jquery'],
      exports: '$.format'
    },

    raphael: {
      exports: 'Raphael'
    },

    underscore: {
      exports: '_'
    }

  }

});
