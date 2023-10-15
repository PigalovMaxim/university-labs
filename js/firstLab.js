function chooseFirstLab() {
  closeAll();
  firstLabContentDiv.classList.remove('hidden');
  firstLabNavButton.classList.add('activeMenu');
}

function firstLabStart(text, shift) {
  // Шифруем текст
  let encripted = '';
  if (shift > alphabet.length) shift = alphabet.length;
  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    if (alphabet.includes(letter) || uppercaseAlphabet.includes(letter)) {
      encripted += firstLabShiftLetter(letter, shift);
    } else {
      encripted += letter;
    }
  }

  // Выполняем расшифровку зашифрованного текста
  let decripted = ''
  for (let i = 0; i < encripted.length; i++) {
    const letter = encripted[i];
    if (alphabet.includes(letter) || uppercaseAlphabet.includes(letter)) {
      decripted += firstLabShiftLetter(letter, -shift);
    } else {
      decripted += letter;
    }
  }

  // Взлом зашифрованного текста
  const popularSymbols = ['e', 't', 'a', 'o', 'i', 'n', 's'];
  const variants = []
  for (const symbol of popularSymbols) {
    variants.push(firstLabGetCipherVariant(text, symbol));
  }

  return { encripted, decripted, variants };
}

function firstLabGetCipherVariant(text, symbol) {
  const frequency = new Array(26).fill(0);

  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toLowerCase();
    if (alphabet.includes(letter)) {
      frequency[letter.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
  }

  let maxFrequency = 0;
  let maxIndex = 0;

  for (let i = 0; i < frequency.length; i++) {
    if (frequency[i] > maxFrequency) {
      maxFrequency = frequency[i];
      maxIndex = i;
    }
  }

  const key = maxIndex - (symbol.charCodeAt(0) - 'a'.charCodeAt(0));

  let decryptedText = '';
  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    const isUpperCase = letter === letter.toUpperCase();
    const lowerLetter = letter.toLowerCase();
    if (alphabet.includes(lowerLetter)) {
      let decryptedLetter = lowerLetter.charCodeAt(0) - key - 'a'.charCodeAt(0);
      if (decryptedLetter < 0) {
        decryptedLetter += 26;
      }

      decryptedLetter = (decryptedLetter % alphabet.length) + 'a'.charCodeAt(0);
      decryptedLetter = String.fromCharCode(decryptedLetter);
      if (isUpperCase) decryptedLetter = decryptedLetter.toUpperCase()

      decryptedText += decryptedLetter;
    } else {
      decryptedText += letter;
    }
  }

  return decryptedText;
}

function firstLabShiftLetter(letter, shiftAmount) {
  const isUpperCase = letter === letter.toUpperCase();
  const _alphabet = isUpperCase ? uppercaseAlphabet : alphabet;
  const letterIndex = _alphabet.indexOf(letter);

  let shiftedIndex = (letterIndex + shiftAmount) % _alphabet.length;
  if (shiftedIndex < 0) shiftedIndex = _alphabet.length + shiftedIndex;
  let shiftedLetter = _alphabet.charAt(shiftedIndex);

  if (!isUpperCase) {
    shiftedLetter = shiftedLetter.toLowerCase();
  }

  return shiftedLetter;
}

firstLabNavButton.addEventListener('click', () => {
  chooseFirstLab();
});

firstLabStartButton.addEventListener('click', () => {
  const textValue = firstLabInputText.value;
  const { encripted, decripted, variants } = firstLabStart(textValue, parseInt(firstLabInputKey.value));
  firstLabEncriptText.innerHTML = encripted;
  firstLabDecriptText.innerHTML = decripted;
  firstLabDecipherText.innerHTML = '';
  variants.forEach((variant, i) => {
    const isRight = variant === textValue;
    firstLabDecipherText.innerHTML += `
      <p class="${isRight ? 'right' : ''}">
        Вариант ${i + 1}: ${variant} ${isRight ? '- Верный вариант' : ''}
      </p>
      <br/>
    `;
  })
});

firstLabFillDefault.addEventListener('click', () => {
  firstLabInputText.value = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
  firstLabInputKey.value = '5';
});

firstLabInputKey.addEventListener('input', function () {
  firstLabInputKey.value = firstLabInputKey.value.replace(/\D/g, '');
});

firstLabInputText.addEventListener('input', function () {
  firstLabInputText.value = firstLabInputText.value.replace(/[^a-zA-Z\s,.\-]/g, '');
});