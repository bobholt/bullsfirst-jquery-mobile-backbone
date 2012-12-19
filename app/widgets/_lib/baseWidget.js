define(
  [

    'pubsub'

  ],

  function(E){

    var baseWidget = function() {

      var widget = this;

      E.subscribe('pageChange', function() {

        if (widget.view) {

          widget.view.destroy();

        }

      });

    };

    return baseWidget;

  }

);