import React, { MouseEventHandler } from "react";

interface NumberProps {
    num: string;
    update: Function;
}

interface Numbers {
    [name: string]: number;
}

const Number: React.FC<NumberProps> = ({ num, update }) => {
    const numbersArr: Numbers[] = [
        { zero: 0 },
        { one: 1 },
        { two: 2 },
        { three: 3 },
        { four: 4 },
        { five: 5 },
        { six: 6 },
        { seven: 7 },
        { eight: 8 },
        { nine: 9 },
    ];

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (numericVal!==undefined && numericVal>=0 && numericVal<=9) update(numericVal);
        return;
    };

    const numericObj: Numbers | undefined = numbersArr.find((obj) =>
        obj.hasOwnProperty(num)
    );
    const numericVal = numericObj ? numericObj[num] : undefined;
    const colSpan = num === "zero" ? "2" : "1";
    return (
        <button
            onClick={handleClick}
            id={num}
            className={
                "col-span-" +
                colSpan +
                " font-bold hover:bg-indigo-50 text-indigo-950 h-[75px] text-3xl"
            }
        >
            {numericVal}
        </button>
    );
};

export default Number;
