import readFromS3 as rd
import pandas as pd

def best_buy_calc(bucketname, prefix):
    read_df = rd.read_prefix_to_df(bucketname, prefix)
    return read_df


def data_cleaning(inp_metrics_df):
    inp_metrics_df['Date'] = pd.to_datetime(inp_metrics_df['Date'], format='%Y-%m-%d %H:%M:%S.%f')
    inp_metrics_df.sort_values(by=['ticker', 'Date'], inplace=True, ascending=False)
    inp_metrics_df['prev_close'] = inp_metrics_df['Close'].shift(-1)
    inp_metrics_df['prev_close'] = inp_metrics_df['prev_close'].fillna(0)

    # Percentage change = ((Today close - Yesterday Close) / Yesterday Close)x100
    inp_metrics_df['percentage_change'] = ((inp_metrics_df['Close'] - inp_metrics_df['prev_close']) / inp_metrics_df[
        'prev_close']) * 100
    print(inp_metrics_df[['ticker', 'Close', 'prev_close', 'Date', 'percentage_change']])

    return inp_metrics_df


if __name__ == "__main__":
    bucketname = "cloudsquad-project-bucket"
    file_path = "history_tickers"
    df = best_buy_calc(bucketname, file_path)
    print(df)
    rdf = data_cleaning(df)
    print(rdf)
    rdf.to_csv("rdf.csv")