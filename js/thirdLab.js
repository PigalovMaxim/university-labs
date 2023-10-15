function chooseThirdLab() {
  closeAll();
  thirdLabContentDiv.classList.remove('hidden');
  thirdLabNavButton.classList.add('activeMenu');
}

thirdLabNavButton.addEventListener('click', () => {
  chooseThirdLab();
});

thirdLabStartButton.addEventListener('click', () => {
  const text = thirdLabInputText.value;
  if (text.length !== 8) return thirdLabEncriptText.innerHTML = 'Текст должен состоять из 8 символов';
  const key = thirdLabInputKey.value;
  const ciphertext = DESEncrypt(text, key);
  const decrypt = DESDecrypt(ciphertext, key);
  thirdLabEncriptText.innerHTML = ciphertext;
  thirdLabDecriptText.innerHTML = decrypt;
});

thirdLabFillDefault.addEventListener('click', () => {
  thirdLabInputText.value = 'EIGHTSYM';
  thirdLabInputKey.value = 'youcanuseonly8symbols';
});

thirdLabInputText.addEventListener('input', function () {
  thirdLabInputText.value = thirdLabInputText.value.replace(/[^a-zA-Z\s,.\-]/g, '');
});