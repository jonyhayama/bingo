export const MAX_BINGO_NUMBERS = 10;

export const randomIntFromInterval = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min));

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));