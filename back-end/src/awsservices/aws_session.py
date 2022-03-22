import boto3


class aws_session():
    def __init__(self):
        self.session = {
            "nikita-aws-lab": {
                "AWS_ACCESS_KEY_ID": "ASIA3HLQO46HEY6RHQF7",
                "AWS_SECRET_ACCESS_KEY": "FvOCkC0hkk6m0lEVcp223qy24uHOQN3HQORkbTlq",
                "AWS_SESSION_TOKEN": "FwoGZXIvYXdzEKv//////////wEaDJ7IuKdaKphHC2y9rSLAAVJEHN2hi3zc72sEYoKQEzHNHMiesCw4Fo9cD3nSUqbgk81RXIpQMTZu16TgPSdwQCCpuMMHWbB5v2x1hMLVdjN+WUP6r4zD66jroqqvIhF6ENqrWuVrvp8/1lgy3h+/mNLG/6zltvOVB3Jen7qGjp+AOsqT8K00wX6afuxgzyBWEJVULrgM3nFuJGa2cmSfes1xxkXhb50Y2yXl/kdZ5dtgyykrQLjfunqwJ50LVgB1tW6nSvkNG4Jk8Fo0twg5vCjs2+SRBjItLOYazra7UDoP/lMIiUrY+ltphIvUTouCj3UDEbr2NVzV/TiLonaJPr6y4rr8"
            },
            "ruchi-aws-lab": {
                "AWS_ACCESS_KEY_ID": "ASIA3HLQO46HMTXZWHKL",
                "AWS_SECRET_ACCESS_KEY": "xPCCqY3EQIpoL0cauAyYeOu84iAhAgXGPOWSQ8Jg",
                "AWS_SESSION_TOKEN": "FwoGZXIvYXdzEHUaDJA6BRtqmbId2PooZiLAAepxitXavpCpkuz6IxjvU0gb4O/5ZVUyHwFlICHRWHhzueKDYfeLSfDWS3fhjdNqeqRAgb2d7ZA/l78WMgKnDPRuUmmPID2U0iwFs1sio05yNaraBthHUEP9BRd2qTCBXJCaGu51gfEO5/nOsNpSJ0c1OuJCUwe6fG6ncHgcqWEvfGhLIuLHuWOcPQS4soLglNPAH89V9oNnE6U23YmH6B95zF6Oitm8iAkYn57eifLdCmLSSXh+jGR+BclcpLEEASi/6diRBjIt4xXmWY3PeXlcOvoa0fy8hhNqhLLrTcaD6LUnF/sz+hdHbMTuLxGko5yzqTJ7"
            },
            "mugdha-aws-lab": {
                "AWS_ACCESS_KEY_ID": "ASIA3HLQO46HMTXZWHKL",
                "AWS_SECRET_ACCESS_KEY": "xPCCqY3EQIpoL0cauAyYeOu84iAhAgXGPOWSQ8Jg",
                "AWS_SESSION_TOKEN": "FwoGZXIvYXdzEHUaDJA6BRtqmbId2PooZiLAAepxitXavpCpkuz6IxjvU0gb4O/5ZVUyHwFlICHRWHhzueKDYfeLSfDWS3fhjdNqeqRAgb2d7ZA/l78WMgKnDPRuUmmPID2U0iwFs1sio05yNaraBthHUEP9BRd2qTCBXJCaGu51gfEO5/nOsNpSJ0c1OuJCUwe6fG6ncHgcqWEvfGhLIuLHuWOcPQS4soLglNPAH89V9oNnE6U23YmH6B95zF6Oitm8iAkYn57eifLdCmLSSXh+jGR+BclcpLEEASi/6diRBjIt4xXmWY3PeXlcOvoa0fy8hhNqhLLrTcaD6LUnF/sz+hdHbMTuLxGko5yzqTJ7"
            }
        }

    def createAWSSession(self, aws_lab):
        aws_session = boto3.Session(
            aws_access_key_id=self.session[aws_lab]["AWS_ACCESS_KEY_ID"],
            aws_secret_access_key=self.session[aws_lab]["AWS_SECRET_ACCESS_KEY"],
            aws_session_token=self.session[aws_lab]["AWS_SESSION_TOKEN"]
        )
        return aws_session


if __name__ == "__main__":
    obj = aws_session()
    print(obj.createAWSSession("nikita-aws-lab"))
