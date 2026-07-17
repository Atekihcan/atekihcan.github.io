---
title: Hash Sum Mismatch Error on Ubuntu Virtual Machine
description: There is an annoying hash sum mismatch error on Linux distro virtual machines whenever you try to update/upgrade/install anything with apt. Here is a fix for that.
date: "2020-09-06T16:40:51+0530"
categories:
  - random
---


Recently I have started to prepare for a YouTube tutorial series on OpenGL. The goal of the project is to record all my expertise and knowledge on OpenGL in one place and help others. One key point of the codebase I'm preparing for the tutorial is to be cross platform. It should run on Windows/Linux as well as on mobile platform like Android.

For Linux, I needed a working Linux distro with display enabled. WSL2 is not yet supporting display, even on Windows insider update channel I have subscribed to. [It is on the way though](https://devblogs.microsoft.com/commandline/the-windows-subsystem-for-linux-build-2020-summary/#wsl-gui).

So for now, I have resorted back to using Ubuntu via VirtualBox. On Windows Host machine.

However, soon I came across an annoying problem which made it seem completely unusable.

### `apt` was broken

`upgrade` simply said there was no upgrades available. *That's just plain ridiculous on a fresh install*.

`install` for any package said, package cannot be located.

And `update` spewed out a lot of error like below, and failed repeatedly.

```bash
E: Failed to fetch store:/var/lib/apt/lists/partial/security.ubuntu.com_ubuntu_dists_focal-security_main_binary-amd64_Packages.xz  Hash Sum mismatch
   Hashes of expected file:
    - Filesize:1127835 [weak]
    - SHA256:eb5be3e6e8cf76c9ecbb8bd20b12444aee0e5d97a00590dd9f20f0c21414c719
    - SHA1:d071e0470bbdb3a4a287af56b1c38ab54e7838d7 [weak]
    - MD5Sum:d3e7a21e4040fe14f102a135917a9563 [weak]
   Hashes of received file:
    - SHA256:48823e7058acaf53e9c63c76af5adc46144291b2ae7ed83d5bdfed79339748f2
    - SHA1:fbb4eab18ca75cc4671db7ff70058c73e51f7a30 [weak]
    - MD5Sum:d3e7a21e4040fe14f102a135917a9563 [weak]
    - Filesize:1127835 [weak]
   Last modification reported: Thu, 03 Sep 2020 19:01:17 +0000
   Release file created at: Sun, 06 Sep 2020 09:30:08 +0000
E: Some index files failed to download. They have been ignored, or old ones used instead.
```

### Obvious Google Searches

A quick search gave a lot of forum posts which unanimously suggested to disable Windows Sandbox/Hyper-V. Which in turn meant disable WSL2.

WSL2 has been the best feature of Windows I have come across in all the years I have been using Windows, which is pretty much since the time I have started using computers. So clearly it was not something I wanted to do.

I had almost given up, and decided to postpone Linux support for the OpenGL tutorial. But hen came across a very recent post in [AskUbuntu](https://askubuntu.com/a/1242739/1124005), which suggested an alternate fix.

Just run the following before running `apt`

```bash
$ sudo bash
# mkdir /etc/gcrypt
# echo all >> /etc/gcrypt/hwf.deny
```

And that's all.

No need to give up WSL to run Ubuntu VM.
