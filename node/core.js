const crypto = require('crypto'),
      alg = 'aes-256-gcm';

function encrypt(ptext,iv,aad,key){
  var cipher = crypto.createCipheriv(alg, Buffer.from(key,'hex')
                                        , Buffer.from(iv,'hex'));

  cipher.setAAD(Buffer.from(aad,'utf8'));

  var encrypted = cipher.update(ptext, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  var tag = cipher.getAuthTag();

  return {
    ctext: encrypted,
    tag: tag.toString('hex')
  };
}

module.exports = encrypt
