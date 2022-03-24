from flask import request
import pandas as pd
from flask import Blueprint
import os, sys
sys.path.append((os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) + '\\awsservices\\'))
import dynamo_class as dynamo

day_wise_data = Blueprint('day_wise_data', __name__)
dynamo_obj = dynamo.table()

@day_wise_data.route("/get_day_vs_volume", methods=["GET"])
def day_vs_vol():
    ticker = request.args.get('ticker')
    dynamodb_tablename = 'ticker_history_data'
    json = dynamo_obj.read_dynamo_and_sort(dynamodb_tablename, ticker)
    try:
        items = json["Items"]
        dataframe = pd.DataFrame(items)
        sorted_df = dataframe.sort_values("Date")
        date_arr = sorted_df["Date"].tolist()
        volume = sorted_df["Volume"].apply(lambda x: round(x, 2)).tolist()
        return {"x": date_arr, "volume": volume}, 200
    except ValueError as e:
        print(e)
        return {"error": "No data found"}, 500

@day_wise_data.route("/get_day_vs_price")
def day_vs_price():
    ticker = request.args.get('ticker')
    dynamodb_tablename = 'ticker_history_data'
    json = dynamo_obj.read_dynamo_and_sort(dynamodb_tablename, ticker)
    try:
        items = json["Items"]
        dataframe = pd.DataFrame(items)
        sorted_df = dataframe.sort_values("Date")
        date_arr = sorted_df["Date"].tolist()
        volume = sorted_df["Adj Close"].apply(lambda x: round(x, 2)).tolist()
        return {"x": date_arr, "adj_closing_price": volume}, 200
    except ValueError as e:
        print(e)
        return {"error": "No data found"}, 500

@day_wise_data.route("/get_day_vs_returns")
def day_vs_returns():
    ticker = request.args.get('ticker')
    dynamodb_tablename = 'ticker_history_data'
    json = dynamo_obj.read_dynamo_and_sort(dynamodb_tablename, ticker)
    try:
        items = json["Items"]
        dataframe = pd.DataFrame(items)
        sorted_df = dataframe.sort_values("Date")
        date_arr = sorted_df["Date"].tolist()
        percent_change = sorted_df["Close"].pct_change()
        volume = percent_change.apply(lambda x: round(x, 2)).tolist()
        return {"x": date_arr, "returns": volume}, 200
    except ValueError as e:
        print(e)
        return {"error": "No data found"}, 500