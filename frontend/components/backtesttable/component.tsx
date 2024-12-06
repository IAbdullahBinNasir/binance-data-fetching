import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { BacktestsTableProps } from "./types";
import { FC } from "react";
import { BACKTEST_TABLE_COLUMNS } from "./constants";

export const BacktestsTable: FC<BacktestsTableProps> = ({ backtests, deleteBacktest }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Previous Backtests</h2>
      {backtests.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {BACKTEST_TABLE_COLUMNS.map((column, index) => (
                  <TableCell key={index}><strong>{column.label}</strong></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {backtests.map((backtest, index) => (
                <TableRow key={index}>
                  {BACKTEST_TABLE_COLUMNS.map((column) => (
                    <TableCell key={column.key}>
                      {column.key === "action" ? (
                        <Button
                          onClick={() => deleteBacktest(index)}
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          Delete
                        </Button>
                      ) : (
                        column.key === "current_close" || column.key === "current_ma" 
                          ? `$${backtest[column.key].toFixed(2)}`
                          : backtest[column.key]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No previous backtests available.</p>
      )}
    </div>
  );
};
