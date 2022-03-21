import boto3


class aws_session():
    def __init__(self):
        self.session = {
            "nikita-aws-lab": {
                "AWS_ACCESS_KEY_ID": "ASIA3HLQO46HBGZSWPO7",
                "AWS_SECRET_ACCESS_KEY": "iJwGU9nNuEo/LmMRKUGP4jUkjWqGZDpvMC7EzDHc",
                "AWS_SESSION_TOKEN": "FwoGZXIvYXdzEHcaDG9uLHnOl32mfdblmiLAAc5UQXQDLmF2i7yklskEWXTXpx9Cm29C7a1WKi1EUriM8WTXirqjGKhc4lQ5ku2ebGlKwNjKX2pxxn6N5LA2VQd5F8XF2Adb77qovSmhcVuJM1N+mBeUC4Hw7tfvGLwOrZ/6wkTDtlYCW/3QHuvkraJ1D+FPhbGD7D/eS3WAOdYG5+mySWEq8nz6OQYil3BMJDzGOhJeG/8HFuPIz+NUV5ffUclkOYScGCTHAw/P8TY4CDrmHd+RKbenZvbzgWoEBCjXm9mRBjItE7gT1eZWb6FxOPKzSUAUUS0p0xOlyqA3P1UNNRrK4CIFL/zzi0Ho5/Xzj/Gl"
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
