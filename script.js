// ? Glolbal Selectors
const CHARACTERAMOUNTRANGE = document.getElementById('characterAmountRange');
const CHARACTERAMOUNTNUMBER = document.getElementById('characterAmountNumber');
const PASSWORDGENERATORFORM = document.getElementById('passwordGeneratorForm');
const INCLUDEUPPERCASE = document.getElementById('includeUppercase');
const INCLUDENUMBERS = document.getElementById('includeNumbers');
const INCLUDESYMBOLS = document.getElementById('includeSymbols');
const PASSWORDDISPLAY = document.getElementById('passwordDisplay');

// ? ASCII Character Codes
const UPPERCASE_CHAR_CODE = fromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODE = fromLowToHigh(97, 122);
const NUMBER_CHAR_CODE = fromLowToHigh(48, 57);
const SYMBOL_CHAR_CODE = fromLowToHigh(33, 47)
  .concat(fromLowToHigh(58, 64))
  .concat(fromLowToHigh(91, 96))
  .concat(fromLowToHigh(123, 126));

// * ---------------------------------------------------------------------
// ? Allow user to use either the number or range to change value
CHARACTERAMOUNTRANGE.addEventListener('input', syncCharacterAmount);
CHARACTERAMOUNTNUMBER.addEventListener('input', syncCharacterAmount);
// * ---------------------------------------------------------------------

// * ---------------------------------------------------------------------
PASSWORDGENERATORFORM.addEventListener('submit', function (e) {
  e.preventDefault();

  // ? Assign arugments for generatePassword func
  const _characterAmountNumber = CHARACTERAMOUNTNUMBER.value;
  const _includeUppercase = INCLUDEUPPERCASE.checked;
  const _includeNumbers = INCLUDENUMBERS.checked;
  const _includeSymbols = INCLUDESYMBOLS.checked;

  // ? value of generatePassword func
  const password = generatePassword(
    _characterAmountNumber,
    _includeUppercase,
    _includeNumbers,
    _includeSymbols
  );

  PASSWORDDISPLAY.innerText = password;
});
// * ---------------------------------------------------------------------

function fromLowToHigh(low, high) {
  const arr = [];
  for (let i = low; i <= high; i++) {
    arr.push(i);
  }
  return arr;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  CHARACTERAMOUNTRANGE.value = value;
  CHARACTERAMOUNTNUMBER.value = value;
}

function generatePassword(
  _characterAmountNumber,
  _includeUppercase,
  _includeNumbers,
  _includeSymbols
) {
  let charCodes = LOWERCASE_CHAR_CODE;
  if (_includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODE);
  if (_includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODE);
  if (_includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODE);
  const passwordCharacters = [];

  for (let i = 0; i < _characterAmountNumber; i++) {
    const character = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(character));
  }
  return passwordCharacters.join('');
}
