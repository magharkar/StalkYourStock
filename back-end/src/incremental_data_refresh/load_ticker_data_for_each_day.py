import json
import os
import sys
from decimal import Decimal

sys.path.append((os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) + '\\awsservices\\'))
import dynamo_class as dynamo_connect
import s3_class as s3_connect


def read_data_daily_from_s3():
    s3_resources = s3_connect.s3_operations()
    # file name is hardcoded for testing
    df = s3_resources.read_file("cloudsquad-project-bucket", "history_tickers", "tickers_20220318.csv")
    df = df.astype({"insert_timestamp": str})
    json_data = json.loads(df.to_json(orient="records"), parse_float=Decimal)
    return json_data


def insert_to_dynamo_daily(table_name, json_data):
    dynamo = dynamo_connect.table()
    dynamo.insert_data(table_name, json_data)
    print("Insert Complete!")


