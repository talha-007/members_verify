import CryptoJS from 'crypto-js';

const secretKey = 'thirsty_cat';
console.log(secretKey); // "thirsty_cat"
export const encryptData = (data) => {
  console.log(data);

  // Encrypt the data using AES
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
};
