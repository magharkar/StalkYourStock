import json
import boto3
import pandas as pd
import io

from decimal import Decimal

s3_client = boto3.client('s3')
dynamodb = boto3.resource("dynamodb")
dynamodb_tablename = 'ticker_oneyear'
table = dynamodb.Table(dynamodb_tablename)

def float_to_decimal(num):
    return Decimal(str(num))
    
def write_data_to_dynamodb(df):
    df = df.fillna(0)
    # convert any floats to decimals
    for i in df.columns:
        datatype = df[i].dtype
        if datatype == 'float64':
            df[i] = df[i].apply(float_to_decimal)
    # write to dynamodb
    testdf = df.head(5)
    
    #wr.dynamodb.put_df(df=df, table_name=dynamodb_tablename)
    js = testdf.to_json(orient = 'columns')
    print(js)
    table.put_item(Item = {
        "id":str(testdf['Date']),
        "ticker":str(testdf['ticker']),
        "price":str(testdf['Adj Close'])
    })
    print("Dynamo DB write successful!!")
    

def get_session():
    session = boto3.Session(
        aws_access_key_id="ASIA3HLQO46HMDAT4C7Q",
        aws_secret_access_key="WiVZPLIFSRrzTzbFF3CrztRLqL6ngzCdYxPbS3x0",
        aws_session_token="FwoGZXIvYXdzEHMaDFQSHpvXhaS8iXdH/yLAAeFfS+ib+rPwruj3RMOrC9Fx/tTO3TWGL9pKq0T24GsGnvgmEH1OSZB+ExxxIf6ug0zdFMSQcLi3vtLK0AOhdkRdbWXb8GTjSAvML6RqWvuP6UP0QAVb215mY5jUBcFzzboHiovt7kpQc9L9uvoqW8pKyQwTVjmoUk4gCuNCpzwjx5dqBwenC7LrlrMBFkAxYQp2VvN0cNjJPv9wPkI50+amQke8j5yzUmuk4pxkbEMrrM8Z9BFGQBZuyuaNBDiRbyjjstiRBjItbJQU7XxxYcI1Ry6IpK0OwvnYxmbizEJSBFlJmzVK4/ebH8DzJe6Yuya/z5NU",
        region_name='us-east-1'
    )
    return session


def createTable(userName, awsSession):
    dynamodb_session = awsSession.resource('dynamodb')
    table = dynamodb_session.create_table(
        TableName=userName,
        KeySchema=[
            {
                'AttributeName': 'date_time',
                'KeyType': 'HASH'
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'date_time',
                'AttributeType': 'S'
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
    )
    return table


def read_dynamo():
    session = get_session()
    dynamodb = session.resource("dynamodb")
    dynamodb_tablename = 'ticker_oneyear'
    table = dynamodb.Table(dynamodb_tablename)
    json = table.scan()
    print(json)

def read_prefix_to_df(bucketname, prefix):
    try:
        s3 = boto3.resource('s3')
        bucket = s3.Bucket(bucketname)
        prefix_objs = bucket.objects.filter(Prefix=prefix)
    
        prefix_df = []
    
        for obj in prefix_objs:
            key = obj.key
            body = obj.get()['Body'].read()
            temp = pd.read_csv(io.BytesIO(body), encoding='utf8')
            prefix_df.append(temp)
    
        df = pd.concat(prefix_df, axis=0)
    except Exception as err:
        print(err)
    return df
    
def lambda_handler(event, context):
    #bucket = event["Records"][0]["s3"]["bucket"]["name"]
    bucket = "cloudsquad-project-bucket"
    prefix = "history_tickers"
    df = read_prefix_to_df(bucket, prefix)
    #print(df.head())
    write_data_to_dynamodb(df)
    
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }


if __name__ == "__main__":
    createTable("testd", get_session())
    #read_dynamo()