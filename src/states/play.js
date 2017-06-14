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