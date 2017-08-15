// Declare section:
var points;
var stars;
var randomNumber;
var guestNumber;

function getRandomNumber() {
  var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var number = [];
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  for (var i = 1; i <= 4; i++) {
    number.push(numbers.splice(getRandomInt(0, numbers.length), 1).pop().toString());
  }
  return number;
}

function compareNumbers(guestNumber) {
  points = 0;
  stars  = 0;
  randomNumber.forEach(function(item, index) {
    if (item === guestNumber[index]) {
      stars++;
    } else if (guestNumber.indexOf(item) !== -1) {
      points++;
    }
  });
}

function validateNumber(number) {
  if (number.length !== 4) {
    return false;
  } else {
    return (new Set(number)).size === number.length;
  }
}

function initialize() {
  // Obtener un numero aleatorio:
  randomNumber = getRandomNumber();
  console.log(randomNumber.join(""));
  // Restablecer la tabla de resultados:
  $(".results").remove();
  var template = Handlebars.compile($('#results-template').html());
  $(".container").append(template());
}

// Event section:
$(document).ready(function() {
  initialize();
});

$("#new-number").keypress(function(e) {
  if (e.which == 13) {
    $("#new-number, p > span").removeClass("wrong");
    guestNumber = $(this).val().split("");

    if (validateNumber(guestNumber)) {
      compareNumbers(guestNumber);
      $(this).val("");

      if (stars === randomNumber.length) {

      } else {
        var rowTemplate = Handlebars.compile($('#results-row-template').html());
        $(".results > tbody").append(rowTemplate({ number: guestNumber.join(""),
                                                   points: points,
                                                   stars: stars
                                                 }));
      }
    } else {
      $("#new-number, p > span").addClass("wrong");
    }
  }
});

$(".reset").click(function() {
  initialize();
});
