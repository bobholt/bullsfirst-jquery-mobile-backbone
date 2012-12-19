define(
  [

    'baseWidget',

    'userModule',

    'app'

  ],

  function(Widget, userModule, app){

    return function(options) {

      var user = new Widget();
      var userModel = null;

      var userData = {};

      var accountsCollection = new userModule.AccountsCollection();

      app.isLoggedIn = true;

      accountsCollection.fetch({

        success: function(collection) {

          userData.accounts = collection;
          // userData.allAccounts = computeAccountData(collection);
          // userData.allPositions = computePositionData(collection);

          user.model = userModel = app.userModel = new userModule.UserModel(userData);

          app.router.navigate(options.href, {trigger: true});

        }

      });

    };

  }

);