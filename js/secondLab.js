function chooseSecondLab() {
  closeAll();
  secondLabContentDiv.classList.remove('hidden');
  secondLabNavButton.classList.add('activeMenu');
}

function secondLabStart(text, key) {
  text = text.toLowerCase();
  key = key.toLowerCase();
  // шифровка
  const halfEncripted = secondLabFillKey(text, key);
  const encripted = secondLabChangeLettersByAlphabet(halfEncripted, text, false);

  // расшифровка
  const halfDecripted = secondLabFillKey(encripted, key);
  const decripted = secondLabChangeLettersByAlphabet(halfDecripted, encripted, true);

  return { encripted, decripted };
}

function secondLabFillKey(text, key) {
  const letters = text.split('');

  let halfEncripted = '';
  let currentKeyIndex = 0;
  for (const letter of letters) {
    if (alphabet.includes(letter)) {
      if (currentKeyIndex === key.length) currentKeyIndex = 0;
      halfEncripted += key[currentKeyIndex];
      currentKeyIndex++;
      continue;
    }
    halfEncripted += letter;
  }
  return halfEncripted;
}

function secondLabChangeLettersByAlphabet (halfEncripted, text, reverse) {
  let encripted = '';
  for (let i = 0; i < halfEncripted.length; i++) {
    const halfEncriptedLetter = halfEncripted[i];
    if (!alphabet.includes(halfEncriptedLetter)) {
      encripted += halfEncriptedLetter;
      continue;
    }
    for (const encriptedAlphaber of secondLabAlphabetMatrix) {
      if (encriptedAlphaber[0] !== halfEncriptedLetter) continue;
      const startLetter = text[i];
      let encriptedLetter = '';
      if (reverse) {
        const startLetterEncriptedAlphaberIndex = encriptedAlphaber.indexOf(startLetter);
        encriptedLetter = alphabet[startLetterEncriptedAlphaberIndex];
      } else {
        const startLetterEncriptedAlphaberIndex = alphabet.indexOf(startLetter);
        encriptedLetter = encriptedAlphaber[startLetterEncriptedAlphaberIndex];
      }
      encripted += encriptedLetter;
    }
  }

  return encripted;
}

secondLabInputKey.addEventListener('input', function () {
  secondLabInputKey.value = secondLabInputKey.value.replace(/[^a-zA-Z\s,.\-]/g, '');
});

secondLabStartButton.addEventListener('click', () => {
  const textValue = secondLabInputText.value;
  const keyValue = secondLabInputKey.value;
  const { encripted, decripted } = secondLabStart(textValue, keyValue);
  secondLabEncriptText.innerHTML = encripted;
  secondLabDecriptText.innerHTML = decripted;
});

secondLabInputText.addEventListener('input', function () {
  secondLabInputText.value = secondLabInputText.value.replace(/[^a-zA-Z\s,.\-]/g, '');
});

secondLabNavButton.addEventListener('click', () => {
  chooseSecondLab();
});

secondLabFillDefault.addEventListener('click', () => {
  secondLabInputText.value = 'hello world';
  secondLabInputKey.value = 'ass';
});