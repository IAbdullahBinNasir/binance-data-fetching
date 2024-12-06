'use client'
import { useState, useEffect } from "react";
import { BacktestForm } from "@/components/backtestform";
import { BacktestResults } from "@/components/backtestresults";
import { BacktestsTable } from "@/components/backtesttable";

const BacktestPage = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [period, setPeriod] = useState(10);
  const [interval, setInterval] = useState("1h");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [backtests, setBacktests] = useState<any[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  // Fetch backtest data
  const fetchBacktestData = async () => {
    setIsResultsVisible(true);
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/backtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, period, interval }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setBacktests((prevBacktests) => {
          const updatedBacktests = [...prevBacktests, { ...data, interval, period }];
          localStorage.setItem("backtests", JSON.stringify(updatedBacktests));
          return updatedBacktests;
        });
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedBacktests = localStorage.getItem("backtests");
    if (storedBacktests) setBacktests(JSON.parse(storedBacktests));
  }, []);

  const deleteBacktest = (index: number) => {
    const newBacktests = backtests.filter((_, i) => i !== index);
    setBacktests(newBacktests);
    localStorage.setItem("backtests", JSON.stringify(newBacktests));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Moving Average Backtester</h1>
        <BacktestForm
          symbol={symbol}
          setSymbol={setSymbol}
          period={period}
          setPeriod={setPeriod}
          interval={interval}
          setInterval={setInterval}
          fetchBacktestData={fetchBacktestData}
          loading={loading}
        />
        {isResultsVisible && result && <BacktestResults result={result} setIsResultsVisible={setIsResultsVisible} />}
        <BacktestsTable backtests={backtests} deleteBacktest={deleteBacktest} />
      </div>
    </div>
  );
};

export default BacktestPage;