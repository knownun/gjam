(function (app) {
  'use strict';

  app.states.title = {
    create: () => {
      // app.utils.addGradientText({ text: 'Click anywhere to start' });
      // app.game.input.activePointer.capture = true;
      app.game.state.start('play');
    },
    update: () => {
      if (app.game.input.activePointer.isDown) {
        app.game.state.start('play');
      }
    },
  };
})(window.App);