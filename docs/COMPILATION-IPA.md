# COMPILATION IPA — FYLIO

## État actuel

Le projet est **prêt à compiler**. Tout le code est en place :
- ✅ Moteur de transfert réel (TCP + Zeroconf + protocole)
- ✅ Lecteurs vidéo (PiP) / audio / PDF
- ✅ Permissions iOS configurées (photos, réseau local, Bonjour)
- ✅ `eas.json` créé
- ⬜ Compte Expo à connecter (unique étape bloquante)

## Étapes de compilation (à faire une seule fois)

### 1. Créer un compte Expo (gratuit)
Aller sur https://expo.dev/signup

### 2. Se connecter dans le terminal
```bash
cd "D:\CLAUDE CODE FYLIO\fylio"
npx eas-cli login
```
(entrer email + mot de passe du compte Expo)

### 3. Initialiser le projet EAS
```bash
npx eas-cli init --id fylio --non-interactive
```

### 4. Compiler l'IPA (build dans le cloud, ~20 min)
```bash
npx eas-cli build --platform ios --profile preview
```
Le profil `preview` compile un IPA **sans signature App Store**,
directement utilisable avec **Sideloadly**.

### 5. Récupérer le lien de téléchargement
À la fin du build, EAS affiche un lien du type :
`https://expo.dev/artifacts/eas/xxxxxxx.ipa`

## Installation avec Sideloadly

1. Télécharger Sideloadly : https://sideloadly.io
2. Brancher l'iPhone au PC (câble USB)
3. Ouvrir le fichier .ipa téléchargé dans Sideloadly
4. Entrer l'identifiant Apple
5. Cliquer "Start" — l'IPA est signée avec votre compte Apple
6. Sur l'iPhone : Réglages → Général → VPN et gestion des appareils → Faire confiance

**Limites du compte Apple gratuit :** signature valable 7 jours,
3 applications maximum sideloadées.

## Sécurité

⚠️ Ne **jamais** mettre de certificats, clés privées ou identifiants
Apple dans le dépôt GitHub. Les identifiants restent dans Sideloadly
sur votre machine.
