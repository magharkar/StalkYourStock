import pandas as pd
import yfinance as yf
import awswrangler as wr
import requests

from datetime import datetime
def get_tickers_inc_data(ticker_list, start_date, end_date):
    ticker_datalist = []
    for item in ticker_list:
        data_df = yf.download(item, start=start_date, end=end_date, progress=False)
        data_df['ticker'] = item
        data_df['insert_timestamp'] = datetime.now()
        ticker_datalist.append(data_df)
        print("Incremental Data fetched for: ",item)
    ticker_history = pd.concat(ticker_datalist, axis=0)
    return ticker_history


def dfToS3(df, bucket_name, file_key_path):
    wr.s3.to_csv(df=df, path='s3://'+bucket_name+'/'+file_key_path)


if __name__ == "__main__":
    start = '2022-03-09'
    end = '2022-03-10'
    start_str = start.replace("-","")
    bucketname = "cloudsquad-project-bucket"
    file_path = "history_tickers/tickers_"+start_str+".csv"
    tickers_list = ['VRTX', 'ISRG', 'UNH', 'TDOC', 'BRK-A', 'JPM', 'V', 'MA', 'PYPL', 'AMZN', 'MSFT', 'AAPL', 'INTC',
                    'CSCO', 'NFLX', 'FB', 'GOOG', 'TSLA', 'F']
    inc_ticker_data = get_tickers_inc_data(tickers_list, start, end)
    dfToS3(inc_ticker_data, bucketname, file_path)
