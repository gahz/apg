let character;

/* Defining keyboard events */
let key_left = keyboard(65);
let key_up = keyboard(87);
let key_right = keyboard(68);
let key_down = keyboard(83);

let leftWallTexture, floorWallTexture, floorWallHoleTexture, rightWallHoleTexture, rightWallTexture;
let wallsBoundaries = new Array();
let oldValueX, oldValueY;
let jumpRemaining = 0;
let falling;

//load an image and run the `setup` function when it's done
PIXI.loader
  .add(sprite_mainCharacter)
  .load(setup);

//This `setup` function will run when the image has loaded
function setup()
{
  /* Creating background */
  var texture = PIXI.Texture.fromImage(texture_background);
  var tilingSprite = new PIXI.extras.TilingSprite(texture, widthPercent(100), heightPercent(100));
  app.stage.addChild(tilingSprite);

  /* Creating walls (player boundaries) */
  var leftWall = PIXI.Texture.fromImage(texture_walls);
  leftWallTexture = new PIXI.extras.TilingSprite(leftWall, widthPercent(2), heightPercent(80));

  wallsBoundaries.push(leftWallTexture);
  app.stage.addChild(leftWallTexture);

  var floorWall = PIXI.Texture.fromImage(texture_walls);
  floorWallTexture = new PIXI.extras.TilingSprite(floorWall, widthPercent(55), heightPercent(20));

  floorWallTexture.y = heightPercent(80);

  wallsBoundaries.push(floorWallTexture);
  app.stage.addChild(floorWallTexture);

  var floorWallHole = PIXI.Texture.fromImage(texture_walls);
  floorWallHoleTexture = new PIXI.extras.TilingSprite(floorWallHole, widthPercent(20), heightPercent(2));

  floorWallHoleTexture.x= widthPercent(55);
  floorWallHoleTexture.y = heightPercent(88);

  wallsBoundaries.push(floorWallHoleTexture);
  app.stage.addChild(floorWallHoleTexture);

  var rightWallHole = PIXI.Texture.fromImage(texture_walls);
  rightWallHoleTexture = new PIXI.extras.TilingSprite(rightWallHole, widthPercent(35), heightPercent(50));

  rightWallHoleTexture.x = widthPercent(75);
  rightWallHoleTexture.y = heightPercent(40);

  wallsBoundaries.push(rightWallHoleTexture);
  app.stage.addChild(rightWallHoleTexture);

  var rightWall = PIXI.Texture.fromImage(texture_walls);
  rightWallTexture = new PIXI.extras.TilingSprite(rightWall, widthPercent(10), heightPercent(40));

  wallsBoundaries.push(rightWallTexture);
  rightWallTexture.x = widthPercent(90);

  app.stage.addChild(rightWallTexture);

  //Create the character sprite
  character = new PIXI.Sprite(PIXI.loader.resources[sprite_mainCharacter].texture);

  character.vx = 0;
  character.vy = 0;

  character.x = widthPercent(3);
  character.y = widthPercent(1);

  character.width = widthPercent(2);
  character.height = heightPercent(4)

  //Add the character to the stage
  app.stage.addChild(character);

  /* Setting events */
  /* Move when pressing keys */
  key_left.press = () => {
    consoleDebug("pressing left");

    character.vx = -widthPercent(0.5);
  };
  key_left.release = () => {
    consoleDebug("releasing left");

    character.vx = 0;
  };

  key_right.press = () => {
    consoleDebug("pressing right");

    character.vx = widthPercent(0.5);
  };

  key_right.release = () => {
    consoleDebug("releasing right");

    character.vx = 0;
  };

  key_up.press = () => {
    consoleDebug("pressing up "+falling);

    if(jumpRemaining == 0 && falling == false)
      jumpRemaining = 14;
  };

/*
  key_up.press = () => {
    consoleDebug("pressing up");

    character.vy = -heightPercent(0.5);
  };

  key_up.release = () => {
    consoleDebug("releasing up");

    character.vy = 0;
  };

  key_down.press = () => {
    consoleDebug("pressing down");

    character.vy = heightPercent(0.5);
  };

  key_down.release = () => {
    consoleDebug("releasing down");

    character.vy = 0;
  };
*/

  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta)
{
/*
  oldValueX = character.x;
  oldValueY = character.y;
*/
  /* Gravity Effect */
  if( (character.y + character.height + heightPercent(1.1) ) < floorWallTexture.y )
  {
    character.y += heightPercent(1);
    falling = true;
  }else{
    falling = false;
  }

  if( character.x > (floorWallTexture.x + floorWallTexture.width + widthPercent(0.5))
      && (character.y + character.height + heightPercent(1.1) ) < floorWallHoleTexture.y)
  {
    character.y += heightPercent(1);
    falling = true;
  }else{

    if(falling == false)
      falling = false;
  }

  /* Walls boundaries constraints*/
  if( (character.x + character.vx ) < (leftWallTexture.x + leftWallTexture.width) )
    character.vx = 0;

  if( (character.x + character.vx) < ( floorWallTexture.x + floorWallTexture.width + widthPercent(0.6) )
      && (character.y > floorWallTexture.y) )
    character.vx = 0;

  if( ( character.x + character.width + character.vx + widthPercent(0.8) ) > rightWallHoleTexture.x  )
    character.vx = 0;


  if( jumpRemaining > 0 )
  {
    character.y -= heightPercent(2);
    jumpRemaining--;
  }

  character.x += character.vx;
  character.y += character.vy;

/*
  if(!canGoForward(character, wallsBoundaries))
  {
    character.x = oldValueX;
    character.y = oldValueY;
  }
  */
}

function canGoForward(player, boundaries)
{
  var iterator=0;

  for(iterrator=0; iterator<boundaries.length; iterator++)
  {
    if(hitTestRectangle(player, boundaries[iterator]))
      return false;
  }

  return true;
}
