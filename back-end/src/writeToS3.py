import boto3
import json

def get_session():
    session = boto3.Session(
                aws_access_key_id="ASIA3HLQO46HDYOJPBAD",
                aws_secret_access_key="CzXzzpNlmtqRHCmBO3ps05kNBCw7DiUL37DgyUaO",
                aws_session_token="FwoGZXIvYXdzEFgaDGcNk0jeIsgpW25uwyLAAeC7ZhVKMOYJ8Y8CN4c7Rr1AZg7shIuzh6DFrTAkGobfKLJ+XxnEZXT1RLFlfUPQO3KlrBPHQO4zT2BGRPEf5K2SqA8igIDqDeE2RdwypZs6YFe6x06kV1pIJrRCwoHH+NPIKNzxO1GBWTFJfHQajhRljdM/zkdJ3HtrVzn8zmHBSuYVZTP+Ae0PzsKpdzzQkpJ+rqxDqjG4pPeriUCxFSE08muxpHOOidv4EGigylRsaDjh6eN2c+fyVGzqEqCHCyjtnZqRBjItzSj2NfGTXOvNvi7zWdzLoHDQtJ+cxL3XfJ48h0E4ealuhrk5Zis3csjv4uNf",
                region_name='us-east-1'
                )
    return session

def storedata(data, bucket_name, folder_name, file_name):
    #data = {"data": "123"}
    #bucket_name = 'cloudsquad-project-bucket'
    #file_name = 'data.txt'
    #folder_name = 'world/'

    session = get_session()
    s3 = session.resource('s3')
    object = s3.Object(bucket_name, folder_name+file_name)
    result = object.put(Body=data['data'], ACL='public-read')
    output = json.dumps({"s3uri": "https://" + bucket_name + ".s3.amazonaws.com/" + file_name})
    print(output)
    return output


def dfToS3(df):
    #df.to_csv(f's3://cf-templates-12owrwbi72x8i-us-east-1/test/df.csv')
    import awswrangler as wr
    import pandas as pd

    # read a local dataframe
    #df = pd.read_csv('my_local_file.gz')

    # upload to S3 bucket
    wr.s3.to_csv(df=df, path='s3://cloudsquad-project-bucket/get_market_indexes/world_indexes.csv')


if __name__ == "__main__":
    storedata()
