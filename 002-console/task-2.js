#!/usr/bin/env node
'use strict';

const readline = require('readline');


const guessNumber = Math.floor(Math.random() * 101);
const quiz = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let counter = 0;

quiz.on('line', (answer) => {
  const number = Number(answer);
  counter++;

  if (number === guessNumber) {
    quiz.close();
  } else if (number > guessNumber) {
    console.log("Меньше");
  } else {
    console.log("Больше");
  }
});

quiz.on('close', () => console.log(`Отгадано число ${guessNumber} с ${counter} попытки`));

console.log('Загадано число в диапазоне от 0 до 100');