import React from "react";

interface NumberProps { num : string }

interface Numbers { [ name : string ] : number }

const Number : React.FC<NumberProps> = ({ num }) => {

    const numbersArr : Numbers[] = [
        { 'zero': 0 },
        { 'one': 1 },
        { 'two': 2 },
        { 'three': 3 },
        { 'four': 4 },
        { 'five': 5 },
        { 'six': 6 },
        { 'seven': 7 },
        { 'eight': 8 },
        { 'nine': 9 }
    ];

    const numericObj: Numbers | undefined = numbersArr.find( (obj) => obj.hasOwnProperty(num) );
    console.log(numericObj)
    const numericVal = numericObj ? numericObj[num] : undefined;
    const colSpan = num === 'zero' ? '2' : '1'
    return (
        <button id={num} className={'col-span-'+colSpan+' font-bold text-indigo-950 h-[75px] text-3xl'}>{numericVal}</button>
    )
}

export default Number;