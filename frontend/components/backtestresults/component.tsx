import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { BacktestResultsProps } from "./types";

export const BacktestResults: React.FC<BacktestResultsProps> = ({ result, setIsResultsVisible }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setIsResultsVisible(false);
  };

  useEffect(() => {
    setIsVisible(true);
  }, [result]);

  return (
    <div className="mt-6 relative">
      <IconButton
        onClick={handleClose}
        size="small"
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <CloseIcon />
      </IconButton>

      {isVisible && (
        <div>
          <h2 className="text-xl font-bold mb-4">Backtest Results</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <strong>Symbol:</strong> {result.symbol}
              </div>
              <div className="flex flex-col">
                <strong>Data Length:</strong> {result.data_length}
              </div>
              <div className="flex flex-col">
                <strong>Current Close:</strong> ${result.current_close.toFixed(2)}
              </div>
              <div className="flex flex-col">
                <strong>Current MA:</strong> {result.current_ma.toFixed(2)}
              </div>
              <div className="flex flex-col">
                <strong>Total Crossovers:</strong> {result.total_crossovers}
              </div>
              <div className="flex flex-col">
                <strong>Total Crossunders:</strong> {result.total_crossunders}
              </div>
              <div className="flex flex-col">
                <strong>Timeframe:</strong> {result.interval}
              </div>
              <div className="flex flex-col">
                <strong>MA Period:</strong> {result.period}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};