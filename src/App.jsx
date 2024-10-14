import React, { useEffect, useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import UseCurrencyInfo from "./customHooks/UseCurrencyInfo";
import useCurrencyInfo from "./customHooks/UseCurrencyInfo";

function App() {
  // getting all the state variables
  const [amountState, setAmountState] = useState({
    amount: 0,
    from: "USD",
    to: "INR",
    convertedAmount: 0,
  });
  
 let FromOptions=[]

 let ToOptions = []

  const FromCurr = UseCurrencyInfo(amountState.from);
  const ToCurr = UseCurrencyInfo(amountState.to);


  

      FromOptions = Object.keys(FromCurr)
      ToOptions = Object.keys(ToCurr)


  // setAmountState((state)=>({
  //   ...state,
  //   curencyOptionsFrom:FromOptions,
  //   curencyOptionsTo:ToOptions
  // }))



  // const swap = () => {
  //   setFrom(to);
  //   setTo(from);
  //   setConvertedAmount(amount);
  //   setAmount(convertedAmount);
  // };

  const convert = () => {
   
    
    
    setAmountState((state) => ({
      ...state,
      convertedAmount: amountState.amount * FromCurr[amountState.to],
    }));

    // setConvertedAmount(amount * currecyInfo[to]);
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
