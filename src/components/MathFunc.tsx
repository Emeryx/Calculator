import React from "react";

interface FuncProps { func : string , update : Function }

interface Functions { [ name : string ] : string }

const Func : React.FC<FuncProps> = ({ func , update }) => {

    const handleClick : React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if(funcDisplay && funcObj){
            const funcString = funcDisplay === '&#215;' ? '*' : funcDisplay === '&#xF7;' ? '/' : funcDisplay
            update(funcDisplay, funcString)
        }
    }

    const funcArr : Functions[] = [
        { 'add': '+' },
        { 'subtract': '-' },
        { 'multiply': '&#215;' },
        { 'divide': '&#xF7;' },
    ];

    const funcObj: Functions | undefined = funcArr.find( (obj) => obj.hasOwnProperty(func) );
    const funcDisplay = funcObj ? funcObj[func] : undefined;
    return (
        <button onClick={handleClick} id={func} className={'col-span-1 bg-indigo-50 hover:bg-indigo-100 font-bold text-indigo-950 h-[75px] w-[75px] text-4xl'} dangerouslySetInnerHTML= { funcDisplay ? { __html : funcDisplay } : undefined } />
    )
}

export default Func