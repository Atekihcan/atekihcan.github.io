---
title: "SVN Checkout Error [svn: E120106: ra_serf:]"
description: "How to fix annoying SVN E120106 error 'ra_serf: The server sent a truncated HTTP response body' during SVN checkout"
date: "2020-04-28T21:56:51+0530"
categories:
  - random
---


While at work today, I had to download source code of some open source project for evaluation. However, the source code was not hosted on GitHub but in SVN.

Now if you are like me, you also probably have no idea how to use SVM. I know that it is some sort of version controlling system. _No wonder it's actual name is **Subversion**_.

Anyway, I tried the usual command to checkout the master ~~brunch~~ *trunk* after searching my way around SVN commands..

``` text
svn checkout URL PATH
```

But apparently the source code is too big, and the connection was getting closed by the server with following error

``` text
svn: E120106: ra_serf: The server sent a truncated HTTP response body
```

Searching on the internet suggested increasing the server timeout. But did not get any clear idea on that front. Finally found some resource where it suggested that if some files were copied (which it was), instead of checking out the whole thing again, try only updating it using

``` text
svn update
```

Unfortunately that resulted in some other error

``` text
svn: Working copy 'directory' locked
svn: run 'svn cleanup' to remove locks (type 'svn help cleanup' for details)
```

Luckily, the solution to that was in the helpful error message. *Note to self: Write meaningful error logs!*

The checkout was unfinished and it did not remove the lock it had placed on the SVN resources. So when I tried to update, obviously it failed. The final solution was to do the following repeatedly until the whole code base was downloaded

``` text
svn update; svn cleanup
```

That's all!

It needed to be done probably 20 times to get the whole code base. That's how big it is.

But that's all.
