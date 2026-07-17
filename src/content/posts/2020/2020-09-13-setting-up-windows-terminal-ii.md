---
title: Setting up and Customizing Windows Terminal Part II
description: A short guide on how to setup Windows Terminal and customize it with starship
date: "2020-09-13T17:47:51+0530"
categories:
  - random
---


In the [previous article](/post:setting-up-windows-terminal), I had talked about customizing Windows Terminal as well as VS Code integrated terminal using [Oh My Posh](https://ohmyposh.dev/) and [Terminal Icons](https://github.com/devblackops/Terminal-Icons). However, I have found **Oh My Posh** to be very slow at times and may be somewhat fancier than I'd like.

After searching for some more options for customizations, I stumbled on [Starship](https://starship.rs/). It's fast, minimal, and highly customizable.

### Install for Windows

You'll need [Scoop](https://scoop.sh/) to install Starship for Windows. You can install Scoop with following commands:

```powershell
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

Or use the shorter version

```powershell
iwr -useb get.scoop.sh | iex
```

Note: if you get an error you might need to change the execution policy (i.e. enable Powershell) with

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

Finally install Starship using Scoop:

```powershell
scoop install starship
```

And add following lines in your PowerShell profile configuration file to activate Starship.

```powershell
Invoke-Expression (&starship init powershell)
```

<div class="highlight-green">You can find PowerShell configuration in <code>$HOME\Documents\PowerShell\</code>. You can simply start the profile configuration file for editing in VS Code from terminal with the below command

```powershell
code .$PROFILE
```

</div>

### Install for Linux/WSL

Use below command to install Starship using prebuilt binaries:

```bash
curl -fsSL https://starship.rs/install.sh | bash
```

Add following to your `.bashrc` file

```bash
eval "$(starship init bash)"
```

### Custom Theme

Starship can be customized as you wish using a TOML configuration file. Details on how to customize each module can  be found in the [official documentation](https://starship.rs/config/).

The configuration file must be stored in `$HOME\.config\starship.toml` for Windows and in `~/.config/starship.toml` for Linux.

I have been using the following configuration:

```toml
# Don't print a new line at the start of the prompt
add_newline = true

# Wait 10 milliseconds for starship to check files under the current directory.
scan_timeout = 10

# Use custom format
format = """$cmd_duration

$OS$time$directory$git_branch$git_commit$git_state$git_status
[❯❯❯](bold green) """

# Show how much time it took for last command if it is more than 500ms
[cmd_duration]
min_time = 1000
format = "took [$duration](bold yellow)"

# Local Time
[time]
disabled = false
format = '[\[$time\]](#E95420)'
time_format = "%T"

[directory]
format = '[ $path ](#E95420)'

# Git Stuff
[git_branch]
format = '[\[$branch\]]($style)'
truncation_length = 16
truncation_symbol = ""
[git_status]
format = '( [$all_status$ahead_behind]($style))'
style = ""
untracked = "[?$count](#FF8C00) "
stashed = "[X$count](red) "
modified = "[M$count](#DC143C) "
staged = "[+$count](green) "
renamed = "[~$count](#FFD700) "
deleted = "[-$count](red) "

[env_var]
variable = "SHELL"
default = "unknown shell"
```

Which results in following prompt:

![Starship Custom Prompt](/images/2021/15_starship_custom_prompt.jpeg)
