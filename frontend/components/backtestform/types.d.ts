export interface BacktestFormProps {
    symbol: string;
    setSymbol: React.Dispatch<React.SetStateAction<string>>;
    period: number;
    setPeriod: React.Dispatch<React.SetStateAction<number>>;
    interval: string;
    setInterval: React.Dispatch<React.SetStateAction<string>>;
    fetchBacktestData: () => void;
    loading: boolean;
  }
  