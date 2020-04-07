const User = require('./User');

const bcrypt = require('bcryptjs');

process.stdout.write('What is your name?');
process.stdin.once('data', function(name) {
  process.stdout.write('What is your email?');
  process.stdin.once('data', function(email) {
    process.stdout.write('What is your password?');
    process.stdin.once('data', function(password) {
      process.stdout.write('Pleas confirm your password:');
      process.stdin.once('data', function(confirm) {
        name = name.toString().trim();
        email = email.toString().trim();
        password = password.toString().trim();
        confirm = confirm.toString().trim();
        console.log(password, confirm, email, name);
        if (password == confirm) {
          password = bcrypt.hashSync(password, 10);
          User.create({
            name,
            email,
            password
          });
          process.stdout.write('Successfully created account\n');
        }
      });
    });
  });
});
