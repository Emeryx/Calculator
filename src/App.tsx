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

    const [calcString, setCalcString] = useState("");

    const [isContinuingPrevCalc,continuingPrevCalcUpdate] = useState(false);

    const updateDisplay = (inputtedNum: number) => {

        if (inputtedNum === 0 && (displayValue === "0" || calcString === ""))
            return; // If the inputted number is zero and the display value is zero or it's the start of the calculation nothing will happen

        if (calcString === "" || isContinuingPrevCalc) {
            // At the start of calculation replace the zero
            setCalcString(inputtedNum.toString());
            SetDisplay(inputtedNum.toString());
            continuingPrevCalcUpdate(false);
            return;
        }

        if (displayValue === "&#xF7;" && inputtedNum === 0) return; // Do nothing if the input of 0 follows a division

        if (
            // Logic handling for when a number is inputted but the last input is an operator
            displayValue === "+" ||
            displayValue === "-" ||
            displayValue === "&#xF7;" ||
            displayValue === "&#215;"
        ) {
            SetDisplay(inputtedNum.toString());
            setCalcString(calcString + inputtedNum.toString());
        } else {
            // Else if last digit is a number
            setCalcString(calcString + inputtedNum.toString());
            SetDisplay(displayValue + inputtedNum.toString());
        }
    };

    const updateDisplayFunc = (
        inputtedFuncDisplay: string,
        inputtedFunc: string
    ) => {
        if(isContinuingPrevCalc) continuingPrevCalcUpdate(false);
        if (!calcString.endsWith(".")) {
            SetDisplay(inputtedFuncDisplay);
            setCalcString(calcString + inputtedFunc);
        } else {
            // Do nothing if last character in calc string is a decimal point to not allow an operator right after a decimal point
        }
    };

    const clearDisplay = () => {
        setCalcString("");
        SetDisplay("0");
        console.log("CALC STRING RESET: " + calcString);
    };

    // Adding decimals

    const addDecimal = () => {
        if (displayValue.includes("."))
            return; // If the display value already has a decimal point it will not do anything
        else if (
            // If in a digit sequence it will add up to the calc string
            parseFloat(calcString[calcString.length - 1]) ||
            calcString[calcString.length - 1] === "0"
        ) {
            setCalcString(calcString + ".");
            SetDisplay(displayValue + ".");
        } else {
            // Do nothing if last character in calc string is an operator or a decimal point
        }
    };

    // Logging each time state changes
    useEffect(() => {
        console.log("CALC STRING: " + calcString);
    }, [calcString]);
    /*
    useEffect(() => {
        console.log("DISPLAY " + displayValue);
    }, [displayValue]);*/

    // Calculation

    const handleCalc = () => {
        if (
            calcString[calcString.length - 1] <= "9" &&
            calcString[calcString.length - 1] >= "0"
        ) {
            // If the last digit in the calculation is a digit it will set the display to the calculation and the calculation string to the result accordingly
            const result = Calculate(calcString);
            SetDisplay(result);
            setCalcString(result);
            continuingPrevCalcUpdate(true);
        } else {
            // Do nothing
        }
    };

    // TODO: Look at Calculate.ts
    // TODO: Make writing zero possible xD - DONE
    // TODO: Add decimal button functionality, Calculate.ts had been adjusted accordingly - DONE

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
                <Decimal addDecimal={addDecimal} />

                <Number num="zero" update={updateDisplay} />
                <CalcButton calcFunc={handleCalc} />
            </div>
        </div>
    );
}

export default App;
