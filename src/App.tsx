import React, { useEffect, useState } from "react";
import "./App.css";
import { NarBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Token } from "./components/types";

function App() {
  const [tokenData, setTokenData] = useState<Array<Token>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        setTokenData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch data immediately on mount
    fetchData();

    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Clean up the interval when the component unmounts or when the dependency array changes
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const filteredCoins = tokenData.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      <NarBar />
      <h1>Coin Tracker</h1>
      <input
        type="text"
        placeholder="Search Coins"
        onChange={(event) => {
          setSearchWord(event.target.value);
        }}
      />
      {filteredCoins?.map((token) => {
        return (
          <Hero
            key={token.id}
            name={token.name}
            icon={token.image}
            price={token.current_price}
            symbol={token.symbol}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
