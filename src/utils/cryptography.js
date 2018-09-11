import cryptoJs from "crypto-js";

export const encryptHmacSha512 = (value, key) =>
  cryptoJs.HmacSHA512(value, key).toString();

export const encryptHmacSha512Key = value =>
  cryptoJs.HmacSHA512(value, "lunes").toString();

export const encryptSha512 = value => cryptoJs.SHA512(value).toString();

export const encryptMd5 = value => cryptoJs.MD5(value).toString();

export const encryptAes = (value, key) =>
  cryptoJs.AES.encrypt(value, key).toString();

export const decryptAes = (value, key) =>
  cryptoJs.AES.decrypt(value, key).toString(cryptoJs.enc.Utf8);
