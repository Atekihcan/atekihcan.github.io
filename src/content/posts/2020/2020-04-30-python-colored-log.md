---
title: Colored Logging in Python
description: How to produce beautifully formatted colored logs in python with dynamically changing logging level
date: "2020-04-30T09:56:51+0530"
categories:
  - code
---


Recently I have started working on a python module which can help me in downloading historical stock data using my broker's web APIs. This is the first time I have actually working on writing a proper python package. Usually I have used python till now only for standalone scripts or inside a Jupyter notebook. So I never needed proper logging functionality before.

However, this time it is different. I needed a proper logging mechanism in which I can have different types of logs (usual info, warning, debug, error etc.) formatted with different colors and a way to set the logging level from the caller app. For example, disabling verbose debug logs when I don't need them.

### Python Logging Module

Python has a well documented and standard [logging](https://docs.python.org/3/library/logging.html) module that can serve this purpose. However, by default it sends all the log to `stderr` and this means in Jupyter notebook even info logs shows up with <span style='background: #fdd; border-radius: 5px; padding: 2px 5px;'>light red background</span>. You can change that behavior by adding a stream handler configured to write to `stdout` instead of `stderr`, but then everything goes to `stdout`, even error logs and you lose the Jupyter formatting for errors.

You can create two different stream handlers configured differently but that was becoming too much work anyway for a simple thing I wanted.

And I have used similar functionality in all the C++ projects for past 5 years, so I know how simple it should have been.

<div class="highlight-green">Note: Please use `logging` module as often as you can. It is meant for consistent logging with all other python modules. For my case, I actually needed something to communicate with the application instead of typical logging to the system. If you want a good starting point for using colored logs with `logging` module, please have a look at [this gist](https://gist.github.com/joshbode/58fac7ababc700f51e2a9ecdebe563ad).</div>

### Short and Simple Script to do the Job

After a few minutes and following  what I  have done for years for C++ libraries as well as Android apps, this is what I ended up with ...

```python
import sys
from colorama import Fore, Style

LOG_LEVELS = {
    'e': 0,
    'w': 1,
    'i': 2,
    'd': 3,
    'v': 4
}

class Log(object):
    def __init__(self, tag = None, level = 'w', flush = False):
        if (tag is not None):
            self.prefix = "[" + tag + "] "
        self.flush = flush
        self.level = LOG_LEVELS[level.casefold()]

    def i(self, msg):
        if self.level >= 2:
            print(Fore.BLUE + self.prefix + msg + Fore.RESET, flush = self.flush)

    def d(self, msg):
        if self.level >= 3:
            print(Fore.LIGHTCYAN_EX + self.prefix + msg + Fore.RESET, flush = self.flush)

    def w(self, msg):
        if self.level >= 1:
            print(Fore.RED + self.prefix + msg + Fore.RESET, flush = self.flush)

    def e(self, msg):
        if self.level >= 0:
            print(Fore.LIGHTRED_EX + self.prefix + msg + Fore.RESET, file = sys.stderr, flush = self.flush)

    def setlevel(self, level):
        if level.casefold() in ['d', 'e', 'i', 'v', 'w']:
            self.level = LOG_LEVELS[level.casefold()]
        else:
            print(Fore.RED + f"{level} is not a valid level identifier" + Fore.RESET, file = sys.stderr, flush = True)
```

And here is how you use it

```python
from log import Log

logger = Log('my_app', level = 'i')

logger.i('info log')
logger.d('debug log 1') # Will not log as level is set to info
logger.w('warn log')
logger.e('error log')
logger.setlevel('d')
logger.d('debug log 2') # Will log as level is changed to debug
```

And this will result in the following output in Jupyter notebook

![Output of basic logging](/images/2020/04_python_log_output_1.jpg)

As you can see, you can change the log level any time. But note that although the second debug log is supposed to appear after the error log, it was printed before. The reason being the stream is not flushed by default. You can enforce that by setting up `Log` with flushing enabled as follows

```python
logger2 = Log('my_app', level = 'i', flush=True)
logger2.i('info log')
logger2.d('debug log 1') # Will not log as level is set to info
logger2.w('warn log')
logger2.e('error log')
logger2.setlevel('d')
logger2.d('debug log 2') # Will log as level is changed to debug
```

And the order is restored!

![Output of basic logging with flushing enabled](/images/2020/04_python_log_output_2.jpg)

### Further Extensions

The script can be extended to add timestamps or any other modifications required. But this good enough for me right now.
