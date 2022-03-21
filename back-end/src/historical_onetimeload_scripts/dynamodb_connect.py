import boto3
from boto3.dynamodb.conditions import Attr
from flask import Flask, request
import pandas as pd

app = Flask(__name__)

AWS_ACCESS_KEY_ID = 'ASIA3HLQO46HBGZSWPO7'
AWS_SECRET_ACCESS_KEY = 'iJwGU9nNuEo/LmMRKUGP4jUkjWqGZDpvMC7EzDHc'
AWS_SESSION_TOKEN = 'FwoGZXIvYXdzEHcaDG9uLHnOl32mfdblmiLAAc5UQXQDLmF2i7yklskEWXTXpx9Cm29C7a1WKi1EUriM8WTXirqjGKhc4lQ5ku2ebGlKwNjKX2pxxn6N5LA2VQd5F8XF2Adb77qovSmhcVuJM1N+mBeUC4Hw7tfvGLwOrZ/6wkTDtlYCW/3QHuvkraJ1D+FPhbGD7D/eS3WAOdYG5+mySWEq8nz6OQYil3BMJDzGOhJeG/8HFuPIz+NUV5ffUclkOYScGCTHAw/P8TY4CDrmHd+RKbenZvbzgWoEBCjXm9mRBjItE7gT1eZWb6FxOPKzSUAUUS0p0xOlyqA3P1UNNRrK4CIFL/zzi0Ho5/Xzj/Gl'
AWS_REGION = "us-east-1"


def createAWSSession():
    aws_session = boto3.Session(
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        aws_session_token=AWS_SESSION_TOKEN,
        region_name=AWS_REGION
    )
    return aws_session


@app.route("/get_data_for_tickers", methods=["GET"])
def get_table_data():
    ticker1 = request.args.get('ticker1')
    ticker2 = request.args.get('ticker2')
    session = createAWSSession()
    dynamodb = session.resource("dynamodb")
    dynamodb_tablename = 'ticker_oneyear'
    table = dynamodb.Table(dynamodb_tablename)
    json1 = table.scan(FilterExpression=Attr('ticker').eq(ticker1))
    items = json1["Items"]
    dataframe1 = pd.DataFrame(items)
    sorted_df1 = dataframe1.sort_values("date")
    date_arr1 = sorted_df1["date"].tolist()
    price_arr1 = sorted_df1["price"].apply(lambda x: round(x, 2)).tolist()

    json2 = table.scan(FilterExpression=Attr('ticker').eq(ticker2))
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


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000")
