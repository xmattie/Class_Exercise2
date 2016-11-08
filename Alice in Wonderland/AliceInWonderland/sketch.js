var rawText;
var parsedText;
var joined;
var cat, curious, Queen, important, rude;
var between;

function preload(){
  rawText = loadStrings("data/text/AliceInWonderland.txt");
}

function setup() {
  createCanvas(600,600);
  joined = join(rawText, " ");
  parsedText = splitTokens(joined);
  
  cat = joined.match(/cat/gi);
  curious = joined.match(/curious/gi);
  Queen = joined.match(/Queen/gi);
  important = joined.match(/important/gi);
  rude = joined.match(/rude/gi);
  
  between = textBetween(joined, "Alice", "reading");
  console.log(between);
}

function draw() {
  background(0);
  bubbles(cat.length);
  bubbles(curious.length);
  bubbles(Queen.length);
  bubbles(important.length);
  bubbles(rude.length);
}

function textBetween(s, before, after) {
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

function bubbles(length) {
  var x = random(0, 600.1);
  var y = random(0, 600.1);
  var z = random(0, 255.1);
  fill(z);
  ellipse(x, y, length, length);
}




function searchText(word) {
  var total = 0;
  for (var counter = 0; counter < parsedText.length; counter++) {
    var n = parsedText[counter];
    if (n == word) {
      total++;
    }
  }
  return total;
}