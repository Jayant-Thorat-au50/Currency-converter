import React, { useEffect, useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import UseCurrencyInfo from "./customHooks/UseCurrencyInfo";

function App() {
  // getting all the state variables
  const [amountState, setAmountState] = useState({
    amount: 0,
    from: "USD",
    to: "INR",
    convertedAmount: 0,
  });

  // getting the for currency relation with input currency
  // for both the currencies
  const FromCurr = UseCurrencyInfo(amountState.from);
  const ToCurr = UseCurrencyInfo(amountState.to);

  //extracting their keys in a array
  const FromOptions = Object.keys(FromCurr);
  const ToOptions = Object.keys(ToCurr);

  // const swap = () => {
  //   setFrom(to);
  //   setTo(from);
  //   setConvertedAmount(amount);
  //   setAmount(convertedAmount);
  // };

  // convert function that converts from "From" to "To"
  const convert = () => {
    setAmountState((state) => ({
      ...state,
      convertedAmount: amountState.amount * FromCurr[amountState.to],
    }));
  };

  return (
    <section className="container-fluid ">
      <section className="row main ">
        <section className="col-12 d-flex justify-content-center align-items-center ">
          {/* main form of the page */}
          <form
            className="components-wrapper   col-5 border  m-auto  p-4 px-6  d-flex flex-column justify-content-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            {/*input to enter the amount to convert  */}
            <InputBox
              label="from"
              selectCurrency={amountState.selectedCurrencyFrom}
              amount={amountState.amount} 
              currencyOption={FromOptions}
              onCurrencyChange={(currency) =>
                setAmountState((state) => ({
                  ...state,
                  from: currency,
                }))
              }
              onAmountChange={(amount) =>
                setAmountState((state) => ({
                  ...state,
                  amount: amount,
                }))
              }
            />
            {/* swap button to exchange the values of two inputs */}
            <button
              className="swap px-2 py-1 fw-bold fs-5"
              onClick={() => swap()}
            >
              SWAP
            </button>
            {/*input to show the converted amount  */}

            <InputBox
              label="To"
              amount={amountState.convertedAmount}
              selectCurrency={amountState.to}
              currencyOption={ToOptions}
              onCurrencyChange={(currency, e) => {
                console.log(e.target.value);

                setAmountState((state) => ({
                  ...state,
                  to: currency,
                }));
              }}
            />
            {/* button to submit the form that call the convert function */}
            <button className="bg-info py-1 fw-bold fs-4" type="submit">
              {`Convert ${amountState.from} to ${amountState.to}`}
            </button>
          </form>
        </section>
      </section>
    </section>
  );
}

export default App;
