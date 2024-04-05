import React from "react";

interface ClearProps {
    clearFunc: Function;
}

const Clear: React.FC<ClearProps> = ({ clearFunc }) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        clearFunc();
    };

    return (
        <button
            onClick={handleClick}
            id="clear"
            className="col-span-2 bg-indigo-200 hover:bg-indigo-300 font-bold text-indigo-90 h-[75px] text-3xl"
        >
            C
        </button>
    );
};

export default Clear;
