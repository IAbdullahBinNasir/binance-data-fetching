import { TextField, Button } from "@mui/material";
import { BacktestFormProps } from "./types";
import { TIMEFRAMES } from "./constants";
import { FC } from "react";

export const BacktestForm: FC<BacktestFormProps> = ({ symbol, setSymbol, period, setPeriod, interval, setInterval, fetchBacktestData, loading,}) => (
  <>
    <div className="mb-4">
      <TextField
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="w-full"
        label="Symbol (e.g., BTCUSDT)"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700">Select Timeframe</label>
      <select
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full"
      >
        {TIMEFRAMES.map((frame) => (
          <option key={frame} value={frame}>
            {frame}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <TextField
        value={period}
        onChange={(e) => setPeriod(Number(e.target.value))}
        className="w-full"
        label="Period (e.g., 10)"
        type="number"
      />
    </div>

    <Button
      onClick={fetchBacktestData}
      disabled={loading}
      variant="contained"
      color="primary"
      size="medium"
      className="w-full py-2"
    >
      {loading ? "Running Backtest..." : "Run Backtest"}
    </Button>
  </>
);