import pandas as pd
import yfinance as yf
import awswrangler as wr
import requests
from datetime import datetime


def get_wi_inc_data(ticker_list, start_date, end_date):
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
    file_path = "history_market_indices/world_indexes_"+start_str+".csv"
    wi_list = ['^GSPC', '^DJI', '^IXIC', 'NYA', '^XAX', '^BUK100P', '^RUT', '^VIX', '^FTSE', '^GDAXI', '^FCHI',
                    '^STOXX50E', '^N100', '^BFX', 'IMOEX.ME', '^N225', 'HSI', '000001.SS', '399001.SZ', '^STI', '^AXJO',
                    '^AORD', '^BSESN', '^JKSE', '^KLSE', '^NZ50', '^KS11', '^TWII', '^GSPTSE', '^BVSP', '^MXX', '^MERV',
                    '^TA125.TA', '^JN0U.JO']
    inc_world_indices_data = get_wi_inc_data(wi_list, start, end)
    dfToS3(inc_world_indices_data, bucketname, file_path)
