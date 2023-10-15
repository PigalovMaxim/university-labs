// Элементы первой лабы
const firstLabNavButton = document.getElementById('firstLab');
const firstLabContentDiv = document.getElementById('firstLabContent');
const firstLabInputText = document.getElementById('firstLabText');
const firstLabInputKey = document.getElementById('firstLabKey');
const firstLabStartButton = document.getElementById('firstLabStart');
const firstLabFillDefault = document.getElementById('firstLabFillDefault');
const firstLabEncriptText = document.getElementById('firstLabEncriptText');
const firstLabDecriptText = document.getElementById('firstLabDecriptText');
const firstLabDecipherText = document.getElementById('firstLabDecipherText');
// Элементы второй лабы
const secondLabNavButton = document.getElementById('secondLab');
const secondLabContentDiv = document.getElementById('secondLabContent');
const secondLabInputText = document.getElementById('secondLabText');
const secondLabInputKey = document.getElementById('secondLabKey');
const secondLabStartButton = document.getElementById('secondLabStart');
const secondLabFillDefault = document.getElementById('secondLabFillDefault');
const secondLabEncriptText = document.getElementById('secondLabEncriptText');
const secondLabDecriptText = document.getElementById('secondLabDecriptText');
// Элементы третьей лабы
const thirdLabNavButton = document.getElementById('thirdLab');
const thirdLabContentDiv = document.getElementById('thirdLabContent');
const thirdLabInputText = document.getElementById('thirdLabText');
const thirdLabInputKey = document.getElementById('thirdLabKey');
const thirdLabStartButton = document.getElementById('thirdLabStart');
const thirdLabFillDefault = document.getElementById('thirdLabFillDefault');
const thirdLabEncriptText = document.getElementById('thirdLabEncriptText');
const thirdLabDecriptText = document.getElementById('thirdLabDecriptText');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let secondLabAlphabetMatrix = [];
const gost_cipher_table = [
  0x0C, 0x04, 0x06, 0x02, 0x0A, 0x05, 0x0B, 0x09, 0x0E, 0x08, 0x0D, 0x07, 0x00, 0x03, 0x0F, 0x01,
  0x06, 0x08, 0x02, 0x03, 0x09, 0x0A, 0x05, 0x0C, 0x01, 0x0E, 0x04, 0x07, 0x0B, 0x0D, 0x00, 0x0F,
  0x0B, 0x03, 0x05, 0x08, 0x02, 0x0F, 0x0A, 0x0D, 0x0E, 0x01, 0x07, 0x04, 0x0C, 0x09, 0x06, 0x00,
  0x0C, 0x08, 0x02, 0x01, 0x13, 0x04, 0x0F, 0x06, 0x07, 0x00, 0x0A, 0x05, 0x03, 0x0E, 0x09, 0x0B,
  0x07, 0x0F, 0x05, 0x0A, 0x08, 0x01, 0x06, 0x0D, 0x00, 0x09, 0x03, 0x0E, 0x0B, 0x04, 0x02, 0x0C,
  0x05, 0x0D, 0x0F, 0x06, 0x09, 0x02, 0x0C, 0x0A, 0x0B, 0x07, 0x08, 0x01, 0x04, 0x03, 0x0E, 0x00,
  0x08, 0x0E, 0x02, 0x05, 0x06, 0x09, 0x01, 0x0C, 0x0F, 0x04, 0x0B, 0x00, 0x0D, 0x0A, 0x03, 0x07,
  0x01, 0x07, 0x0E, 0x0D, 0x00, 0x05, 0x08, 0x03, 0x04, 0x0F, 0x0A, 0x06, 0x09, 0x0C, 0x0B, 0x02
];
const GOST_Data_Part_N2_Half = 0;
const GOST_Data_Part_N1_Half = 1;
const TABLE_ROW_AMOUNT = 8;
const TABLE_COLUMN_AMOUNT = 16;

function closeAll() {
  const divs = [firstLabContentDiv, secondLabContentDiv, thirdLabContentDiv];
  divs.forEach(div => {
    div.classList.add('hidden');
  });

  const btns = [firstLabNavButton, secondLabNavButton, thirdLabNavButton];
  btns.forEach(btn => {
    btn.classList.remove('activeMenu');
  });
}

function generateDataForLabs() {
  const result = [];

  for (let i = 0; i < alphabet.length; i++) {
    const row = alphabet.slice(i) + alphabet.slice(0, i);
    result.push(row.split(''));
  }

  secondLabAlphabetMatrix = result;
}

generateDataForLabs();