---
title: Changing Timeframe of OHLC Candlestick Data in Pandas
description: How to easily calculate larger timeframe data like 5 minutes or 1 hour, given OHLC candlestick data for a stock in lower timeframe like 1 minute using Python Pandas DataFrame
date: "2020-06-20T09:56:51+0530"
categories:
  - code
  - trading
---


I had mentioned in a [previous post](/post:python-colored-log), that I'm working on a Python module for downloading historical stock data *for free* using my broker's web APIs. The module is finished now, and right now I'm working on setting up a module for [algorithmic trading](https://www.investopedia.com/articles/active-trading/101014/basics-algorithmic-trading-concepts-and-examples.asp) using the same data.

The idea is to run a strategy that can do some analysis on the historical data and emit a signal like `BUY`, `SELL`, or `HOLD`.

Now, the strategy might be a little complex that it needs multiple timeframe data to confirm the strength of the signal. For example, it might want to check for signal every 5 minutes, but also wants to look at what's happening at a larger timeframe like 1 hour to discard any short term signals that are actually noises.

### How to Resample OHLC Data in Pandas

Let's load a smaller timeframe data.

I'll load 1 minute intraday OHLC data as that can be resampled to any other timeframe I want. Stock is HDFC Bank trading in NSE.

```python
import pandas as pd
data = pd.read_csv('HDFCBANK_1min.csv', index_col=0, parse_dates=True)
data.head()
```

As my data is already stored nicely in `CSV` format, the dataframe looks like below.

![DataFrame head for 1 minute OHLC data](/images/2020/10_pandas_ohlc_1min_head.jpg)

Now, I want to resample it to 5 minute data, which should have opening price same as first 1 minute candle, high price as maximum of five candles, low price as minimum of five candles, *close* as close of fifth candle, and volume data as sum of the five candles.

Naive approach would have been to loop over the DataFrame and calculate these, But luckily for us, Pandas already has [an API](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.resample.html) to do this: `resample`.

Here's how to use this in this instance...

Note: `base=15` is not really needed for 5 minute sampling, but it'll be required if you want to maintain 9:15 AM as the starting point even when you are sampling for 30 minute or 1 hour data. Without this, the sampled data will start from 9:00 AM.

```python
ohlc = {
    'open': 'first',
    'high': 'max',
    'low': 'min',
    'close': 'last',
    'volume': 'sum'
}

df = data.resample('5min', base=15).apply(ohlc)
df.head()
```

Voila! You get 5 minute data nicely formatted!

![DataFrame head for 1 minute OHLC data](/images/2020/10_pandas_ohlc_5min_head.jpg)

<div class="highlight-green">This works well with Pandas version `1.0.3`. If you are any other version of Pandas, feel free to consult the documentation. Here is how you can check Pandas version: `pd.__version__`, or for any Python module.</div>

### Can We Ever Have a Life without Caveat

I guess not!

Pandas `resample` API although works beautifully, it also samples data that did not exist, e.g. non-trading hours data. Indian markets open at 9:15 AM and closes at 3:30 PM [#](#how-to-fix-non-trading-day-resampling). However, if you try to peek at the data between two trading days, you'll see Pandas has introduces `NaN` data for non-trading hours like below.

![Wrongly sampled after market data](/images/2020/10_pandas_ohlc_5min_head_after_market.jpg)

A quick fix would be to use another Pandas API, `between_time` as follows

```python
df = df.between_time('09:15', '15:25')
```

And you get correct result

![Fixed after market data](/images/2020/10_pandas_ohlc_5min_head_after_market_fixed.jpg)

However, non-trading days (Saturday, Sunday, and any other trading holidays) will still have incorrect data. For example, 20th June 2020 should not have any data, but it has been now filled with `NaN` from 9:15  AM to 3:30 PM.

![Wrongly sampled non-trading day data](/images/2020/10_pandas_ohlc_5min_head_non_trading.jpg)

### How to Fix Non-trading Day Resampling

Frankly, I  have not yet found a proper way to fix this.

Ideally, you can have a list of non-trading days, and you can filter out the data using that list. But it comes with extra headache of collecting non-trading days for historical data. Also, some days, trading might happen at a different time than usual, for example, Indian markets open on the evening of Diwali, for [Muhurat Trading](https://en.wikipedia.org/wiki/Muhurat_trading), sometime between 6PM and 7PM.

So the problem is two-fold now.

What I have done for now is simply filtered out any row having `NaN` data as opening price instead of using `between_time`.

```python
df = df.drop(df[df.open.isnull()].index) # Better to check all of them?
df.loc['2020-06-19 15:20:00':'2020-06-22 09:20:00'].head()
```

Now, data between Friday and Monday is filtered properly.

![Fixed after market and non-trading day data](/images/2020/10_pandas_ohlc_5min_head_non_trading_fixed.jpg)

But this will work properly, if your data is otherwise clean. Or may be check if every piece of data for an index in `NaN` and filter based on that. Don't check if volume is zero though, that can actually happen for some stocks on a relatively less active trading day, or if the stock is hitting circuits for some time, or the stock does not have enough liquidity.