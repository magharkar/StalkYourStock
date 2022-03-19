import boto3
import pandas as pd
from io import StringIO
import calc_returns as rt
import matplotlib.pyplot as plt
import io

def get_session():
    session = boto3.Session(
        aws_access_key_id="ASIA3HLQO46HEEIIBLWF",
        aws_secret_access_key="F4yNaz9z62UGHua56sqtlpaxS4+NSi9H5oGkGTNr",
        aws_session_token="FwoGZXIvYXdzEGcaDPkqESyinX9jp44ISSLAAXnCklKMDL/DGo0+IexjiN1o4lXQvFgFIyyDuKuUQCcs8sSgmaOm8uvR/ig59TEG4tRuuBVxEsRleI4x8pXAUbr3fXVKohYM+JkoLHHSyKvC/1XjoTYncarvisE5m41x2n22FE9H2omYBIpr/ru7fO9bctkAcNcjsE2Mx2xt9vbrGJ+vCYiK8Nog9fO2KMpoQzZqKgqucUItxXGeq7hn3ZBixni1ZYXD2ij117xUf54lcYazjuAeF9xcU0ZB2u0kVCjy1NWRBjItCKBv89UAxUqv7++Pfv5Mv5wJHzeoli859XEEZkHS4fu+LI2E3Sf85tiktzF3",
        region_name='us-east-1'
    )
    return session




def read_world_metrices_from_s3(bucketname, filepath, filter=None):
    try:
        session = get_session()
        s3 = session.resource('s3')
        obj = s3.Object(bucketname, filepath)
        body = obj.get()['Body'].read().decode('utf-8')
        raw_df = pd.read_csv(StringIO(body))
        return raw_df
    except Exception as e:
        print("Exception:")
        print(str(e))
        return 400


def data_cleaning(inp_metrics_df):
    inp_metrics_df['Date'] = pd.to_datetime(inp_metrics_df['Date'], format='%Y-%m-%d %H:%M:%S.%f')
    inp_metrics_df.sort_values(by=['ticker', 'Date'], inplace=True, ascending=False)
    inp_metrics_df['prev_close'] = inp_metrics_df['Close'].shift(-1)
    inp_metrics_df['prev_close'] = inp_metrics_df['prev_close'].fillna(0)

    # Percentage change = ((Today close - Yesterday Close) / Yesterday Close)x100
    inp_metrics_df['percentage_change'] = ((inp_metrics_df['Close'] - inp_metrics_df['prev_close']) / inp_metrics_df[
        'prev_close']) * 100
    print(inp_metrics_df[['ticker', 'Close', 'prev_close', 'Date', 'percentage_change']])

    return inp_metrics_df


if __name__ == "__main__":
    bucketname = "cloudsquad-project-bucket"
    file_path = "history_tickers"
    df = read_prefix_to_df(bucketname, file_path)
    print(df)
    # # Step-1 : read world metrices from s3
    # bucketname = "cloudsquad-project-bucket"
    # file_path = "get_market_indexes/"
    # suffix = ".csv"
    # raw_input = read_world_metrices_from_s3(bucketname, file_path)
    #
    # # Step-2 : perform data transformation
    # #raw_input = pd.read_csv("world_metrices.csv")
    # output_world_metrics_df = data_cleaning(raw_input)
    #
    # # Step-3 : calculating cumulative returns
    # inp_metrics_df = output_world_metrics_df.set_index('Date')
    # inp_metrics_df.sort_values(by=['ticker', 'Date'], inplace=True, ascending=True)
    # daily_cum = rt.calc_daily_cumulative_returns(inp_metrics_df, ticker_symbol='^XAX')
    # print(daily_cum)
    #
    # monthly_cum = rt.calc_monthly_cumulative_returns(inp_metrics_df, ticker_symbol='^XAX')
    # print(monthly_cum)
