import requests
import pandas as pd

def fetch_data(symbol, interval, limit=1000):
    url = 'https://api.binance.com/api/v3/klines'
    params = {
        'symbol': symbol,
        'interval': interval,
        'limit': limit
    }

    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from Binance: {e}")
        return None

def parse_data(data):
    df = pd.DataFrame(data, columns=["timestamp", "open", "high", "low", "close", "volume", "close_time", "quote_asset_volume", "number_of_trades", "taker_buy_base_asset_volume", "taker_buy_quote_asset_volume", "ignore"])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    df['close'] = pd.to_numeric(df['close'])
    return df

def calculate_moving_average(df, period=10):
    df['MA'] = df['close'].rolling(window=period).mean()
    return df

def detect_crossover_and_crossunder(df):
    df['crossover'] = False
    df['crossunder'] = False
    crossover_count = 0
    crossunder_count = 0
    for i in range(1, len(df)):
        if df['close'].iloc[i] > df['MA'].iloc[i] and df['close'].iloc[i-1] <= df['MA'].iloc[i-1]:
            df.at[i, 'crossover'] = True
            crossover_count += 1
        elif df['close'].iloc[i] < df['MA'].iloc[i] and df['close'].iloc[i-1] >= df['MA'].iloc[i-1]:
            df.at[i, 'crossunder'] = True
            crossunder_count += 1
    return df, crossover_count, crossunder_count

def run_backtest(symbol, period, interval):
    klines_data = fetch_data(symbol, interval)

    if klines_data:
        df = parse_data(klines_data)
        df = calculate_moving_average(df, period)
        df, crossover_count, crossunder_count = detect_crossover_and_crossunder(df)

        if df['timestamp'].empty:
            return {"error": "Timestamp data is empty"}

        start_date = df['timestamp'].iloc[0].strftime('%Y-%m-%d')
        end_date = df['timestamp'].iloc[-1].strftime('%Y-%m-%d')

        last_bar = df.iloc[-1]

        result = {
            "backtest_id": len(df),
            "symbol": symbol,
            "backtesting_data": "Backtesting Data",
            "data_length": f"{start_date} to {end_date}",
            "current_close": last_bar['close'],
            "current_ma": last_bar['MA'],
            "total_crossovers": crossover_count,
            "total_crossunders": crossunder_count,
            "interval" : interval,
            "period": period,
        }

        return result
    else:
        return {"error": "Failed to fetch data"}
