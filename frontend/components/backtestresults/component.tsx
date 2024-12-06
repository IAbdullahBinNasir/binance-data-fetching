import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, FC } from "react";
import { BacktestResultsProps } from "./types";
import { BACKTEST_RESULTS_COLUMNS } from "./constants";

export const BacktestResults: FC<BacktestResultsProps> = ({ result, setIsResultsVisible }) => {
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
              {BACKTEST_RESULTS_COLUMNS.map((column, index) => (
                <div key={index} className="flex flex-col">
                  <strong>{column.label}:</strong> 
                  {column.key === "current_close" || column.key === "current_ma" 
                    ? `$${result[column.key].toFixed(2)}`
                    : result[column.key]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};