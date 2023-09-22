import { textToTest } from './texts';
import { textToTest1 } from './texts';
import { textToTest2 } from './texts';
import { textToTest3 } from './texts';
import breakingText from './breakingText';

const bigText =
  textToTest + textToTest + textToTest + textToTest + textToTest + textToTest;
const initTimestamp = performance.now();
for (let i = 0; i < 1; i++) {
  breakingText(textToTest);
}
const resultTimestamp = performance.now();

console.log(
  'textLength:',
  textToTest.length,
  'timeTake',
  ((resultTimestamp - initTimestamp) / 1000).toFixed(4) + 's'
);
