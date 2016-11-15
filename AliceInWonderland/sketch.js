var theFont;
var rawText;
var joined;
var parsedText;
var cat, curious, Queen, important, rude;
var between;
var phrasearray;

var delim = "  ,.!?:;";
var specialChar, superJoined;
var chapNum;
var charSize;

function preload() {
  rawText = loadStrings("data/AliceInWonderland.txt");
  theFont = loadFont("data/font1.otf");
}

function setup() {
  createCanvas(600, 600);
  background(255);
  charSize = 20;
  textFont(theFont, charSize);
  //console.log(rawText); // array with long content in each element, and special char ' is messed

  joined = join(rawText, ""); // array of strings -> one long string
  //console.log(joined); // why join not displayed...

  //specialChar = joined.match(/\'+/g); // to find ' (seem not work)
  //console.log(specialChar);
  //superJoined = joined.replace(/\'+/g, " ");

  cat = joined.match(/cat/gi);
  curious = joined.match(/curious/gi);
  Queen = joined.match(/Queen/gi);
  important = joined.match(/important/gi);
  rude = joined.match(/rude/gi);

  between = textBetween(joined, "Alice", "reading");
  console.log(between);
  phrasearray = between.split(' ');

  parsedText = splitTokens(joined, delim); //  splits a string at one or many character delimiters or "tokens" -> array
  //console.log(parsedText);
  parsedText.splice(0, 0, "Author", "Lewis", "Carroll");
  //console.log(parsedText);

  console.log(cat.length);
  var num = searchText("cat");
  console.log(num); // obviously, match function is not case-sensitive

  chapNum = joined.match(/Chapter/gi);
  //console.log(chapNum.length);
  text("This is Alice In Wonderland", width / 2 - 200, charSize);
  text("The author is " + parsedText[1] + " " + parsedText[2], width / 2 - 200, 2 * charSize);
  text("There are " + chapNum.length + " chapters in Alice In Wonderland", width / 2 - 200, 3 * charSize);
}

function draw() {
  // show the content between "Alice" and "reading"
  var margin = 20;
  var thex = margin;
  var they = 300;

  for (var i = 0; i < phrasearray.length; i++) { // for(var i = 0; i< phrasearray.split(' ').length; i++)
    if (phrasearray[i] === 'Alice') {
      textSize(60);
    } else {
      textSize(30);
    }
    var tw = textWidth(phrasearray[i] + ' ');
    if ((thex + tw) > (width - margin)) {
      thex = margin;
      they += 36;
    }
    text(phrasearray[i], thex, they);
    thex += tw;
  }
  
  // among "cat, curious, Queen, important, rude", noun appears more than adj word
  // draw bubbles that indicate the total number of occurence of a noun word
  if (frameCount % 60 === 0) {
    bubbles(cat.length);
    bubbles(curious.length);
    bubbles(Queen.length);
    bubbles(important.length);
    bubbles(rude.length);
  }
}

function bubbles(value) {
  var x = random(3 * value, 6 * value);
  var y = random(4 * charSize, height);
  fill(255 - 2 * value, 200, 2 * value, 200);
  ellipse(x, y, value / 2, value / 2);
  if (value > 70) {
    textSize(10);
    text("possible noun here", x - value / 2, y + value / 2)
  }
}

function textBetween(s, before, after) { // similar with substring
  var found = " ";
  var start = s.indexOf(before);
  if (start == -1) {
    return "";
  }
  var end = s.indexOf(after, start);
  if (end == -1) {
    return "";
  }
  end += after.length;
  return s.substring(start, end);
}

function searchText(word) {
  var total = 0;
  for (var counter = 0; counter < parsedText.length; counter++) {
    var t = parsedText[counter];
    if (t == word) {
      total++;
    }
  }
  return total;
}