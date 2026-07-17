---
title: A Super Helpful Shortcut to Add and Commit to Git at the Same Time
description: Using the power of Git aliases to add and commit changes at the same time and streamlining the Git workflow
date: "2020-05-02T09:56:51+0530"
categories:
  - random
---


More often than not, I work with a very simple Git workflow. Especially for my personal projects where I'm the sole contributor. Where I do not have something that does not need to be tracked, except for of course whatever I have put in `.gitigonre`.

It's usually goes something like this...

* Make changes in local repo
* Add all changes to Git tracker

    ```bash
    git add -A

* Commit changes

    ```bash
    git commit -m "Some commit message"

### What if I Could do Both at the Same Time

That is a nice thought.

But unfortunately, Git does not have such a command.

However, there are ways you can add it to your workflow.

By using the powerful [Git aliases.](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)

Simply add a new alias which combined both got commands into a new aliased command as follows

```bash
git config --global alias.add-commit '!git add -A && git commit -m'
```

Here, `add-commit` is the new alias and you can now add all changes commit them at the same time as follows

```bash
git add-commit "Some commit message"
```

### Caveat for Windows

If you are on Windows, the alias adding command will fail with a very unhelpful "help" message. It won't tell you what went wrong, except for printing the whole help menu for `git config`.

The solution?

As silly as it is, just use double quote instead of single ones to wrap the alias as follows

```bash
git config --global alias.add-commit "!git add -A && git commit -m"
```

That's all!
