// Элементы первой лабы
const firstLabNavButton = document.getElementById('firstLab');
const firstLabContentDiv = document.getElementById('firstLabContent');
const firstLabInputText = document.getElementById('firstLabText');
const firstLabInputKey = document.getElementById('firstLabKey');
const firstLabStart = document.getElementById('firstLabStart');
const firstLabFillDefault = document.getElementById('firstLabFillDefault');
const firstLabEncriptText = document.getElementById('firstLabEncriptText');
const firstLabDecriptText = document.getElementById('firstLabDecriptText');
const firstLabDecipherText = document.getElementById('firstLabDecipherText');

class Labs {
  static #alphabet = 'abcdefghijklmnopqrstuvwxyz';
  static #uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  static closeAll = () => {

  }

  static chooseFirstLab = () => {
    this.closeAll();
    firstLabContentDiv.classList.remove('hidden');
  }

  static firstLabStart = (text, shift) => {
    // Шифруем текст
    let encripted = '';
    if (shift > this.#alphabet.length) shift = this.#alphabet.length;
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      if (this.#alphabet.includes(letter) || this.#uppercaseAlphabet.includes(letter)) {
        encripted += this.#firstLabShiftLetter(letter, shift);
      } else {
        encripted += letter;
      }
    }

    // Выполняем расшифровку зашифрованного текста
    let decripted = ''
    for (let i = 0; i < encripted.length; i++) {
      const letter = encripted[i];
      if (this.#alphabet.includes(letter) || this.#uppercaseAlphabet.includes(letter)) {
        decripted += this.#firstLabShiftLetter(letter, -shift);
      } else {
        decripted += letter;
      }
    }

    // Взлом зашифрованного текста
    const popularSymbols = ['e', 't', 'a', 'o', 'i', 'n', 's'];
    const variants = []
    for (const symbol of popularSymbols) {
      variants.push(this.#firstLabGetCipherVariant(text, symbol));
    }

    return { encripted, decripted, variants };
  }

  static #firstLabGetCipherVariant = (text, symbol) => {
    const frequency = new Array(26).fill(0);
    const alphabet = this.#alphabet;

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

  static #firstLabShiftLetter = (letter, shiftAmount) => {
    const isUpperCase = letter === letter.toUpperCase();
    const alphabet = isUpperCase ? this.#uppercaseAlphabet : this.#alphabet;
    const letterIndex = alphabet.indexOf(letter);

    let shiftedIndex = (letterIndex + shiftAmount) % alphabet.length;
    if (shiftedIndex < 0) shiftedIndex = alphabet.length + shiftedIndex;
    let shiftedLetter = alphabet.charAt(shiftedIndex);

    if (!isUpperCase) {
      shiftedLetter = shiftedLetter.toLowerCase();
    }

    return shiftedLetter;
  }
}

firstLabNavButton.addEventListener('click', () => {
  Labs.chooseFirstLab();
});

firstLabStart.addEventListener('click', () => {
  const textValue = firstLabInputText.value;
  const { encripted, decripted, variants } = Labs.firstLabStart(textValue, parseInt(firstLabInputKey.value));
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
