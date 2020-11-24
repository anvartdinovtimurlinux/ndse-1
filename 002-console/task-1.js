#!/usr/bin/env node
'use strict';

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');


const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .command('current', 'Текущие дата и время')
  .command('add', 'Дата и время в будущем')
  .command('sub', 'Дата и время в прошлом')
  .demandCommand(1)
  .example('$0 add --month 2', 'дата и время в формате ISO через 2 месяца')
  .alias('y', 'year')
  .describe('y', 'Year')
  .alias('m', 'month')
  .describe('m', 'Month')
  .alias('d', 'date')
  .describe('d', 'Day')
  .argv;

const command = argv._[0];
const year = argv.year;
const month = argv.month;
const day = argv.date;
const date = new Date();

let newDate;

switch (command) {
  case 'current':
    if (year) {
      console.log(date.getFullYear());
    } else if (month) {
      console.log(date.getMonth());
    } else if (day) {
      console.log(date.getDate());
    } else {
      console.log(date);
    }
    break;
  case 'add':
    if (year) {
      newDate = new Date(date.getFullYear() + year, date.getMonth(), date.getDate());
    } else if (month) {
      newDate = new Date(date.getFullYear(), date.getMonth() + month, date.getDate());
    } else if (day) {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + day);
    }
    console.log(newDate);
    break;
  case 'sub':
    if (year) {
      newDate = new Date(date.getFullYear() - year, date.getMonth(), date.getDate());
    } else if (month) {
      newDate = new Date(date.getFullYear(), date.getMonth() - month, date.getDate());
    } else if (day) {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
    }
    console.log(newDate);
    break
}
