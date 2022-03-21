import pandas as pd
import yfinance as yf
import awswrangler as wr
import requests

# We are fetching the world metrices for past one year.
# Source: Yahoo Finance
# start='2021-3-8', end='2022-3-7'

def get_world_indices_hist():
    site = 'https://finance.yahoo.com/world-indices/'
    # df_list = pd.read_html('https://finance.yahoo.com/world-indices/')
    df_list = pd.read_html(requests.get(site, headers={'User-agent': 'Mozilla/5.0'}).text)
    majorStockIdx = df_list[0]
    return majorStockIdx


def get_historical_indexes_data(start_date, end_date):
    majorStockIdx = get_world_indices_hist()
    stock_list = []
    for s in majorStockIdx.Symbol:
        tickerData = yf.Ticker(s)
        tickerDf1 = tickerData.history(period='1d', start=start_date, end=end_date)
        tickerDf1['ticker'] = s
        stock_list.append(tickerDf1)
        print(s, " : completed")
    msi = pd.concat(stock_list, axis=0)
    return msi


def dfToS3(df, bucket_name, file_key_path):
    #wr.s3.to_csv(df=df, path='s3://cloudsquad-project-bucket/get_market_indexes/world_indexes.csv')
    wr.s3.to_csv(df=df, path='s3://'+bucket_name+'/'+file_key_path)


if __name__ == "__main__":
    start = '2021-3-8'
    end = '2022-3-7'
    bucketname = "cloudsquad-project-bucket"
    file_path = "get_market_indexes/world_indexes.csv"
    msi_data = get_historical_indexes_data(start, end)
    dfToS3(msi_data, bucketname, file_path)
