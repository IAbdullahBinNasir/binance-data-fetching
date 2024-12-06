import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { BacktestsTableProps } from "./types";

export const BacktestsTable: React.FC<BacktestsTableProps> = ({ backtests, deleteBacktest }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Previous Backtests</h2>
      {backtests.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell><strong>Symbol</strong></TableCell>
              <TableCell><strong>Timeframe</strong></TableCell>
                <TableCell><strong>Period</strong></TableCell>
                <TableCell><strong>Data Length</strong></TableCell>
                <TableCell><strong>Last Close</strong></TableCell>
                <TableCell><strong>Current MA</strong></TableCell>
                <TableCell><strong>Total Crossovers</strong></TableCell>
                <TableCell><strong>Total Crossunders</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {backtests.map((backtest, index) => (
                <TableRow key={index}>
                  <TableCell>{backtest.symbol}</TableCell>
                  <TableCell>{backtest.interval}</TableCell>
                  <TableCell>{backtest.period}</TableCell>
                  <TableCell>{backtest.data_length}</TableCell>
                  <TableCell>${backtest.current_close.toFixed(2)}</TableCell>
                  <TableCell>{backtest.current_ma.toFixed(2)}</TableCell>
                  <TableCell>{backtest.total_crossovers}</TableCell>
                  <TableCell>{backtest.total_crossunders}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteBacktest(index)}
                      variant="contained"
                      color="secondary"
                      size="small"
                    >
                      Delete
                    </Button>
                  </TableCell>
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