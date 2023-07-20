const crypto = require('crypto');
const fs = require('fs');

function cryptmess(username_contact, email_contact, message) {
  const publicKeyFile = `Pubkeys/${email_contact}_${username_contact}_public.pem`;
  publicKey = fs.readFileSync(publicKeyFile, 'utf8');
// Chiffrer le mot de passe avec la clé publique
  const buffer = Buffer.from(message, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  const encryptedmessage = encrypted.toString('base64');
  return encryptedmessage;
}
// Récupérer les arguments d'entrée (nom d'utilisateur, adresse e-mail, mot de passe)
const username_contact = process.argv[2];
const email_contact = process.argv[3];
const message = process.argv[4];
// Appeler la fonction pour générer la clé et chiffrer le message
encryptedmessage = cryptmess(username_contact, email_contact, message);
console.log(encryptedmessage);
