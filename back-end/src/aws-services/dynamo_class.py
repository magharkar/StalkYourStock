import boto3
import aws_session as session
import json
from boto3.dynamodb.conditions import Key


class table():

    def __init__(self):
        awsSessionObj = session.aws_session()
        self.connectSession = awsSessionObj.createAWSSession("nikita-aws-lab")
        self.db = self.connectSession.resource('dynamodb')
        print("Initialized")

    def createTable(self, tableName, KeySchema, AttributeDefinitions, ProvisionedThroughput):
        self.tableName = tableName
        table = self.db.create_table(
            TableName=tableName,
            KeySchema=KeySchema,
            AttributeDefinitions=AttributeDefinitions,
            ProvisionedThroughput=ProvisionedThroughput
        )
        self.table = table
        print(f'Created Table {self.table}')

    def insert_data(self, tableName, input_json):
        table = self.db.Table(tableName)
        for item in input_json:
            try:
                table.put_item(Item=item)
            except:
                pass
        print(f'Inserted Data into {tableName}')

    def getItem(self, tableName, key):
        try:
            table = self.db.Table(tableName)
            response = table.get_item(Key=key)
            return response
        except Exception as e:
            print('Item not found')
            return None

    def read_dynamo(self, tableName):
        table = self.db.Table(tableName)
        response_json = table.scan()
        return response_json


if __name__ == '__main__':
    movies = table()
    tableName = "Movie"
    """
    primaryKey = [
        {
            'AttributeName': 'year',
            'KeyType': 'HASH'  # Partition key
        },
        {
            'AttributeName': 'title',
            'KeyType': 'RANGE'  # Sort key
        }
    ]
    AttributeDataType = [
        {
            'AttributeName': 'year',
            'AttributeType': 'N'  # All Number Type
        },
        {
            'AttributeName': 'title',
            'AttributeType': 'S'  # String
        },
    ]
    ProvisionedThroughput = {
        'ReadCapacityUnits': 10,
        'WriteCapacityUnits': 10
    }
    movies.createTable(
            tableName=tableName,
            KeySchema=primaryKey,
            AttributeDefinitions=AttributeDataType,
            ProvisionedThroughput=ProvisionedThroughput)
    """
    jsondata = [{
      'year'  :  2020,
      'title' :  'A Title',
      'info'  : {
          'key1' : 'value1',
          'key2' : 'value2',
      }
    }]

    movies.insert_data(tableName=tableName, input_json=jsondata)
    print(movies.getItem(tableName=tableName, key={"year": 2021, "title":"Some Title"}))
    print(movies.read_dynamo(tableName))