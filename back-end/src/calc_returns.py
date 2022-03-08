# This function calculates and returns daily and monthly returns
# Plotting the daily and monthly returns are useful for understanding the daily and monthly volatility of the investment.

import pandas as pd


# daily return
def calc_daily_returns(df, ticker_symbol):
    filter_df = df[df['ticker'] == ticker_symbol]
    daily_returns = filter_df['Close'].pct_change()
    return daily_returns


# monthly return
def calc_monthly_returns(df, ticker_symbol):
    filter_df = df[df['ticker'] == ticker_symbol]
    monthly_returns = filter_df['Close'].resample('M').ffill().pct_change()
    return monthly_returns


def calc_daily_cumulative_returns(df, ticker_symbol):
    daily_return_df = calc_daily_returns(df, ticker_symbol)
    symbol_dcum_returns = (daily_return_df + 1).cumprod()
    return symbol_dcum_returns


def calc_monthly_cumulative_returns(df, ticker_symbol):
    monthly_return_df = calc_monthly_returns(df, ticker_symbol)
    symbol_mcum_returns = (monthly_return_df + 1).cumprod()
    return symbol_mcum_returns


