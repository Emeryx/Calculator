
const Calculate = (calc : string) : string => { // Calc is the calc string [ Example: 3 + 5 x 6 - 2 / 4 ]

    if(calc.includes('/') || calc.includes('*')){
        return calc
    }

    console.log("Calculating "+calc);
    const regex = /(-?\d+\.?\d*)\s*([*/])\s*(-?\d+\.?\d*)/g;

    calc = calc.replace(regex, (match, n1, o, n2) => {
        n1 = parseFloat(n1);
        n2 = parseFloat(n2)
        switch(o){
            case '*':
                return (n1*n2).toString();
            case '/':
                return (n1/n2).toString();
            default:
                return match;
        }
    })

    return eval(calc);
}

export default Calculate