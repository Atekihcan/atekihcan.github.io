---
title: Signing Git Commits with Touch ID on macOS
description: How to set up GPG key signing on macOS with Touch ID authentication using pinentry-mac
date: 2026-06-20
categories:
  - random
---

Since my [last post on GPG signing](/post:using-gpg-keys-to-sign), I have moved to MacBook and was wondering if I could setup to use Apple TouchID to do the signing instead. And turns out I can.

### Install pinentry-mac

[pinentry-mac](https://github.com/GPGTools/pinentry) integrates GPG passphrase prompts with the macOS Keychain, which means Touch ID support.

```bash
brew install pinentry-mac
```

### Configure gpg-agent

Tell GPG to use `pinentry-mac` for passphrase prompts:

```bash
mkdir -p ~/.gnupg
echo "pinentry-program $(which pinentry-mac)" >> ~/.gnupg/gpg-agent.conf
gpgconf --kill gpg-agent
```

### Generate a GPG key

```bash
gpg --full-generate-key
```

When prompted, choose:
- **Key type**: ECC (sign only) or RSA 4096, depending on your preference
- **Expiry**: up to you, 1 year is reasonable. I just go with perpetual.
- **Name and email**: use the same email as your GitHub account
- **Passphrase**: set a strong one. You won't need to type it often thanks to Touch ID

### Get your key ID

```bash
gpg --list-secret-keys --keyid-format long
```

Look for the hex string after the algorithm, e.g. in `ed25519/ABC123DEF456`, the key ID is `ABC123DEF456`.

### Configure Git to sign commits

```bash
git config --global user.signingkey <YOUR_KEY_ID>
git config --global commit.gpgsign true
git config --global gpg.program gpg
```

### Add the public key to GitHub

Export your public key:

```bash
gpg --armor --export <YOUR_KEY_ID>
```

Copy the entire output (including the `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----` lines) and add it at [GitHub > Settings > SSH and GPG keys > New GPG key](https://github.com/settings/gpg/new).

### Test it

```bash
echo "test" | gpg --clearsign
```

The first time, `pinentry-mac` will pop up asking for your passphrase. Check **"Save in Keychain"** and hit OK. From that point on, it authenticates via Touch ID. No more passphrase typing.

Your commits will now show as **Verified** on GitHub.
