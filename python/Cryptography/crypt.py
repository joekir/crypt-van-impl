#!/usr/bin/env python3

'''
using example from 
https://cryptography.io/en/latest/hazmat/primitives/symmetric-encryption/#cryptography.hazmat.primitives.ciphers.modes.GCM
'''

import sys

from cryptography.hazmat.primitives.ciphers import (
    Cipher, algorithms, modes
)

from cryptography.hazmat.backends import default_backend

def encrypt(ptext, iv, aad, key):
    encryptor = Cipher(
        algorithms.AES(key),
        modes.GCM(iv),
        backend=default_backend()
    ).encryptor()

    encryptor.authenticate_additional_data(aad)

    # Encrypt the plaintext and get the associated ciphertext.
    # GCM does not require padding.
    ciphertext = encryptor.update(ptext) + encryptor.finalize()

    return (ciphertext.hex(), encryptor.tag.hex())

ptext = bytes(sys.argv[1],'utf8')
iv = bytes.fromhex(sys.argv[2])
aad = bytes(sys.argv[3],'utf8')
key = bytes.fromhex(sys.argv[4])

#print(ptext,iv,aad,key) 
print(encrypt(ptext,iv,aad,key))

