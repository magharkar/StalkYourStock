import boto3
import pandas as pd
from io import StringIO
import calc_returns as rt
import matplotlib.pyplot as plt


def get_session():
    session = boto3.Session(
        aws_access_key_id="ASIA3HLQO46HGTL3YTNB",
        aws_secret_access_key="TbcZBb92xisAXuGdDYsBWPIabhyYla/1zRUf4e+j",
        aws_session_token="FwoGZXIvYXdzEG0aDNdJ/rB0P4f0R9jusiLAAdGOsFCpNUjZ+sOVGAjeErbKsC+dMh5EflGAvuEsdKkSotwPPX9towUknilwbBJC1wgfEKo0rXIVIFoMbHrsbfILMJwTaHHpIFdF9P0COdT2Tv/0NEmhVf3ZhVU0ZPyYXvvdr+H0nrMuaUCnIhznhfy3T/hYzNYIspIbp1EpKuysrivWJa9Ogu31CeHkAmp7wFTgaUlPQA5zpns9lpkaUWgPxAYyASgtIVY0pNiKrHvo71eYKWP6Vc/4HPWK+fD7Yyjx1p6RBjItKwsjvpfvyBmytRhwAXC+ZxpoJZ2SsoFOBG4aERxPnmHNNa6CtBxlSY+JxJx2",
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
    # Step-1 : read world metrices from s3
    # bucketname = "cloudsquad-project-bucket"
    # file_path = "get_market_indexes/world_indexes.csv"
    # raw_input = read_world_metrices_from_s3(bucketname, file_path)

    # Step-2 : perform data transformation
    raw_input = pd.read_csv("world_metrices.csv")
    output_world_metrics_df = data_cleaning(raw_input)

    # Step-3 : calculating cumulative returns
    inp_metrics_df = output_world_metrics_df.set_index('Date')
    inp_metrics_df.sort_values(by=['ticker', 'Date'], inplace=True, ascending=True)
    daily_cum = rt.calc_daily_cumulative_returns(inp_metrics_df, ticker_symbol='^XAX')
    print(daily_cum)

    monthly_cum = rt.calc_monthly_cumulative_returns(inp_metrics_df, ticker_symbol='^XAX')
    print(monthly_cum)
