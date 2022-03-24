import os
import sys

from flask import Flask

from compare_tickers import get_ticker_comparison
from get_day_wise_data import day_wise_data

sys.path.append((os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) + '\\awsservices\\'))

app = Flask(__name__)
app.register_blueprint(get_ticker_comparison)
app.register_blueprint(day_wise_data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
