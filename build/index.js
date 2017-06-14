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
(function (app) {
  'use strict';

  app.utils = {
    addGradientText,
  };

  function addGradientText({ text = "- phaser gradient text -" }) {
    const gameText = app.game.add.text(app.game.world.centerX, app.game.world.centerY, text);
    //  Centers the text
    gameText.anchor.set(0.5);
    gameText.align = 'center';

    //  Our font + size
    gameText.font = 'Arial';
    gameText.fontWeight = 'bold';
    gameText.fontSize = 70;

    //  Here we create a linear gradient on the Text context.
    //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
    var grd = gameText.context.createLinearGradient(0, 0, 0, gameText.height);

    //  Add in 2 color stops
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');

    //  And apply to the Text
    gameText.fill = grd;
  }
})(window.App);
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
(function (app) {
  'use strict';
  const local = {
    aliens: null,
    player: null,
    lastSpawn: 0,
  };
  const SPAWN_PERIOD = 500; // 5 seconds

  function spawnAlien() {
    var s = local.aliens.create(app.game.world.randomX, app.game.world.randomY, 'space-baddie');
    s.name = `alien-${local.aliens.length}`;
    s.body.collideWorldBounds = true;
    s.body.bounce.setTo(0.8, 0.8);
    s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
  }

  app.states.play = {
    create: () => {

      app.game.stage.backgroundColor = "#FFFFFF";
      app.game.add.image(app.game.world.centerX, app.game.world.centerY, 'hotdog').anchor.set(0.5);

      local.player = app.game.add.sprite(100, 200, 'gishusmaximus');
      local.player.animations.add('eat');
      local.player.animations.play('eat', 60, true);
      local.player.frame = 0;
      app.game.add.existing(local.player);
      local.player.anchor.setTo(.5, 1);
      app.game.physics.arcade.enable(local.player);
      local.player.body.immovable = true;


      // ALIENS
      local.aliens = app.game.add.group();
      local.aliens.enableBody = true;
    },
    update: () => {
      app.game.physics.arcade.collide(local.player, local.aliens, collisionHandler, null, this);

      const time = app.game.time.time;
      if (time - local.lastSpawn > SPAWN_PERIOD) {
        local.lastSpawn = time;
        spawnAlien();
      }
      if (app.game.input.mousePointer.isDown) {
        //  First is the callback
        //  Second is the context in which the callback runs, in this case game.physics.arcade
        //  Third is the parameter the callback expects - it is always sent the Group child as the first parameter
        local.aliens.forEach(app.game.physics.arcade.moveToPointer, app.game.physics.arcade, false, 200);
      }
    },
    // render: () => app.game.debug.quadTree(app.game.physics.arcade.quadTree),
  };

  function collisionHandler(player, alien) {
    console.warn('collisionHandler');
    alien.kill();
  }
})(window.App);
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