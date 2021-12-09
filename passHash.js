const bcrypt = require('bcrypt');

async function hashPassword(str) {
  const myPassword = 'admin123q';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();




