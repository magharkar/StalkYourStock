import pandas as pd
import yfinance as yf
import requests
from datetime import datetime
import boto3
from io import StringIO
import json
# BDay is business day, not birthday...
from pandas.tseries.offsets import BDay


def get_tickers_inc_data(ticker_list, start_date, end_date):
    ticker_datalist = []
    for item in ticker_list:
        data_df = yf.download(item, start=start_date, end=end_date, progress=False)
        data_df['ticker'] = item
        data_df['insert_timestamp'] = datetime.now()
        ticker_datalist.append(data_df)
        print("Incremental Data fetched for: ", item)
    ticker_history = pd.concat(ticker_datalist, axis=0)
    return ticker_history


def writeToS3(df, bucket, prefix_file_path):
    csv_buffer = StringIO()
    df.to_csv(csv_buffer)
    s3_resource = boto3.resource('s3')
    s3_resource.Object(bucket, prefix_file_path).put(Body=csv_buffer.getvalue())
    print("File written successfullyto S3.")


def main(event, context):
    # start = '2022-03-09'
    # end = '2022-03-10'
    current_date = datetime.today().date()
    previous_day = str(current_date - BDay(1))
    # start = str(current_date)
    start_str = str(current_date - BDay(2))
    start = start_str[0:10]
    end = previous_day[0:10]
    print("Start Date: ", start)
    print("End Date:", end)
    start_str = start.replace("-", "")
    bucketname = "cloudsquad-project-bucket"
    file_path_prefix = "history_tickers/tickers_" + start_str + ".csv"
    # tickers_list = ['VRTX', 'ISRG', 'UNH', 'TDOC', 'BRK-A', 'JPM', 'V', 'MA', 'PYPL', 'AMZN', 'MSFT', 'AAPL', 'INTC', 'CSCO', 'NFLX', 'FB', 'GOOG', 'TSLA', 'F']
    tickers_list = ['AAPL']
    inc_ticker_data = get_tickers_inc_data(tickers_list, start, end)
    writeToS3(inc_ticker_data, bucketname, file_path_prefix)

    return {
        'statusCode': 200,
        'body': json.dumps('Ticker data refreshed for today nad written to S3.!!')
    }

if __name__ == "__main__":
    start = '2022-03-17'
    end = '2022-03-18'
    start_str = start.replace("-", "")
    bucketname = "cloudsquad-project-bucket"
    file_path = "history_tickers/tickers_" + start_str + ".csv"
    tickers_list = ['VRTX', 'ISRG', 'UNH', 'TDOC', 'BRK-A', 'JPM', 'V', 'MA', 'PYPL', 'AMZN', 'MSFT', 'AAPL', 'INTC',
                    'CSCO', 'NFLX', 'FB', 'GOOG', 'TSLA', 'F']
    inc_ticker_data = get_tickers_inc_data(tickers_list, start, end)
    inc_ticker_data.to_csv("today.csv")
    #dfToS3(inc_ticker_data, bucketname, file_path)
