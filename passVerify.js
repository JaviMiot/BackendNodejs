const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin123q';
  const hash = '$2b$10$DbTM5QAwSVup/48Y52DkHuJC7ejHb1NDWonOXBUjmcCVGxQZuHeqO';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();




