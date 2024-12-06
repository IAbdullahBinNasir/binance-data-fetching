from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import backtest
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)