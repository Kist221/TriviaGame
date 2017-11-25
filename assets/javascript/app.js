
// Game Variables
var questions = [
{
  q: "first question",
  a: [{a: "true", correct: true}, {a: "false", correct: false}]
},
{
  q: "second question",
  a: [{a: "true", correct: true}, {a: "false", correct: false}]
},
{
  q: "third question",
  a: [{a: "true", correct: true}, {a: "false", correct: false}]
}
];

// correct answers
var correct = 0;

// incorrect answers
var incorrect = 0;

// which question you are on
var current = 0;

// number of questions skipped or missed
var remaining = questions.length;



// game functions

// reset variables
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
	$("#start").on("click", function()
	{
		reset();
		popQuestion();
		$("#start").hide();
		answering();
	})
};

// populates questions one at a time with answers and data values
var popQuestion = function ()
{
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
	// change current question value
	current++;
	// update remaining questions
	remaining--;
};

// populate next question
var nextQuestion = function ()
{
	// clear question container for next question
	$("#questions").empty();
	// populate next question
	popQuestion();
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
			correct++;
		}
		// if answer is incorrect
		else {
			// store incorrect input
			incorrect++;
		}
		// NEXT QUESTION
		nextQuestion();
	})
};



startGame();





