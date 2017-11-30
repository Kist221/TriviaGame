
// Game Variables
var questions = [{
	  q: "Who was the legendary Benedictine monk who invented champagne?",
	  a: [{a: "Dom Perignon", correct: true}, {a: "Walker Percy", correct: false}, {a: "Basil Hume", correct: false}, {a: "Donald Trump", correct: false}]
	},{
	  q: "Name the largest freshwater lake in the world?",
	  a: [{a: "Lake Michigan-Huron", correct: false}, {a: "Lake Victoria", correct: false}, {a: "The Caspian Sea", correct: false}, {a: "Lake Superior", correct: true}]
	},{
	  q: "The molecule 'hemoglobin' is used in which type of cells?",
	  a: [{a: "Red Blood Cells", correct: true}, {a: "White Blood Cells", correct: false}, {a: "Platelets", correct: false}, {a: "Plasma", correct: false}]
	},{
	  q: "Bruce Banner turns into what fictional superhero when he becomes angry?",
	  a: [{a: "A Woman", correct: false}, {a: "Frankenstein's monster", correct: false}, {a: "The Hulk", correct: true}, {a: "Betty White", correct: false}]
	},{
	  q: "How old was American musician Jimi Hendrix when he passed away in 1970?",
	  a: [{a: "27", correct: true}, {a: "32", correct: false}, {a: "47", correct: false}, {a: "38", correct: false}]
	},{
	  q: "In the game Scrabble, what is the point value of the letter K?",
	  a: [{a: "Two", correct: false}, {a: "Three", correct: false}, {a: "Eight", correct: false}, {a: "Five", correct: true}]
	},{
	  q: "186,282 miles per second is the speed of what in a vacuum?",
	  a: [{a: "Light", correct: true}, {a: "Sound", correct: false}, {a: "Sarcasm", correct: false}, {a: "Love", correct: false}]
	},{
	  q: "To be legally sold as bourbon, a whiskey's mash must contain at least 51% of what grain?",
	  a: [{a: "Musk", correct: false}, {a: "Alcohol", correct: false}, {a: "Corn", correct: true}, {a: "Wheat", correct: false}]
	},{
	  q: "In 1867 the United States purchased Alaska from what country?",
	  a: [{a: "Russia", correct: true}, {a: "China", correct: false}, {a: "Japan", correct: false}, {a: "Canada", correct: false}]
	},{
	  q: "What is the best dad dance move?",
	  a: [{a: "The Robot", correct: true}, {a: "The Worm", correct: true}, {a: "The Sprinkler", correct: true}, {a: "The Pogo", correct: true}]
}];
// correct answers
var correct;
// incorrect answers
var incorrect;
// timed out answers
var tooSlow;
// which question you are on
var current;
// number of questions skipped or missed
var remaining;
// timer variables
var seconds;
var myInterval;
var timerOn = false;

// SHOW ALL CURRENT DATA
var allData = function (){
	console.log("correct: "+correct, "incorrect: "+incorrect, "current: "+current, "remaining: "+remaining, "questions: "+questions);
};

// game functions
var reset = function (){
	correct = 0;
	incorrect = 0;
	tooSlow = 0;
	current = 0;
	remaining = questions.length;
	shuffle(questions);
	for (var i = 0; i < questions.length; i++) {
		shuffle(questions[i].a);
	}
};

// starts game when player clicks start
var startGame = function (){
	$("#gameScene").on("click", "#start", function (){
		// reset stats
		reset();
		// confirm new game variables
		if (current === 0 && remaining === questions.length) {
			$("#info").empty();
			$("#start").hide();
			nextQuestion();
		}
	})
	// run when an answer is selected
	$("#questions").on(
		"click", 
		".answer", 
		function() {
			// if answer is correct
			if ($(this).attr("data") === "true") {
				// store correct input 
				++correct;
				// show correct image
				$("#questions").html('<img src="assets/images/green.png">');
			}
			// if answer is incorrect
			else {
				// store incorrect input
				++incorrect;
				// show incorrect image
				$("#questions").html('<img src="assets/images/red.png">');
			}
			// stop timer
			endTimer();
			// track current and remaining questions
			trackQuestion();
			// NEXT QUESTION
			setTimeout(nextQuestion, 1000);
	 	}
	 );
};

// populate next question
var nextQuestion = function (){
	// clear question container for next question
	$("#questions").empty();
	// check if more questions
	if (remaining > 0) {
		// start timer
		startTimer();
		// list questions on page
		$("#questions").append("<h2>" + questions[current].q + "</h2>");
		// loop length of answer options
		for (var j = 0; j < questions[current].a.length; j++){
			// make var with answers
			var answer = $("<button>" + questions[current].a[j].a + "</button>");
			// add class for referencing click functions
			answer.addClass("answer m-2");
			// store data whether answer is T or F
			answer.attr("data", questions[current].a[j].correct);
			// list answers on page
			$("#questions").append(answer);
		}
	}
	// if no more questions display info
	else {
		// stop timer
		endTimer();
		// show info
		popInfo();
	}
};

// update questions
var trackQuestion = function (){
	// change current question value
	++current;
	// update remaining questions
	--remaining;
};

// starts timers
var startTimer = function () {
	// timer start point
	seconds = 10;
	// if timer is not running
	if (timerOn === false) {
		// turn timer on
		timerOn = true;
		// set interval
		myInterval = setInterval(countdown, 990);
	}
}

// ends timer
var endTimer = function () {
	// clear interval
	clearInterval(myInterval);
	// mark timer as off
	timerOn = false;
}

// function displays countdowns
var countdown = function () {
	// display timer
	$("#info").html("<h2>"+seconds+"</h2>");
	// decrement seconds
	seconds--;
	// if countdown ends
	if (seconds < 0) {
		endTimer();
		// show caution image
		$("#questions").html('<img src="assets/images/yellow.png">');
		tooSlow++;
		trackQuestion();
		setTimeout(nextQuestion, 1000);
	}
}

// display info upon completion
var popInfo = function (){
	// show start button
	$("#start").show();
	// make stat var
	var stats = "<h2>Your Results</h2>"+"<p>Correct: " + correct + "</p>"+"<p>Incorrect: " + incorrect + "</p>"+"<p>Too Slow: " + tooSlow + "</p>"
	// list results on page
	$("#info").html(stats);
};

// Function for shuffling questions and answers ordering between games
function shuffle(arr){
  var m = arr.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}



startGame();


