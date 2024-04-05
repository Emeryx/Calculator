import React, { useEffect, useState } from "react";
import "./styles.css";

import CalcButton from "./components/CalcButton";
import Number from "./components/Number";
import MathFunc from "./components/MathFunc";
import Decimal from "./components/Decimal";
import Clear from "./components/Clear";
import Display from "./components/Display";

import Calculate from "./Calculate";

function App() {
    // Handling display and calculation input logic

    const [displayValue, SetDisplay] = useState("0"); // 25 digits is the width aesthetic limit I checked it already

    const [calcString, setCalcString] = useState("0");

    const updateDisplay = (inputtedNum: number) => {
        if (displayValue === "0" && inputtedNum === 0) return;

        if (calcString === "0") {
            setCalcString(inputtedNum.toString());
            SetDisplay(inputtedNum.toString());
            return;
        }

        if (
            displayValue === "+" ||
            displayValue === "-" ||
            displayValue === "&#xF7;" ||
            displayValue === "&#215;"
        ) {
            SetDisplay(inputtedNum.toString());
            setCalcString(calcString + inputtedNum.toString());
        }

        setCalcString(calcString + inputtedNum.toString());
        SetDisplay(displayValue + inputtedNum.toString());
    };

    const updateDisplayFunc = (
        inputtedFuncDisplay: string,
        inputtedFunc: string
    ) => {
        SetDisplay(inputtedFuncDisplay);
        setCalcString(calcString + inputtedFunc);
    };

    const clearDisplay = () => {
        setCalcString("0");
        SetDisplay("0");
    };

    // Logging each time state changes

    useEffect(() => {
        console.log("Display: " + displayValue);
        console.log("Calculation: " + calcString);
    }, [calcString, displayValue]);

    // Calculation

    const handleCalc = () => {
        SetDisplay(Calculate(calcString));
    };

    return (
        <div className="flex justify-center align-center mt-[15vh]">
            <div
                id="calculator"
                className="grid grid-cols-4 text-center gap-1 p-8 bg-white rounded-lg shadow-lg"
            >
                <Display value={displayValue} />

                <Clear clearFunc={clearDisplay} />
                <MathFunc func="subtract" update={updateDisplayFunc} />
                <MathFunc func="multiply" update={updateDisplayFunc} />

                <Number num="seven" update={updateDisplay} />
                <Number num="eight" update={updateDisplay} />
                <Number num="nine" update={updateDisplay} />
                <MathFunc func="divide" update={updateDisplayFunc} />

                <Number num="four" update={updateDisplay} />
                <Number num="five" update={updateDisplay} />
                <Number num="six" update={updateDisplay} />
                <MathFunc func="add" update={updateDisplayFunc} />

                <Number num="one" update={updateDisplay} />
                <Number num="two" update={updateDisplay} />
                <Number num="three" update={updateDisplay} />
                <Decimal />

                <Number num="zero" update={updateDisplay} />
                <CalcButton calcFunc={handleCalc} />
            </div>
        </div>
    );
}

export default App;
