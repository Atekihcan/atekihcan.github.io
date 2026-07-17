---
title: Verified GitHub Commits using GPG Keys
description: How to use GPG keys to securely sign your Git commits to and show a verified tag for each commits
date: "2020-09-13T17:47:51+0530"
categories:
  - random
---


If you have ever created a new GitHub repository directly from their web interface, you might have noticed that the first commit you made has a special `verified` tag attached to it. The same tag doesn't show up for commits made locally. However, it'll be there for any commits made from the web interface.

[![Verified Commit Example](/images/2020/13_commit_signature_verification_example.jpg)](https://github.com/Siccity/GLTFUtility/commits/master "Verified Commit Example from GLTFUtility Repo")

You can enable same commit verification pretty easily by setting up **G**NU **P**rivacy **G**uard or GPG keys.

Most of the things you need to know for this are already documented in the [official documentation](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification). The process is very similar to setting up SSH authentication.

### Exporting the Keys for Using from Another Local System

Now that you have a key with which you can sign your commits, it'd be great if you can use the same key while signing from a different environment or system.

To do that, you can first export both private and public key pairs as below...

```bash
$ gpg --export-secret-keys -a YOUR_KEY_ID > key_private.asc
$ gpg --export -a YOUR_KEY_ID > key_public.asc
```

Now copy these ASCII text files to the system/environment where you want to use them

*Remember you are sharing the private key also. So take caution on how you are copying it to the other system/environment.*

And then on the other environment, import them as follows...

```bash
$ gpg --import key_private.asc
$ gpg --import key_public.asc
```

After it is done, you'll also need to trust the keys to use it without any issues.

Type the following command in git bash (or bash if you are in Unix environment)...

```bash
$ gpg --edit-key 14CD2ADD54953E3C
```

In the `gpg` prompt that you'll get, execute the following command and select a trust level.

```bash
gpg> trust

...

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu
```

### Configure Git to Use the Key

And then follow the same procedure to add the key to your local Git configuration and commit with `-S` flag. Git will automatically sign your commits with the same key.

To make it more seamless, you can change the custom `add-commit` command I had mentioned in [an earlier post](/post:git-alias-add-commit) to include the `-S` flag as well.

Another way to sign all commits,is to configure your Git environment as follows

```bash
git config --global commit.gpgsign true
```

Also, if you are working from a command line only interface, add the following to your `.bashrc` so that  the signature verification prompt appears. Otherwise you might end up with some GPG error without any helpful message.

```bash
export GPG_TTY=$(tty)
```

