function generatePin() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letter = letters.charAt(Math.floor(Math.random() * letters.length));
  const numbers = "0123456789";
  let pin = letter;
  for (let i = 0; i < 4; i++) {
    pin += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return pin;
}
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

export { generatePin, generateOtp };
