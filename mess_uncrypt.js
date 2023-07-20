const crypto = require('crypto');
const fs = require('fs');
const { execSync } = require('child_process');

function uncryptmess(cryptemess) {
  const pythonScriptPathName = 'lib/features/readconfinfo.py';
  const resultName = execSync(`python ${pythonScriptPathName}`).toString().trim();
  const nameUser = resultName;

  const pythonScriptPathEmail = 'lib/features/readconfinfo2.py';
  const resultEmail = execSync(`python ${pythonScriptPathEmail}`).toString().trim();
  const emailUser = resultEmail;

  const modifiedEmail = emailUser.replace(/\W+/g, '');
  const modifiedUsername = nameUser.replace(/\W+/g, '');

  const privateKeyFile = `UserKeys/${modifiedEmail}_${modifiedUsername}_private_temp.pem`;

  const privateKey = fs.readFileSync(privateKeyFile);

  // Déchiffrer le mot de passe avec la clé privée
  const buffer = Buffer.from(cryptemess, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  const decryptedmessage = decrypted.toString();

  return decryptedmessage;
}

// Récupérer les arguments d'entrée (mot de passe chiffré)
const cryptemess = process.argv[2];

// Appeler la fonction pour déchiffrer le message
const decryptedmessage = uncryptmess(cryptemess);
console.log(decryptedmessage);
