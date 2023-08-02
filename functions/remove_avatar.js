let path = require('path');
let fs = require('fs');

function remove_avatar(name){
    const storage = path.resolve(__dirname, `../public/images/users/${name}`);
    fs.unlink(storage, (err) => { if (err) {return console.log(err);}});
    console.log(name)
};


module.exports = remove_avatar;