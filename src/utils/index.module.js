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