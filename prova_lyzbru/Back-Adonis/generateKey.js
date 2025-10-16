import { randomBytes } from 'crypto';

// Gera uma chave de 32 bytes em formato hexadecimal
const appKey = randomBytes(32).toString('hex');

// Exibe a chave no console
console.log("APP_KEY:", appKey);