(function (app) {
  'use strict';

  app.states.load = {
    preload: () => {
      console.info('Loading Arcade Physics');
      app.game.physics.startSystem(window.Phaser.Physics.ARCADE);
      app.utils.addGradientText({ text: 'Loading...' });

      app.game.load.spritesheet('gishusmaximus', 'resources/sprites/gishusmaximus-eat-animation.png', 192, 192);
      app.game.load.image('hotdog', 'resources/sprites/hotdog.png');
      app.game.load.image('space-baddie', 'resources/sprites/space-baddie.png');
    },
    create: () => {
      app.game.state.start('title');
    },
  };
})(window.App);