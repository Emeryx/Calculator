import React from "react";

interface CalcProps { calcFunc : Function }

const CalcButton : React.FC<CalcProps> = ({calcFunc}) => {

    const handleClick : React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        calcFunc();
    }

    return (
        <button onClick={handleClick} id='equals' className='col-span-2 bg-indigo-200 hover:bg-indigo-300 font-bold text-indigo-90 h-[75px] text-3xl'>=</button>
    )
}

export default CalcButton;