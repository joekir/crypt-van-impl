const exec = require('child_process').exec,
      util = require('util');
      cwd  = require('process').cwd();

/*
 * Interface requires
 * func(ptext,iv,aad,key,cb) to return ctext||tag
*/
var run = function(ptext,iv,aad,key,cb){
  var comd = util.format('%s/go/bin/gocrypt %s %s %s %s',cwd
                          ,ptext,iv,aad,key);

  exec(comd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    
    if(stderr)
      throw stderr

    //console.log(stdout);
    cb(stdout);
  });
}

module.exports = run
