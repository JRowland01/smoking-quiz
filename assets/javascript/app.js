// *****************************************************************************
// Created by Jimmia Rowland
// *****************************************************************************

var panel = $("#quiz-area");
var countStartNumber = 60;

// Question set
var questions = [{
  question: "How many smoking-related fires occur in residential buildings every year in the U.S.?",
  answers: ["3000", "5400", "7600", "6000"],
  correctAnswer: "7600",
  image: "assets/images/pichsmokingrelatedfires.png"
}, {
  question: "Food service workers have a __% greater risk of lung cancer than the general population, ",
  answers: ["80", "30", "20", "50"],
  correctAnswer: "50",
  image: "assets/images/pichfoodserviceworkers.png"
}, {
  question: "Restaurants that allow smoking can have __ times the pollution of a busy highway?",
  answers: ["2", "6", "4", "7"],
  correctAnswer: "6",
  image: "assets/images/pichrestaurantshighways.png"
}, {
  question: "Smoking-related fires are _ times more likely to result in death than fires that start from another source.",
  answers: ["3", "10", "8", "4"],
  correctAnswer: "8",
  image: "assets/images/pichsmokingfiresource.png"
}, {
  question: "Smoke-free units require less turnover time due to fewer preparation and repainting needs.",
  answers: ["True", "False"],
  correctAnswer: "True",
  image: "assets/images/pichsmokingfiresource.png"
}, {
  question: "A smoke-free restaurant can save nearly _ per 1,000 square feet each year.",
  answers: ["$800", "$500", "$1000", "$300"],
  correctAnswer: "$300",
  image: "assets/images/pichsmokefreerestaurants.png"
}, {
  question: "Cyanide is not a chemical in cigarettes.",
  answers: ["True", "False"],
  correctAnswer: "False",
  image: "assets/images/pichsmokefreeunits.png"
}, {
  question: "What is the best method for quitting a smoking habit? ",
  answers: ["In-Person Counseling", "Georgia Quitline", "Cold Turkey", "All of the above"],
  correctAnswer: "All of the above",
  image: "assets/images/pichalloftheabove.png"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  cQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.cQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.cQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.cQuestion].answers[i]
      + "'>" + questions[this.cQuestion].answers[i] + "</button>");
    }

  },

  hiddenText: function(){
   $(".intropage").hide();
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.cQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The correct answer is: " + questions[this.cQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.cQuestion].image + "' />");

    if (game.cQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);
    $(".time").hide();

    panel.html("<h2>Here are your results!</h2>");

    $("#counter-number").html(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='restart'>Restart</button>");
    panel.append("<br><button id='mainMenu'>Main Menu</button>"); 

  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.cQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>That is incorrect.</h2>");
    panel.append("<h3>The correct answer is: " + questions[game.cQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.cQuestion].image + "' />");

    if (game.cQuestion === questions.length - 1) {
      setTimeout(game.results, 4 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 4 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>That is correct!</h2>");
    panel.append("<img src='" + questions[game.cQuestion].image + "' />");

    if (game.cQuestion === questions.length - 1) {
      setTimeout(game.results, 4 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 4 * 1000);
    }
  },

  reset: function() {
    this.cQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
  },

  restart: function(){
    this.reset();
    this.loadQuestion();
  }
};



// CLICK EVENTS

var $document = $(document); 

$document.on("click", "#restart", function() {
  game.restart();
});

$document.on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$document.on("click", "#start", function() {
  game.hiddenText();

  $("#sub-wrapper").prepend( " <h2 class='time'>Time Remaining: <span id='counter-number'>60</span> Seconds</h2>");
  game.loadQuestion();

});

var homepage = function(){
   panel.html("");
    $(".intropage").show();
   panel.append('<button id="start">Start</button>');
   game.reset();

}

$(function(){
    homepage();
});

$document.on("click", "#mainMenu", function() {
   homepage();
});

// $("#mainMenu").on("click",  function() {

//   var id = this.id; 
//      $('#main').append(id);
// });




