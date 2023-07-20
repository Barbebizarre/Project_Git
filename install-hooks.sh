#!/bin/bash

# Chemin vers le répertoire .git/hooks/
hooks_dir=".git/hooks"

# Chemin vers le hook pre-commit
hook_file="pre-commit"

# Copier le hook pre-commit dans le répertoire .git/hooks/
cp "$hook_file" "$hooks_dir/"

# Assurer les permissions d'exécution pour le hook pre-commit
chmod +x "$hooks_dir/$hook_file"

echo "Le hook pre-commit a été installé avec succès !"
