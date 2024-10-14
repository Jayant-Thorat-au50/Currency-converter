import React, { useEffect, useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
// import UseCurrencyInfo from "./customHooks/UseCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);



  function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    useEffect(() => {
      fetch(
        `https://v6.exchangerate-api.com/v6/ec26f119e5c9e44cc91a7bde/latest/${currency}`
      )
        .then((res) => res.json())
        .then((res) => setData(res.conversion_rates));
      console.log(data);
    }, [currency]);
    console.log(data);
    return data;
  }

  const currecyInfo = useCurrencyInfo(from);

  const options = Object.keys(currecyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currecyInfo[to]);
  };

  return (
    <section className="container-fluid ">
      <section className="row main ">
        <section className="col-12 d-flex justify-content-center align-items-center ">
          <form
            className="components-wrapper   col-5 border  m-auto  p-4 px-6  d-flex flex-column justify-content-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <InputBox
              label="from"
              amount={amount}
              currencyOption={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
            <button className="swap px-2 py-1 fw-bold fs-5" onClick={swap}>
              SWAP
            </button>
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOption={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
            />

            <button className="bg-info py-1 fw-bold fs-4" type="submit">
            {`Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
            </button>
          </form>
        </section>
      </section>
    </section>
  );
}

export default App;
