package main

import "crypto/aes"
import "crypto/cipher"
import "encoding/hex"
import "os"
import "fmt"


func main(){
  ptext   := []byte(os.Args[1])
  iv,err  := hex.DecodeString(os.Args[2])
  aad     := []byte(os.Args[3])
  key,err := hex.DecodeString(os.Args[4])

  block,err := aes.NewCipher(key)
  if err != nil {
    panic(err.Error())
  }

  aesgcm, err := cipher.NewGCM(block)
  if err != nil {
    panic(err.Error())
  }

  ciphertext := aesgcm.Seal(nil,iv,ptext,aad)
  fmt.Printf("%x\n",ciphertext)
}
