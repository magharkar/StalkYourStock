import boto3
import aws_session as session
import pandas as pd
import json
from boto3.dynamodb.conditions import Key
import io


class s3_operations():
    def __init__(self):
        awsSessionObj = session.aws_session()
        self.connectSession = awsSessionObj.createAWSSession("nikita-aws-lab")
        self.db = self.connectSession.resource('s3')
        print("Initialized")

    # Read all files from the bucket > folder
    def read_prefix_to_df(self, bucketname, prefix):
        bucket = self.db.Bucket(bucketname)
        prefix_objs = bucket.objects.filter(Prefix=prefix)

        prefix_df = []

        for obj in prefix_objs:
            key = obj.key
            body = obj.get()['Body'].read()
            temp = pd.read_csv(io.BytesIO(body), encoding='utf8')
            prefix_df.append(temp)

        df = pd.concat(prefix_df, axis=0)
        return df

    # Read a particular file within bucket > folder.
    def read_file(self, bucket_name, folder, file):
        bucket = self.db.Bucket(bucket_name)
        file_path = folder + "/" + file
        bucket_list = []

        for file in bucket.objects.filter(Prefix=folder):
            file_name = file.key
            if file_name == file_path:
                if file_name.find(".csv") != -1:
                    bucket_list.append(file.key)
                    obj = self.db.Object(bucket_name, file.key)
                    data = obj.get()['Body'].read()
                    df = pd.read_csv(io.BytesIO(data), header=0, delimiter=",", low_memory=False)
                    return df


if __name__ == "__main__":
    s3_resources = s3_operations()
    s3_resources.read_file("cloudsquad-project-bucket", "history_tickers", "tickers_20220309")
