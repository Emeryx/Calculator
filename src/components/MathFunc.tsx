import React from "react";

interface FuncProps { func : string }

interface Functions { [ name : string ] : string }

const Func : React.FC<FuncProps> = ({ func }) => {

    const funcArr : Functions[] = [
        { 'add': '+' },
        { 'subtract': '-' },
        { 'multiply': '&#215;' },
        { 'divide': '&#xF7;' },
    ];

    const funcObj: Functions | undefined = funcArr.find( (obj) => obj.hasOwnProperty(func) );
    console.log(funcObj)
    const funcDisplay = funcObj ? funcObj[func] : undefined;
    return (
        <button id={func} className={'col-span-1 bg-indigo-50 font-bold text-indigo-950 h-[75px] w-[75px] text-4xl'} dangerouslySetInnerHTML= { funcDisplay ? { __html : funcDisplay } : undefined } />
    )
}

export default Func