function generateKeys(p, q) {
  const n = p * q;
  const phi = (p - 1) * (q - 1);

  let e = 0;
  for (let i = 2; i < phi; i++) {
    if (gcd(i, phi) == 1) {
      e = i;
      break;
    }
  }

  let d = 0;
  for (let i = 2; i < phi; i++) {
    if ((i * e) % phi == 1) {
      d = i;
      break;
    }
  }

  return {
    public_key: { e, n },
    private_key: { d, n }
  };
}

function gcd(a, b) {
  while (b != 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function encrypt(message, public_key) {
  const e = public_key.e;
  const n = public_key.n;

  let encrypted_message = '';
  const messageArray = message.split('');
  messageArray.forEach(char => {
    const char_ascii = char.charCodeAt(0);
    const encrypted_char = bcpowmod(char_ascii, e, n);
    encrypted_message += encrypted_char + ' ';
  });

  return encrypted_message.trim();
}

function decrypt(encrypted_message, private_key) {
  const d = private_key.d;
  const n = private_key.n;

  let decrypted_message = '';
  const encryptedArray = encrypted_message.split(' ');
  encryptedArray.forEach(char => {
    if (char !== '') {
      const decrypted_char = bcpowmod(char, d, n);
      decrypted_message += String.fromCharCode(decrypted_char);
    }
  });

  return decrypted_message;
}

const p = gmp_nextprime(gmp_random(10));
const q = gmp_nextprime(gmp_random(10));

const keys = generateKeys(p, q);
const public_key = keys.public_key;
const private_key = keys.private_key;

const message = 'Hello, world!';
const encrypted_message = encrypt(message, public_key);
const decrypted_message = decrypt(encrypted_message, private_key);

console.log('Original message: ' + message);
console.log('Encrypted message: ' + encrypted_message);
console.log('Decrypted message: ' + decrypted_message);
