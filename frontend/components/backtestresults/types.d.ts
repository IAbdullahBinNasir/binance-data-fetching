import { Dispatch, SetStateAction } from "react";

export interface BacktestResultsProps {
    result: any;
    setIsResultsVisible: Dispatch<SetStateAction<boolean>>;
  }