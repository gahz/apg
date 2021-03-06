//Create a Pixi Application
let app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

function consoleDebug(message)
{
    if(GLOBAL_debugLevel == "debug")
      console.log(message);
}

function heightPercent(percent)
{
  return (percent/100)*screen.height;
}

function widthPercent(percent)
{
  return (percent/100)*screen.width;
}
