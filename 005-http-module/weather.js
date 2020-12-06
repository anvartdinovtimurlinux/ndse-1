#!/usr/bin/env node

'use strict';

const http = require('http');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const pressureCoeff = 1.33322;
const baseUrl = "http://api.weatherstack.com/current";
const myAPIKey = process.env.myAPIKey;
const { city } = yargs(hideBin(process.argv))
  .demandCommand(0)
  .example('$0 --city Moscow', 'Погода в г. Москва')
  .alias('c', 'city')
  .describe('c', 'Город')
  .argv;

const url = baseUrl + `?access_key=${myAPIKey}&query=${city}`;

http.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Status Code: ${statusCode}`);
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    let weatherJSON = JSON.parse(rawData);
    console.log(`Погода в городе ${city}`);
    console.log(`Температура ${weatherJSON.current.temperature} градусов`);
    console.log(`Ощущается как ${weatherJSON.current.feelslike} градусов`);
    console.log(`Скорость ветра ${weatherJSON.current.wind_speed} м/с`);
    console.log(`Давление ${(weatherJSON.current.pressure / pressureCoeff).toFixed(0)} мм ртутного столба`);
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});