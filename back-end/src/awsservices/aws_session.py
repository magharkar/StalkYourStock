import boto3


class aws_session():
    def __init__(self):
        self.session = {
            "nikita-aws-lab": {
                "AWS_ACCESS_KEY_ID": "ASIA3HLQO46HJLWT6IUY",
                "AWS_SECRET_ACCESS_KEY": "r1KBQ+OC5iUKalQEDgmXf4XkFTgS15NwlSnrhyuR",
                "AWS_SESSION_TOKEN": "FwoGZXIvYXdzEN7//////////wEaDK8B55YVrgpG19cYXSLAATdZnm/OUj5MVYQgpmT9yy6BuPK0noMd19VTYb6vRL/yyiu8YtMiNyfAMwgg1Z92BOCeHXhCjq16PDpxuzY0nsvCqccJ6ONZs6ii03UVmFPlWFB3BcsK3G5JcWv86+gVcurpJx9sJ1J1PyCIQhxILYD5JYiuO8JUu7TORQeh+WkZGseAuxA2lf8KzRnoIDivoXqn5VH8JRCYPb8j9hBHidr32TqtIUErhTQQEQTYpinTJvcOGA0Nf4j8hWCD7IVq+SjM4u+RBjIth9epAixh8ZxrR9EOdf3SRRRHnQVPwGI4DKnrY2lXt1InO6E2o8F+6JOaCBvP"
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
