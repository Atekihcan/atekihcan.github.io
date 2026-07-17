---
title: How to Setup Android SDK on WSL
description: A short and complete guide on how to setup Android SDK on Windows Subsystem for Linux to simplify Android development process
date: "2020-05-08T08:40:51+0530"
categories:
  - code
  - random
---


After I have discovered the wonder called [VS Code](https://code.visualstudio.com/), I have been hooked to it. It's my goto editor for any project now. The convenience of having file browsing, editing with plethora of extensions, integrated terminal, and on top of that the existence of WSL means I do not need to switch Windows often. It takes the clutter out of my way.

However, this post is not about VS Code. It is about how to setup Android SDK on WSL, so that Android development can be done in a Linux system without actually having an access to one. And move the entire development work to VS Code instead of Android studio.

### Usual Google Searches

If you search on Google on how to achieve this, most likely [this gist](https://gist.github.com/jjvillavicencio/18feb09f0e93e017a861678bc638dcb0) will be in top five results. It covers the most crucial points, but it is a little old by now.

First of all, there are some points missing which are added and/or modified in the comment chain. Follow those.

Second, the `sdk-tools` suggested to download has been upgraded by Google and now it is called `commandlinetools`, and same instructions do not work for that.

### Pre-requisites

Initial parts for prerequisites remains same,

```bash
sudo apt update
sudo apt upgrade
sudo apt install zip unzip
```

Create a directory for the SDK, wherever you want...

```bash
mkdir Android
cd Android
```

### Download Android SDK and Install Java

Download latest version of Android SDK command line tools from [official website](https://developer.android.com/studio#downloads). You'll need to scroll down to the section for **Command line tools only**.

And unzip it to a *new* folder. Note that this is where it starts to differ from that gist.

```bash
wget https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip
unzip commandlinetools-linux-6609375_latest.zip -d cmdline-tools
rm -rf commandlinetools-linux-6609375_latest.zip
```

Install `zlib` and Java 8. Add `JAVA_HOME` environment variable and update path for Java.

```bash
sudo apt install lib32z1 openjdk-8-jdk
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
printf "\n\nexport JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64\nexport PATH=\$PATH:\$JAVA_HOME/bin" >> ~/.bashrc
```

### Install SDK Components

First get a list of available components. And then download as you wish.

```bash
cd Android/cmdline-tools/tools/bin
./sdkmanager --list
```

I want the latest and greatest stuff along with `cmake`

Don't forget the `--install` switch. Without that license acceptance prompt will not show up and it may cause an issue later.

```bash
./sdkmanager --install "platform-tools" "platforms;android-29" "build-tools;30.0.1" "cmake;3.6.4111459"
```

Word of caution: if you need NDK, leave that for later. When you'll run the gradle setup for your project, it'll automatically install it for you. I did install NDK at this point using SDK manager, but my gradle setup anyway ignored that and downloaded NDK again.

Update PATH again. Change path to Android directory as per your system.

```bash
export ANDROID_HOME=/path/to/Android
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/tools/bin
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/platform-tools
printf "\n\nexport ANDROID_HOME=/path/to/Android\nexport PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/tools\nexport PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/tools/bin\nexport PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/platform-tools" >> ~/.bashrc
```

Update SDK

```bash
sdkmanager --update
```

### Install Gradle

Install Gradle through `sdkman`

```bash
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install gradle 5.6.4
```

That's it.
Open your project and run any gradle command to start working.

A good starting point would be to run `gradle tasks --all` to get gradle up  and running without actually doing a build.
