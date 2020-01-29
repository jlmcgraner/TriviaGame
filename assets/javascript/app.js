var card = $("#quiz-area");

// Question set
var questions = [
  {
    question: "Which Major League Baseball Player holds the all-time home run record?",
    answers: ["Roids McGee", "Star Von Asterisk", "Barry Bonds", "Hank Aaron"],
    correctAnswer: "Barry Bonds"
  },
  {
    question: "Who was the first Major League Baseball Player to pitch over 100 mph?",
    answers: ["Nolan Ryan", "Aroldis Chapman", "Tim Wakefield", "Suzy Lou Who"],
    correctAnswer: "Nolan Ryan"
  },
  {
    question: "How many games did Cal Ripken Jr play consecutively?",
    answers: ["1,348", "982", "9,999,999", "2,632"],
    correctAnswer: "2,632"
  },
  {
    question: "Which player is nicknamed 'Mr. November'?",
    answers: ["Alex Rodriguez", "David Ortiz", "David Eckstein", "Derek Jeter"],
    correctAnswer: "Derek Jeter"
  },
  {
    question: "What shape is a baseball?",
    answers: ["Triangle", "Diamond", "Heptagram", "Circle"],
    correctAnswer: "Circle"
  },
];

// Variable that will hold the setInterval
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>Nice Job!</h2>");
    card.append("<h3>Lucky Guesses!: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
