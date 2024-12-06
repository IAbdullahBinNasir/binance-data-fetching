from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from . import backtest
import logging

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],  # Allow both localhost and 127.0.0.1 and all origins for dev.
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

logging.basicConfig(level=logging.INFO)

class BacktestRequest(BaseModel):
    symbol: str
    period: int
    interval: str

@app.post("/backtest")
async def backtest_data(request: BacktestRequest):
    logging.info(f"Received request: symbol={request.symbol}, period={request.period}, interval={request.interval}")

    try:
        result = backtest.run_backtest(request.symbol, request.period, request.interval)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail="Backend error: Unable to fetch or process data")

        return JSONResponse(content=result)

    except Exception as e:
        logging.error(f"Error in backtest: {e}")
        raise HTTPException(status_code=422, detail=f"Validation or processing failed: {str(e)}")
