---
title: Installing Latest CMake from Source on Linux Distro
description: Often latest CMake or for that matter other tools are not available in the official repository of Linux distros. Here is how you can build it from source.
date: "2020-09-06T17:47:51+0530"
categories:
  - random
---


As I had mentioned in the [previous post](/post:hash-sum-mismatch-ubuntu-virtualbox), I have been working on setting up a Linux VM to test my upcoming OpenGL tutorial series. As part of that, I  was trying to setup CMake on the VM, so that I can sort out cross platform builds.

However, default CMake version available in Ubuntu repository was 3.10.2 and I needed at least 3.15 to fully utilize some of the latest features.

<div class="highlight-green">If you are on Ubuntu, Snap has latest CMake available. Install it with

```bash
sudo snap install cmake --classic # version 3.18.2
```

</div>

At this point, there were two options:

* Either download pre-built binaries
* Or build from source

### Remove Existing CMake

If any  version of CMake was installed earlier, first remove that completely...

```bash
sudo apt purge --auto-remove cmake
```

### Build from Source it is

Feel free to download binaries if you want, from [official CMake download page](https://cmake.org/download/).

I decided to  go with build from source. This works for any other similar tools as well.

Download latest source code from the same download page and extract

```bash
$ wget https://github.com/Kitware/CMake/releases/download/v3.18.2/cmake-3.18.2.tar.gz
$ tar -xvzf cmake-3.18.2.tar.gz
```

Change directory to the extracted one, build and install CMake ...

```bash
./bootstrap
make -j$(nproc)
sudo make install
```

If you get an error related to OpenSSL, download and install OpenSSL from source. The process is similar to what we are doing with CMake and explained [here](https://stackoverflow.com/a/44789238/4218110).

### BAM! Unexpected Recursion

[![Hofstadter by xkcd](https://imgs.xkcd.com/comics/hofstadter.png)](https://xkcd.com/917/ "Hofstadter by xkcd")

### When you come out of it

Confirm CMake version

```bash
$ cmake --version

cmake version 3.18.2
CMake suite maintained and supported by Kitware (kitware.com/cmake).
```

And done!
