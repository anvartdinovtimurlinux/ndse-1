#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const filename = process.argv[2];
const file = path.join(__dirname, filename);

fs.readFile(
    file,
    'utf-8',
    (err, data) => {
        if (err) {
            console.log(err.stack);
            process.exit();
        }

        const results = data.split('');
        const countParties = results.length;
        const countWins = results.filter(score => score == 1).length;
        const percentageWins = (countWins / countParties * 100).toFixed(2);

        console.log(`Сыграно партий: ${countParties}`);
        console.log(`Выиграно партий: ${countWins}`);
        console.log(`Процентное соотношение выигранных партий: ${percentageWins}%`);
    }
);