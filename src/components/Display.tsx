import React from "react";

interface DisplayProps { value: string}

const Display : React.FC<DisplayProps> = ( {value} ) => {

    return(
        <div id='display' className='col-span-4 font-bold text-indigo-950 h-[100px] text-2xl flex items-center justify-end mx-4' dangerouslySetInnerHTML= { value ? { __html : value } : undefined }>
        </div>
    )
}

export default Display;