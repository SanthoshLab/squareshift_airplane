var express = require("express");
var path = require("path");

var app = express();
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Enter the seats as mentioned in the problem? Eg : [ [3,4], [4,5],[2,3], [3,4] ]   :",
  (seatInput) => {
    var array = JSON.parse(seatInput);
    var rowSize = Math.max.apply(
      Math,
      array.map((e) => e[0])
    );
    var colSize = Math.max.apply(
      Math,
      array.map((e) => e[1])
    );

    var seats = fillSeats(array);

    var obj = {};
    obj = seatNumber("Aisle", 1, seats, colSize, rowSize);
    obj = seatNumber("Window", obj.counter, obj.seats, colSize, rowSize);
    obj = seatNumber("Middle", obj.counter, obj.seats, colSize, rowSize);
    seats = obj.seats;

    printValues(seats, colSize, rowSize);

    rl.close();
  }
);

function printValues(seats, colSize, rowSize) {
  var stringJ = "";
  for (var i = 0; i < colSize; i++) {
    for (var j = 0; j < rowSize; j++) {
      if (seats[j] == null || seats[j][i] == null) {
        stringJ += "- ";
        continue;
      }
      for (k = 0; k < seats[j][i].length; k++) {
        stringJ += seats[j][i][k] + " ";
      }
      stringJ += ",   ";
    }
    stringJ += "\n";
  }
  console.log(stringJ);
}

function fillSeats(array) {
  var seats = [];
  for (var i = 0; i < array.length; i++)
    seats.push(
      Array(array[i][0])
        .fill()
        .map(() => Array(array[i][1]).fill("Middle"))
    );

  for (var i = 0; i < seats.length; i++) {
    for (var j = 0; j < seats[i].length; j++) {
      seats[i][j][0] = "Aisle";
      seats[i][j][seats[i][j].length - 1] = "Aisle";
    }
  }

  for (var i = 0; i < seats[0].length; i++) seats[0][i][0] = "Window";
  for (var i = 0; i < seats[seats.length - 1].length; i++)
    seats[seats.length - 1][i][seats[seats.length - 1][i].length - 1] =
      "Window";

  return seats;
}

function seatNumber(val, counter, seats, colSize, rowSize) {
  for (var i = 0; i < colSize; i++) {
    for (var j = 0; j < rowSize; j++) {
      if (seats[j] == null || seats[j][i] == null) continue;
      for (k = 0; k < seats[j][i].length; k++) {
        if (seats[j] != null && seats[j][i] != null && seats[j][i][k] === val) {
          seats[j][i][k] = counter;
          counter++;
        }
      }
    }
  }
  return { seats: seats, counter: counter };
}
