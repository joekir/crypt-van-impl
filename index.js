const encryptNd = require('./node/core.js'),
      crypto = require('crypto'),
      encryptPy = require('./python/Cryptography/cryptography.js'),
      encryptGo = require('./go/gocrypt.js');

var ptext,iv,aad,key,res1,res2,res3;

/* bulk compare for arbitrary amount.
 * returns true if there's a difference
 */
function compare(...args){
  var parity = true;

  for(var i=1; i<args.length; i++){
    parity = parity && (args[i] && args[i-1] == args[i-1])

    if(parity == false)
      return true
  }
  return false
}

function run(){
  ptext = Math.random().toString(36).substr(2, Math.floor(Math.random()*24+3));
  iv = crypto.randomBytes(12).toString('hex');
  aad = Math.random().toString(36).substr(2, Math.floor(Math.random()*24+3));
  key = crypto.randomBytes(32).toString('hex');

  encryptPy(ptext,iv,aad,key,(res2) => {
    encryptGo(ptext,iv,aad,key, (res3) =>  {
      res1 = encryptNd(ptext,iv,aad,key);
      if(compare(res1,res2,res3)) {
        console.log("==== DIFF Detected ====");
        console.log("ptext: %s, iv: %s, aad: %s, key: %s\n"
                  ,ptext,iv,aad,key);
        console.log("res1:%s,res2:%s,res3:%s",res1,res2,res3)
      }

      // async while alternative
      if (i > 1){
        --i;
        run()
      } else{ console.log('done')}
    })
  });
}

var i = parseInt(process.argv[2],"10");

if (!isNaN(i)){
  console.log("running for %s iterations",i);
  run();
} else{
  console.error("invalid input, syntax should be");
  console.log("npm test <number>");
}
