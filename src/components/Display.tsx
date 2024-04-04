import React, {useState} from "react";

function Display () {

    const [value, SetValue] = useState('0'); // 25 digits is the limit I checked it already

    return(
        <div id='display' className='col-span-4 font-bold text-indigo-950 h-[100px] text-2xl flex items-center justify-end mx-4' >
            {value}
        </div>
    )
}

export default Display;