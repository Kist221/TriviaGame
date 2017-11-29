
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
}];
// correct answers
var correct;
// incorrect answers
var incorrect;
// which question you are on
var current;
// number of questions skipped or missed
var remaining;

// SHOW ALL CURRENT DATA
var allData = function (){
	console.log("correct: "+correct, "incorrect: "+incorrect, "current: "+current, "remaining: "+remaining, "questions: "+questions);
};

// game functions
var reset = function ()
{
	correct = 0;
	incorrect = 0;
	current = 0;
	remaining = questions.length;
};

// starts game when player clicks start
var startGame = function ()
{
	$("#gameScene").on("click", "#start", function ()
	{
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
			}
			// if answer is incorrect
			else {
				// store incorrect input
				++incorrect;
			}
			trackQuestion();
			// NEXT QUESTION
			nextQuestion();
	 	}
	 );
};

// populate next question
var nextQuestion = function ()
{
	// clear question container for next question
	$("#questions").empty();
	// check if more questions
	if (remaining > 0) {
		// list questions on page
		$("#questions").append("<h2>" + questions[current].q + "</h2>");
		// loop length of answer options
		for (var j = 0; j < questions[current].a.length; j++)
		{
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
		// show info
		popInfo();
	}
};

// update questions
var trackQuestion = function ()
{
	// change current question value
	console.log("current: "+current);
	++current;
	console.log("current: "+current);
	// update remaining questions
	console.log("remaining: "+remaining);
	--remaining;
	console.log("remaining: "+remaining);
};

// display info upon completion
var popInfo = function ()
{
	// show start button
	$("#start").show();
	// make stat var
	var stats = "<h2>Your Results</h2>"+"<p>Correct: " + correct + "</p>"+"<p>Incorrect: " + incorrect + "</p>"
	// list results on page
	$("#info").html(stats);
};


startGame();


