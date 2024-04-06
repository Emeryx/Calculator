const lex = (calc: string) => {
    // To lex the calc
    const lexed: string[] = []; // A lexed array composed from Calc, Lexed seperates between operators and numbers
    let tokenNum = "";
    let tokenOp = "";
    for (let i = 0; i < calc.length; i++) {
        // Iterates over calculation string, Returns new array composed of digit and operator array like ['123','/','--',4567'] (Tokens) and allows for easier prefixing afterwards - Distinguishing with prefix and infix minuses by using -- on prefixes
        const char = calc[i];
        if ((char >= "0" && char <= "9") || char === ".") {
            // Check if a char sequence begins
            if (tokenOp.endsWith("-") && tokenOp.length > 1) {
                // Check if token operator sequence ends with - and the length is bigger than 1 and does a -- prefix to prepare in advance for the next stages of the parser
                lexed.push(tokenOp[tokenOp.length - 2]);
                lexed.push("--");
            } else {
                if (tokenOp) lexed.push(tokenOp[tokenOp.length - 1]); // If a token sequence exists not ending with - it will push the last operator to the lexed array as a token
            }
            tokenOp = "";
            tokenNum += char;
        } else {
            // If a char sequence ends and an operator sequence begins instead
            if (tokenNum) lexed.push(tokenNum);
            tokenNum = "";
            tokenOp += char;
        }
    }
    if (tokenNum) lexed.push(tokenNum);
    return lexed;
};

const handlePrefix = (lexed: string[]) => {
    // Receives a lexer with -- tokens which the digits followed in the next tokens should all be minuses. This function basically handles the minus prefix
    const prefixedLexed: string[] = [];
    let skipNext: boolean = false;
    for (let i = 0; i < lexed.length - 1; i++) {
        // Iterates over lexed array
        if (skipNext) {
            skipNext = false;
            continue;
        }
        if (lexed[i] === "--") {
            prefixedLexed.push("-" + lexed[i + 1]);
            skipNext = true;
        } else {
            prefixedLexed.push(lexed[i]);
        }
    }
    if (!skipNext) prefixedLexed.push(lexed[lexed.length - 1]);
    return prefixedLexed;
};

// TODO: Function that handles multipication & division
// TODO: Handle additional addition & subtraction

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
