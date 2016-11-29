const exec = require('child_process').exec,
      util = require('util');
      cwd  = require('process').cwd();

/*
 * Interface requires
 * func(ptext,iv,aad,key,cb) to return {ctext, tag}
*/
var run = function(ptext,iv,aad,key,cb){
  var comd = util.format('%s/python/pycrypt.py %s %s %s %s',cwd
                          ,ptext,iv,aad,key);

  exec(comd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    
    if(stderr)
      throw stderr

    var m = stdout.match(/\(\'([a-z0-9]+)\',\s*\'([a-z0-9]+)\'\)/);
    var result = {
      "ctext": m[1],
      "tag": m[2]
    };

    //console.log(result);
    cb(result);
  });
}

module.exports = run
