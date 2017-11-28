
// Game Variables
var questions = [
{
  q: "first question",
  a: [{a: "1true", correct: true}, {a: "1false", correct: false}]
},
{
  q: "second question",
  a: [{a: "2true", correct: true}, {a: "2false", correct: false}]
},
{
  q: "third question",
  a: [{a: "3true", correct: true}, {a: "3false", correct: false}]
}
];
// correct answers
var correct;
// incorrect answers
var incorrect;
// which question you are on
var current;
// number of questions skipped or missed
var remaining;

// SHOW ALL CURRENT DATA
var allData = function ()
{
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
		// confirm new game variables
		if (current === 0 && remaining === questions.length) {
			$("#info").empty();
			$("#start").hide();
			nextQuestion();
			answering();
		}
		// reset variables if incorrect
		else if (current !== 0 && remaining !== questions.length) {
			reset();
			$("#info").empty();
			$("#start").hide();
			nextQuestion();
			answering();
		}
	})
};

// populates questions one at a time with answers and data values
// var popQuestion = function ()
// {
// 	// list questions on page
// 	$("#questions").append("<h2>" + questions[current].q + "</h2>");
// 	// loop length of answer options
// 	for (var j = 0; j < questions[current].a.length; j++)
// 	{
// 		// make var with answers
// 		var answer = $("<button>" + questions[current].a[j].a + "</button>");
// 		// add class for referencing click functions
// 		answer.addClass("answer");
// 		// store data whether answer is T or F
// 		answer.attr("data", questions[current].a[j].correct);
// 		// list answers on page
// 		$("#questions").append(answer);
// 	}
// };

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
			answer.addClass("answer");
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

// function for determining correct answer and displaying next question
var answering = function ()
{
	// run when an answer is selected
	$("#questions").on("click", ".answer", function ()
	{
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
	})
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


