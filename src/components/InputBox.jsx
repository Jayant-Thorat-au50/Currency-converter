import React from "react";
import "./input.css";

function InputBox({
  label,
  amount,
  onCurrencyChange,
  onAmountChange,
  currencyOption = [],
  selectCurrency,
  amountDisabled = false,
  currencyDisabled = false,
}) {
  return (
    <section className=" inputBox  px-3 py-2 d-flex flex-column gap-3 pb-3">
      <div className="d-flex justify-content-between align-items-center  fs-4">
        <label htmlFor="">{label}</label>

        <label htmlFor="">Currency Type</label>
      </div>

      <div className="d-flex justify-content-between">
        <input
          className="text-center"
          type="number"
          disabled={amountDisabled}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
        <select
          name=""
          id=""
          select={selectCurrency}
          disabled={currencyDisabled}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {currencyOption.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default InputBox;
