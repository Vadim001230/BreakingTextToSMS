export default function breakingText(text) {
  const words = text.split(' ');
  const result = [];
  const MAX_LENGTH = 140;
  const spaceLength = 1;
  const amountSMS = Math.round(text.length / 140);
  const amountSMSLength = amountSMS.toString().length;
  let numberOfSMS = 1;
  let suffixLength =
    numberOfSMS.toString().length + spaceLength + amountSMSLength;
  let currentSMS = '';

  if (text.length < MAX_LENGTH) {
    result.push(text);
    return result;
  }

  for (let i = 0; i < words.length; i++) {
    if (
      currentSMS.length + words[i].length + spaceLength + suffixLength <
      MAX_LENGTH
    ) {
      currentSMS += `${words[i]} `;
      if (i === words.length - 1) {
        currentSMS += `${numberOfSMS}/${amountSMS}`;
        result.push(currentSMS);
      }
    } else {
      currentSMS += `${numberOfSMS}/${amountSMS}`;
      result.push(currentSMS);
      currentSMS = `${words[i]} `;
      numberOfSMS++;
      suffixLength =
        numberOfSMS.toString().length + spaceLength + amountSMSLength;
    }
  }

  const fixLength = () => {
    for (let i = 0; i < result.length; i++) {
      if (result[i].length >= MAX_LENGTH) {
        const resultElem = result[i].split(' ');
        const lastElemIndex = resultElem.length - 2;
        result[i + 1] = resultElem[lastElemIndex] + ' ' + result[i + 1];
        const suffix = `${i + 1}/${result.length}`;
        resultElem.splice(lastElemIndex, 2, suffix);
        result[i] = resultElem.join(' ');
      }
    }
  };
  const fixSuffix = () => {
    for (let i = 0; i < result.length; i++) {
      const resultElem = result[i].split(' ');
      const suffix = `${i + 1}/${result.length}`;
      resultElem.splice(-1, 1, suffix);
      result[i] = resultElem.join(' ');
    }
  };
  fixSuffix(result);
  do {
    fixLength();
  } while (!result.every((elem) => elem.length < MAX_LENGTH));
  fixSuffix(result);

  return result;
}
