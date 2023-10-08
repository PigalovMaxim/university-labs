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
// Элементы второй лабы
const secondLabNavButton = document.getElementById('secondLab');
const secondLabContentDiv = document.getElementById('secondLabContent');
const secondLabInputText = document.getElementById('secondLabText');
const secondLabInputKey = document.getElementById('secondLabKey');
const secondLabStart = document.getElementById('secondLabStart');
const secondLabFillDefault = document.getElementById('secondLabFillDefault');
const secondLabEncriptText = document.getElementById('secondLabEncriptText');
const secondLabDecriptText = document.getElementById('secondLabDecriptText');

class Labs {
  static #alphabet = 'abcdefghijklmnopqrstuvwxyz';
  static #uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  static #secondLabAlphabetMatrix = [];

  static closeAll = () => {
    const divs = [firstLabContentDiv, secondLabContentDiv];
    divs.forEach(div => {
      div.classList.add('hidden');
    });

    const btns = [firstLabNavButton, secondLabNavButton];
    btns.forEach(btn => {
      btn.classList.remove('activeMenu');
    });
  }

  static generateDataForLabs = () => {
    const result = [];

    for (let i = 0; i < this.#alphabet.length; i++) {
      const row = this.#alphabet.slice(i) + this.#alphabet.slice(0, i);
      result.push(row.split(''));
    }

    this.#secondLabAlphabetMatrix = result;
  }

  // Первая лаба

  static chooseFirstLab = () => {
    this.closeAll();
    firstLabContentDiv.classList.remove('hidden');
    firstLabNavButton.classList.add('activeMenu');
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

  // Вторая лаба

  static chooseSecondLab = () => {
    this.closeAll();
    secondLabContentDiv.classList.remove('hidden');
    secondLabNavButton.classList.add('activeMenu');
  }

  static secondLabStart = (text, key) => {
    text = text.toLowerCase();
    key = key.toLowerCase();
    // шифровка
    const halfEncripted = this.#secondLabFillKey(text, key);
    const encripted = this.#secondLabChangeLettersByAlphabet(halfEncripted, text, false);

    // расшифровка
    const halfDecripted = this.#secondLabFillKey(encripted, key);
    const decripted = this.#secondLabChangeLettersByAlphabet(halfDecripted, encripted, true);

    return { encripted, decripted };
  }

  static #secondLabFillKey = (text, key) => {
    const letters = text.split('');

    let halfEncripted = '';
    let currentKeyIndex = 0;
    for (const letter of letters) {
      if (this.#alphabet.includes(letter)) {
        if (currentKeyIndex === key.length) currentKeyIndex = 0;
        halfEncripted += key[currentKeyIndex];
        currentKeyIndex++;
        continue;
      }
      halfEncripted += letter;
    }
    return halfEncripted;
  }

  static #secondLabChangeLettersByAlphabet = (halfEncripted, text, reverse) => {
    let encripted = '';
    for (let i = 0; i < halfEncripted.length; i++) {
      const halfEncriptedLetter = halfEncripted[i];
      if (!this.#alphabet.includes(halfEncriptedLetter)) {
        encripted += halfEncriptedLetter;
        continue;
      }
      for (const encriptedAlphaber of this.#secondLabAlphabetMatrix) {
        if (encriptedAlphaber[0] !== halfEncriptedLetter) continue;
        const startLetter = text[i];
        let encriptedLetter = '';
        if (reverse) {
          const startLetterEncriptedAlphaberIndex = encriptedAlphaber.indexOf(startLetter);
          encriptedLetter = this.#alphabet[startLetterEncriptedAlphaberIndex];
        } else {
          const startLetterEncriptedAlphaberIndex = this.#alphabet.indexOf(startLetter);
          encriptedLetter = encriptedAlphaber[startLetterEncriptedAlphaberIndex];
        }
        encripted += encriptedLetter;
      }
    }

    return encripted;
  }
}

Labs.generateDataForLabs();

// Первая лаба

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

// Вторая лаба

secondLabInputKey.addEventListener('input', function () {
  secondLabInputKey.value = secondLabInputKey.value.replace(/[^a-zA-Z\s,.\-]/g, '');
});

secondLabStart.addEventListener('click', () => {
  const textValue = secondLabInputText.value;
  const keyValue = secondLabInputKey.value;
  const { encripted, decripted } = Labs.secondLabStart(textValue, keyValue);
  secondLabEncriptText.innerHTML = encripted;
  secondLabDecriptText.innerHTML = decripted;
});

secondLabInputText.addEventListener('input', function () {
  secondLabInputText.value = secondLabInputText.value.replace(/[^a-zA-Z\s,.\-]/g, '');
});

secondLabNavButton.addEventListener('click', () => {
  Labs.chooseSecondLab();
});

secondLabFillDefault.addEventListener('click', () => {
  secondLabInputText.value = 'hello world';
  secondLabInputKey.value = 'ass';
});