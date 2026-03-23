import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AesService {
  private readonly IV_LENGTH = 16; // bytes

  encrypt(plainText: string, secretKey: string = "OhMyGenius!"): string {
    try {
      const key = this.deriveKey(secretKey);
      
      const iv = CryptoJS.lib.WordArray.random(this.IV_LENGTH);
      
      const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      
      const combined = iv.clone().concat(encrypted.ciphertext);

      return CryptoJS.enc.Base64.stringify(combined);
    } catch (err) {
      return "";
    }
  }
  
  decrypt(encryptedText: string, secretKey: string = "OhMyGenius!"): string {
    try {
      const combined = CryptoJS.enc.Base64.parse(encryptedText);
      
      const ivWords: number[] = [];
      const ciphertextWords: number[] = [];
      
      for (let i = 0; i < combined.words.length; i++) {
        if (i < 4) { // first 4 words = 16 bytes = IV
          ivWords.push(combined.words[i]);
        } else {
          ciphertextWords.push(combined.words[i]);
        }
      }
      
      const iv = CryptoJS.lib.WordArray.create(ivWords);
      const ciphertext = CryptoJS.lib.WordArray.create(ciphertextWords);
      
      const key = this.deriveKey(secretKey);
      
      const decrypted = CryptoJS.AES.decrypt(
        ciphertext.toString(CryptoJS.enc.Base64),
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );
      
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      
      return result;
    } catch (err: any) {
      console.log("Decryption Failed: " + err.message)
      return "";
    }
  }

  private deriveKey(secret: string): CryptoJS.lib.WordArray {
    return CryptoJS.SHA256(secret);
  }
  
}
