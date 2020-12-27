File = require("fs");
class Util {
  createGuid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  write(path, data) {
    File.writeFile(path, data,err => {
        console.log(err);
    });
  }

  read(path) {
    return File.readFile(path, "utf8", (err) => {
        if(err){
            console.log(err);
        }
    });
  }
}

module.exports = new Util;
