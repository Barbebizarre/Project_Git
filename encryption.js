const crypto = require('crypto');
const fs = require('fs');

function generateKeyAndEncryptPassword(username, email, password, chemin, callback) {
  crypto.generateKeyPair('rsa', {
    modulusLength: 2048,
    publicExponent: 0x10101,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-192-cbc',
        passphrase: password // Mot de passe pour la clé privée
    }
  }, (err, publicKey, privateKey) => {
    if (err) {
      console.error('Une erreur s\'est produite lors de la génération de la paire de clés:', err);
      return callback(err);
    }

    //const publicKeyFile = `UserKeys/${email}_${username}_public.pem`;
    const privateKeyFile = `UserKeys/${email}_${username}_private.pem`;

    if (!fs.existsSync('UserKeys')) {
      fs.mkdirSync('UserKeys');
    }

    //fs.writeFileSync(publicKeyFile, publicKey);
    fs.writeFileSync(privateKeyFile, privateKey);

    callback(null, publicKey);
  });
}

const username = process.argv[2];
const email = process.argv[3];
const password = process.argv[4];

generateKeyAndEncryptPassword(username, email, password, '', (err, publicKey) => {
  if (err) {
    console.error('Une erreur s\'est produite:', err);
    return;
  }
  console.log(publicKey);
});
