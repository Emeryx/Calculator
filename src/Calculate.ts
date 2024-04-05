const lex = (calc: string) => {
    const lexed: string[] = []; // A lexed array composed from Calc, Lexed seperates between operators and numbers
    let token = "";
    for (let i = 0; i < calc.length - 1; i++) {
        const char = calc[i];
        if (char >= "0" && char <= "9") {
            token += char;
        } else {
            if (token) lexed.push(token);
            token = "";
            lexed.push(char);
        }
    }
    if (calc[calc.length - 1] >= "0" && calc[calc.length - 1] <= "9") {
        // Checks the last character
        lexed.push(token + calc[calc.length - 1]);
    } else {
        lexed.push(token);
    }
    return lexed;
};

const handlePrefix = (lexed: string[]) => {
    const prefixedLexed: string[] = [];
    let firstIsMinus: boolean = false;
    let token = "";
    if (lexed[0] === "-" && parseFloat(lexed[1])) {
        prefixedLexed.push("-" + lexed[1]);
        firstIsMinus = true;
    } else if (parseFloat(lexed[0])) {
        prefixedLexed.push(lexed[0]);
    } else {
        // Do nothing if first token is an operator other than - and is not a number
    }
    for (let i = firstIsMinus ? 2 : 1; i < lexed.length - 1; i++) {
        if (
            !parseFloat(lexed[i - 1]) &&
            lexed[i] === "-" &&
            parseFloat(lexed[i + 1])
        ) {
            prefixedLexed.push("-" + lexed[i + 1]);
            i++;
        } else {
            prefixedLexed.push(lexed[i]);
        }
    }
    prefixedLexed.push(lexed[lexed.length-1]);
    return prefixedLexed;
};

const Calculate = (calc: string): string => {
    // Calc is the calc string [ Example: 14+5*6-12/4*-4-10 ]
    console.log("Inputted value: " + calc);
    // Lexing
    const lexed: string[] = lex(calc);
    console.log("Lexed Array: " + lexed);
    const prefixed: string[] = handlePrefix(lexed);
    console.log(prefixed);
    return "";
};

export default Calculate;
