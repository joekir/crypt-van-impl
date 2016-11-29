# Crypt Van Impl
*A comparison framework for cryptography implementations in various languages*

![Rip Van Winkle](/public/img/RipVanWinkle.jpg)

### First target
AES-GCM 256bit key with AAD and tag checking.

### running
```
npm update
npm test <number of iterations>
```

If there is any discrepancy found between the libraries in use it will report the
inputs that triggered that so you can investigate!

### To add your library to the framework

1. Create a Node.js wrapper (async or sync) for your the algorithm spec above
   The wrapper module needs to expose a single function

   ```        
   /*
    * This function runs your crypto lib from the shell.
    * See the file /python/pycrypt.js in this repo for an example.
    */
   function anyNameYouLike(ptext,iv,aad,key){
     ...
     returns {
       "ctext" : "<blargh!",
       "tag"   : "arrgh!!"
       }
   }

   module.exports = anyNameYouLike     
   ```

2. Add a reference to your script to index.js with an appropriate name.
e.g. encryptRb, encryptPl, encryptPy.

Then ensure it's called in the async while loop and that the result is passed with the others
to the compare function.
