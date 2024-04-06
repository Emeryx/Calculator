import React from "react";

interface DecimalProps { addDecimal : Function}

const Decimal : React.FC<DecimalProps> = ({addDecimal}) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        addDecimal();
    };
    return (
        <button
            id="decimal"
            className="col-span-1 bg-indigo-50 hover:bg-indigo-100 font-bold text-indigo-950 md:h-[75px] w-[75px] text-3xl"
            onClick={handleClick}
        >
            .
        </button>
    );
}

export default Decimal;
