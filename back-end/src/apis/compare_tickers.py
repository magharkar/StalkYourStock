import boto3
from boto3.dynamodb.conditions import Attr
from flask import request
import pandas as pd
from flask import Blueprint
import os, sys
sys.path.append((os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) + '\\awsservices\\'))
import dynamo_class as dynamo


get_ticker_comparison = Blueprint('get_ticker_comparison', __name__)

dynamo_obj = dynamo.table()


@get_ticker_comparison.route("/get_data_for_tickers", methods=["GET"])
def get_table_data():
    ticker1 = request.args.get('ticker1')
    ticker2 = request.args.get('ticker2')
    dynamodb_tablename = 'ticker_oneyear'
    json1 = dynamo_obj.read_dynamo_and_sort(dynamodb_tablename, ticker1)
    items = json1["Items"]
    dataframe1 = pd.DataFrame(items)
    sorted_df1 = dataframe1.sort_values("date")
    date_arr1 = sorted_df1["date"].tolist()
    price_arr1 = sorted_df1["price"].apply(lambda x: round(x, 2)).tolist()

    json2 = dynamo_obj.read_dynamo_and_sort(dynamodb_tablename, ticker2)
    items2 = json2["Items"]
    dataframe2 = pd.DataFrame(items2)
    sorted_df1 = dataframe2.sort_values("date")
    # date_arr2 = sorted_df1["date"].tolist()
    price_arr2 = sorted_df1["price"].apply(lambda x: round(x, 2)).tolist()

    response = {
        "x": date_arr1,
        "price_array_1": price_arr1,
        "price_array_2": price_arr2
    }
    return response


