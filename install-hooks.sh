#!/bin/bash

# Chemin vers le répertoire .git/hooks/
hooks_dir=".git/hooks"

# Nom du hook pre-commit
hook_file="pre-commit"

# Vérifier si le hook pre-commit existe déjà
if [ -f "$hooks_dir/$hook_file" ]; then
  echo "Le hook pre-commit existe déjà. Veuillez le sauvegarder et le supprimer manuellement avant de continuer."
  exit 1
fi

# Contenu du hook pre-commit
pre_commit_content="#!/bin/bash

# Récupérer les fichiers à committer
git_files=\$(git diff --cached --name-only --diff-filter=ACM | grep \".js$\")
  
# Si aucun fichier JavaScript n'est modifié, quitter sans erreur
if [[ -z \"\$git_files\" ]]; then
  exit 0
fi

# Exécuter ESLint sur les fichiers modifiés
npx eslint \"\$git_files\"

# Récupérer le code de sortie d'ESLint
eslint_status=\$?

# Si ESLint a renvoyé une erreur, annuler le commit
if [[ \$eslint_status -ne 0 ]]; then
  echo \"ESLint a trouvé des problèmes dans les fichiers à committer. Abandon du commit.\"
  exit 1
fi

# Sinon, la validation a réussi
exit 0
"


# Créer le hook pre-commit avec le contenu approprié
echo "$pre_commit_content" > "$hooks_dir/$hook_file"

# Assurer les permissions d'exécution pour le hook pre-commit
chmod +x "$hooks_dir/$hook_file"

echo "Le hook pre-commit a été créé et installé avec succès !"

