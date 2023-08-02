let path = require('path');
let fs = require('fs');

function remove_img_book (name){
    const storage = path.resolve(__dirname, `../public/img-books/${name}`);
    fs.unlink(storage, (err) => { if (err) {return console.log(err);}});
};

module.exports = remove_img_book;