import { Dispatch, SetStateAction } from "react";

export interface BacktestFormProps {
    symbol: string;
    setSymbol: Dispatch<SetStateAction<string>>;
    period: number;
    setPeriod: Dispatch<SetStateAction<number>>;
    interval: string;
    setInterval: Dispatch<SetStateAction<string>>;
    fetchBacktestData: () => void;
    loading: boolean;
  }
  