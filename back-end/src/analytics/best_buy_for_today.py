import io
import os.path
import sys
import json
from datetime import datetime
from decimal import Decimal
import boto3
import pandas as pd

import readFromS3 as rd

sys.path.append((os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) + '\\aws-services\\'))
import s3_class as connect
import dynamo_class as dconnect
from pandas.tseries.offsets import BDay

# perform analytics on the data
def analytics_calculation(bucketname, prefix_folder):
    df_today, df_prev = get_data_as_df(bucketname, prefix_folder)
    transformed_df = data_transformation(df_today, df_prev)

    # Analytic #1
    highestDrops = best_buy_calc(transformed_df)
    print(highestDrops)

    # Analytic #2
    lowestDrops = best_sell_calc(transformed_df)
    print(lowestDrops)

    # insert to dynamo
    d_obj = dconnect.table()

    highestDrops_json = json.loads(highestDrops.to_json(orient="records"))
    d_obj.insert_data("highest_drops", highestDrops_json)
    d_obj.insert_data("lowest_drops", highestDrops.to_json(orient="records"))

def float_to_decimal(num):
    return Decimal(str(num))


# read today's and previous days data file from s3
def get_data_as_df(bucketname, folder):
    s3_obj = connect.s3_operations()
    # now = datetime.now()
    # date = datetime.now() - timedelta(1)
    # yesterday = datetime.now() - timedelta(1)

    current_date = datetime.today().date()
    previous_day = str(current_date - BDay(1))
    # start = str(current_date)
    start_str = str(current_date - BDay(2))
    date = start_str[0:10]
    yesterday = previous_day[0:10]


    file_name_today = "tickers_" + str(date).replace("-", "") + ".csv"
    file_name_prev = "tickers_" + str(yesterday)[0:10].replace("-", "") + ".csv"
    df_today = s3_obj.read_file(bucketname, folder, file_name_today)
    df_prev = s3_obj.read_file(bucketname, folder, file_name_prev)
    print("S3 data fetched for ", file_name_today)
    print("S3 data fetched for ", file_name_prev)
    return df_today, df_prev


# get top 5 highest drops
def best_buy_calc(transformed_df):
    bestbuyDF = transformed_df.sort_values(by="percentage_change", ascending=False).reset_index(drop=True)
    bestbuyDF['insert_timestamp'] = datetime.now()
    return bestbuyDF.head(5)


# get top 5 lowest drops
def best_sell_calc(transformed_df):
    bestsaleDF = transformed_df.sort_values(by="percentage_change", ascending=True).reset_index(drop=True)
    bestsaleDF['insert_timestamp'] = datetime.now()
    return bestsaleDF.head(5)


# perform data transformation
def data_transformation(df_today, df_prev):
    data = pd.merge(df_today, df_prev, on=["ticker"], how="left")
    data["difference"] = data["Adj Close_x"] - data["Adj Close_y"]
    data["percentage_change"] = (data["difference"] / data["Adj Close_y"]) * 100
    new_data = {"ticker": data["ticker"],
                "percentage_change": data["percentage_change"],
                "previous_closing": data["Adj Close_y"],
                "todays_closing": data["Adj Close_x"]}
    new_df = pd.DataFrame(new_data)
    # convert any floats to decimals - dynamo
    for i in new_df.columns:
        datatype = new_df[i].dtype
        if datatype == 'float64':
            new_df[i] = new_df[i].apply(float_to_decimal)
    return new_df


if __name__ == "__main__":
    bucketname = "cloudsquad-project-bucket"
    folder = "history_tickers"
    analytics_calculation(bucketname, folder)
