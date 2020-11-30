#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');


const guessNumber = Math.ceil(Math.random() * 2);
const filename = process.argv[2];
const file = path.join(__dirname, filename);
const quiz = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let isWin = false;

console.log("Программа загадала число (1 или 2). Попробуйте угадать, какое число загадала программа");
quiz.on('line', (answer) => {
    if (answer == guessNumber) {
        isWin = true;
    }
    quiz.close()
});

quiz.on('close', () => {
    console.log(`Вы ${isWin ? '' : 'не '}угадали`);
    fs.appendFile(
        file,
        `${isWin ? 1 : 0}`,
        err => {
            if (err) throw new Error(err)
            console.log('Ok');
        }
    );
});
