const CANVAS_CONTAINER_ID = 'canvas_container';
window.App = {
  // Phaser Game instance
  game: null,
  // Phaser states
  states: {},
};

(function (app) {
  'use strict';

  window.onload = function () {
    const height = window.innerHeight;
    const width = window.innerWidth;
    console.info('Game init width: %s height: %s', width, height);
    app.game = new window.Phaser.Game(width, height, window.Phaser.AUTO, CANVAS_CONTAINER_ID);
    app.game.state.add('load', app.states.load);
    app.game.state.add('title', app.states.title);
    app.game.state.add('play', app.states.play);
    app.game.state.start('load');
  }
})(window.App);