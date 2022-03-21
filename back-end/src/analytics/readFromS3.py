import boto3
import io
import pandas as pd


def read_prefix_to_df(bucketname, prefix):
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
    return df