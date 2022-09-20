const crypto = require('crypto');
const buffer = require('buffer');

// Create a private key
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
modulusLength: 2048,
});

// Convert string to buffer
const data = Buffer.from("I Love GeeksForGeeks");

// Sign the data and returned signature in buffer
const sign = crypto.sign("SHA256", data , privateKey);

// Convert returned buffer to base64
const signature = sign.toString('base64');

// Printing the signature
console.log(`Signature:\n\n ${signature}`);
