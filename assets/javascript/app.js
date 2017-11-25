
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
var blank = questions.length;



// game functions

// starts game when player clicks start
var startGame = function ()
{
	$("#start").on("click", function()
	{
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
};

var answering = function ()
{
	$(".answer").on("click", function ()
	{
		console.log($(this).attr("data"));
		if ($(this).attr("data") === "true") {
			console.log("true");
		} else {
			console.log("false");
		}
	})
};




startGame();






