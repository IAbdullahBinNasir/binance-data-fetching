from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access environment variables using os.getenv()
binance_free_api = os.getenv('BINANCE_FREE_API')
