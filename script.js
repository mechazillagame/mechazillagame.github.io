//START SCREEN DOM
var screen = 1;
let button;
let goBtn;
let mechazilla;
let booster;
let SpaceX;
let DMSans;
let ground;
let windSlider;
let weatherSlider;
let landing;
let barrier;
let logo;
let weather;
let weatherText;
let rain;
let snow;
let xvel;
let instructions;

//GAME SCREEN DOM

function preload() {
  SpaceX = loadFont("assets/fonts/SpaceX.ttf");
  DMSans = loadFont("assets/fonts/DMSans.ttf");
  catchSiteBg = loadImage('assets/img/background.jpg');
  mechImg = loadImage('assets/img/mechazilla.png');
  boostImg = loadImage('assets/img/booster.png');
  logo = loadImage('assets/img/logoWBkgd.png');
  rain = loadImage('assets/img/rain.jpg');
  snow = loadImage('assets/img/snow.jpg');
  titleBg = loadImage('assets/img/titlebg.gif');
}

// STEP UP RUNS ONCE
function setup() {
  createCanvas(1230, 715);
  background('#0d0149');
  textAlign(CENTER);
  textSize(20);

  // Instructions button
  instructions = createButton('INSTRUCTIONS');
  instructions.mousePressed(() => {
    window.open('https://mechazillagame.github.io/instructions/');
  });
  instructions.position(width / 2 - 113, height / 2 + 100);
  instructions.style('background-color', '#343cff');
  instructions.style('color', '#efecff');
  instructions.style('border', 'none');
  instructions.style('padding', '20px 40px');
  instructions.style('border-radius', '16px');

  //play button
  button = createButton('PLAY');
  button.mousePressed(() => {
    screen = 2;
  });
  button.position(width / 2 - 60, height / 2 + 180);
  button.style('background-color', '#343cff');
  button.style('color', '#efecff');
  button.style('border', 'none');
  button.style('padding', '20px 40px');
  button.style('border-radius', '16px');

  /* CONFIG SLIDERS HERE */
  // wind
  windSlider = createSlider(-50, 50, 0, 10);
  windSlider.position(-300, 200);

  //weather
  weatherSlider = createSlider(0, 2, 1);
  weatherSlider.position(-300, 200);

  /*GO BUTTON*/
  goBtn = createButton('READY');
  goBtn.mousePressed(() => {
    screen = 3;
  });
  goBtn.position(-200, -200);
  goBtn.style('background-color', '#0d0149');
  goBtn.style('color', '#efecff');
  goBtn.style('border', 'none');
  goBtn.style('padding', '20px 40px');
  goBtn.style('border-radius', '16px');

  //make sprite for mechazilla
  mechazilla = createSprite(-1000, -1000, 0, 600);
  mechazilla.image = 'assets/img/mechazilla.png';
  mechazilla.scale = 1.5;
  mechazilla.collider = "n";

  // Invisible sprite for detecting collision with mechazilla
  noStroke();
  landing = createSprite(-350, -590, 100, 25);
  landing.collider = "s";
  landing.color = 'rgba(0, 255, 0, 0.25)';

  barrier = createSprite(250, 400, 100, height);
  barrier.collider = "s";
  barrier.color = color(0, 0, 0, 0);

  //make sprite for booster
  booster = createSprite(width / 2, -200, 100, 300);
  booster.image = 'assets/img/booster.png';
  booster.scale = 0.5;
  booster.collider = "k";
  booster.velocity.x = 0;
  booster.velocity.y = 0;
} //setup ends

// DRAW LOOPS
function draw() {

  //display start screen
  if (screen === 1) {
    showHome1();
  }

  if (screen === 2) {
    showConfig2();
  }

  if (screen === 3) {
    showGame3();
  }

} //draw loop ends


function showHome1() {
  background(titleBg);
  image(logo, width / 2 - 88, height / 2 - 200, 200, 75);
  goBtn.position(-200, -200);
  textFont(SpaceX, 50);
  textStyle(BOLD);
  textAlign(CENTER);
  fill('#9f8bff');
  text('MECHAZILLA',
    width / 2,
    height / 2);
  textSize(25);
  text('The Game',
    width / 2,
    height / 2 + 70);
}

function showConfig2() {
  background('#efecff');
  goBtn.position(width / 2 - 85, height / 2 + 200);
  button.position(-200, -200);
  instructions.position(-300, -300);

  //config text
  textStyle(BOLD);
  textFont(SpaceX);
  fill('#343cff');
  textAlign(LEFT);
  text('CONFIGURATION',
    100, 100);

  //show sliders
  windSlider.position(50, 250);
  windSlider.style('width', '75%');

  weatherSlider.position(50, 400);
  weatherSlider.style('width', '75%');

  // Get values from sliders
  value1 = windSlider.value();
  weather = weatherSlider.value();

  //show text for sliders
  textSize(24);
  fill('#0d0149');
  textFont(DMSans);
  textAlign(LEFT);
  text(`Wind Speed: ${value1} MPH`, windSlider.x + windSlider.width / 10, windSlider.y - 20); // Text for slider1
  
  booster.rotation = 0;
  // Determine weather type
  let weatherText = "";
  if (weather === 0) {
    weatherText = "Sunny";
  } else if (weather === 1) {
    weatherText = "Rainy";
  } else if (weather === 2) {
    weatherText = "Snowy";
  }

  // Show weather description
  text(`Weather: ${weatherText}`, weatherSlider.x + weatherSlider.width / 10, weatherSlider.y - 20);
  textAlign(LEFT);
  text("Sunny", weatherSlider.x, weatherSlider.y + 50);
  textAlign(CENTER);
  text("Rainy", width / 2 - 10, weatherSlider.y + 50);
  textAlign(RIGHT);
  text("Snowy", weatherSlider.x + weatherSlider.width, weatherSlider.y + 50);
}

function showGame3() {
  background(catchSiteBg);
  tint(255, 127);
  if (weather === 0) {
    xvel = 0;
  } else if (weather === 1) {
    background(rain);
    xvel = 2;
  } else if (weather === 2) {
    background(snow);
    xvel = 4;
  }
  landing.pos = { x: 350, y: 590 };
  tint(255, 255);
  
  //hiding stuff
  button.position(-100, -100);
  goBtn.position(-200, -200);
  weatherSlider.position(-200, -450);
  windSlider.position(-200, -450);

//physics stuff
  world.gravity.y = 10;
  mechazilla.pos = { x: 400, y: 400 };
  booster.collider = "d";
  booster.vel.y = 3;

  //calling booster movement func
  boosterMovement();
  
  /* WIN AND LOSE HERE*/
  //LOSING PROMPT
  if (booster.y >= height) {
    booster.y = height;
    showEnd4(
      false,
      "You crashed into the ground.\nTry decreasing the wind speed and choosing nicer weather.");}
  if (booster.x >= width) {
    booster.y = height;
    showEnd4(
      false,
      "You lost sight of the Starship booster.\nTry decreasing the wind speed and choosing nicer weather.");}
  if (booster.collides(barrier)) {
    showEnd4(
      false,
      "You crashed into the Mechazilla.\nTry decreasing the wind speed and choosing nicer weather.");
  }

  //WINNING PROMPT
  if (booster.collides(landing)) {
    if (booster.x > landing.x + 40) {
      showEnd4(
        false,
        "You landed off the platform.\nMake sure the booster lands on top of the platform.");}
    else if (booster.rotation < -10 || booster.rotation > 10) {
      showEnd4(
        false,
        "You landed at a severe angle.\nMake sure the booster lands perpendicular to the platform.");}
    else {
      showEnd4(
        true,
        "Take note of the optimal weather and low wind speed you chose.\nCan you recreate these perfect conditions?");}
  }
} //SCREEN THREE ENDS

function boosterMovement() {
  //left right
  booster.friction = 0;
  if (kb.pressing('left')) {
    console.log('left');
    booster.velocity.x = -3;
    booster.rotate(0.1, 0.1);
  }
  else if (kb.pressing('right')) {
    console.log('right');
    booster.velocity.x = 3;
    booster.rotate(-0.1, -0.1);
  }
  else booster.velocity.x = xvel;

  //up down
  if (kb.pressing('up')) {
    console.log('up');
    booster.velocity.y = -0.5;
  }
  else if (kb.pressing('down')) {
    console.log('down');
    booster.velocity.y = 4;
  }
  let windSpeed = windSlider.value();
  booster.velocity.x += windSpeed /10;

} //movement ends

function showEnd4(success, msg) {
  screen = 4;
  booster.collider = "s";
  booster.rotation = 0;
  landing.pos = { x: -350, y: -590 };
  mechazilla.pos = { x: -1000, y: -1000 };
  booster.pos = { x: width / 2, y: -200 };
  tint(255, 255);
  background(success ? 'rgba(0, 255, 0, 0.75)' : 'rgba(255, 0, 0, 0.75)');
  textAlign(CENTER);
  textFont(SpaceX, 50);
  fill('white');
  text(success ? "SUCCESS" : "GAME OVER",
    width / 2,
    height / 2 - 150);
  textFont(DMSans, 30);
  text(success ? "You safely landed the Starship booster!" : "The Starship booster was destroyed!",
    width / 2,
    height / 2 - 25);
  textFont(DMSans, 25);
  text(msg,
      width/2,
      height / 2 + 75);
  button.position(width / 2 - 85, height / 2 + 175);
  button.html(success ? "YES!" : "TRY AGAIN");
  button.style("background-color", success ? "#06402B" : "#8B0000");
  button.style("color", "white");
}