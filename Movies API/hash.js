const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(10);                     // instead of passing a callback, we await the promise
    const hashed = await bcrypt.hash('password', salt)
    console.log(salt);
    console.log(hashed)
}

run();