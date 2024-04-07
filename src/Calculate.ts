const lex = (calc: string) => {
    // To lex the calc
    const lexed: string[] = []; // A lexed array composed from Calc, Lexed seperates between operators and numbers
    let tokenNum = "";
    let tokenOp = "";
    for (let i = 0; i < calc.length; i++) {
        
        // Iterates over calculation string, Returns new array composed of digit and operator array like ['123','/','--',4567'] (Tokens) and allows for easier prefixing afterwards - Distinguishing with prefix and infix minuses by using -- on prefixes
        const char = calc[i]; // Current character in iteration over original string
        if(char==='-' && i===0){ // Handling if calc string started with -
            lexed.push('--');
            continue;
        }
        if ((char >= "0" && char <= "9") || char === ".") {
            // Check if a char sequence begins
            if (tokenOp.endsWith("-") && tokenOp.length > 1) {
                // Check if token operator sequence ends with - and the length is bigger than 1 and does a -- prefix to prepare in advance for the next stages of the parser
                lexed.push(tokenOp[tokenOp.length - 2]); // Pushes a single operator right before the -
                lexed.push("--"); // Pushes the negation identifier for the future minus prefix handling
            } else {
                if (tokenOp) lexed.push(tokenOp[tokenOp.length - 1]); // If a token sequence exists not ending with - it will push the last operator to the lexed array as a token
            }
            tokenOp = ""; // Reset token operator sequence because a new digit sequence began
            tokenNum += char; // Add up to the new / existing digit sequence
        } else {
            // If a char sequence ends and an operator sequence begins instead
            if (tokenNum) lexed.push(tokenNum); // If a number token existed it's pushed into the initial lexed array. As of writing this, The if check is necessary because the user can currently input operators before any numbers
            tokenNum = ""; // Resets digit sequence
            tokenOp += char; // Add up to the new / existing operator sequence
        }
    }
    if (tokenNum) lexed.push(tokenNum); // Handle last potential number sequence, Function sequences are ignored
    return lexed;
};

const handlePrefix = (lexed: string[]) => {
    // Receives a lexer with -- tokens which the digits followed in the next tokens should all be minuses. This function basically handles the minus prefix
    const prefixedLexed: string[] = [];
    let skipNext: boolean = false;
    for (let i = 0; i < lexed.length - 1; i++) {
        // Iterates over lexed array
        if (skipNext) {
            // If skipNext is true it will reset to false and skip the entire current iteration
            skipNext = false;
            continue;
        }
        if (lexed[i] === "--") {
            // If the lexed array token is --
            prefixedLexed.push("-" + lexed[i + 1]); // A negative value of the following digit sequence is pushed into the new minus prefix handled array
            skipNext = true; // SkipNext is set to true so it will not have to check the digit sequence already added in the next sequence
        } else {
            prefixedLexed.push(lexed[i]); // Otherwise, If there is no minus prefix identification to handle it will simply push the existing number / digit sequence
        }
    }
    if (!skipNext) prefixedLexed.push(lexed[lexed.length - 1]); // Having not iterated over the last lexed array sequence - If it hadn't been prefix handled it will be pushed. Operators were already ignored on the lexer function
    return prefixedLexed;
};

// TODO: Function that handles multipication & division
// TODO: Handle additional addition & subtraction

const handleMultipicationDivision = (prefixed: string[]): string[] => {
    const formulaLogic: string[] = []; // Array for final formula logic result prioritizng */ operators
    let l: number = 0; // Left
    let op: string = ""; // Infix operator
    let r: number = 0; // Right
    l = parseFloat(prefixed[0]);
    for (let i = 1; i < prefixed.length - 1; i += 2) { // [1,+,2,*,3,-,4]
        // Trio
        op = prefixed[i];
        r = parseFloat(prefixed[i+1]);
        if (op === "*") {
            l = l * r;
        } else if (op === "/") {
            l = l / r;
        }
        else{
            formulaLogic.push(l.toString());
            formulaLogic.push(op);
            l = r;
        }
    }
    formulaLogic.push(l.toString());
    return formulaLogic;
};

const handleAdditionSubtraction = (formulaLogic: string[]) => {
    if (formulaLogic.length === 1) {
        return formulaLogic[0];
    }
    let finalResult = 0;
    for (let i = 1; i < formulaLogic.length; i += 2) {
        const n1 = parseFloat(formulaLogic[i - 1]);
        const n2 = parseFloat(formulaLogic[i + 1]);
        if (!finalResult) {
            if (formulaLogic[i] === "+") {
                finalResult = n1 + n2;
            } else {
                // Must be -
                finalResult = n1 - n2;
            }
        } else {
            // If continues final result
            if (formulaLogic[i] === "+") {
                finalResult += n2;
            } else {
                // Must be -
                finalResult -= n2;
            }
        }
    }
    return finalResult.toString();
};

const Calculate = (calc: string): string => {
    console.log("*---------CALCULATION INBOUND!---------*"); // '123/-456+7*8/9-10'
    // Lexing
    const lexed: string[] = lex(calc); // ['123','/','--','456','+','7','*','8','/','9','-','10']
    console.log("Lexed Array: " + lexed);
    const prefixed: string[] = handlePrefix(lexed); // ['123','/','-456','+','7','*','8','/','9','-','10']
    console.log("Prefixed: " + prefixed);
    const formulaLogic: string[] = handleMultipicationDivision(prefixed); // ['-0.26...','+','6.22...','-'10]
    console.log("After formula logic: " + formulaLogic);
    const result: string = handleAdditionSubtraction(formulaLogic); // 0.26 + 6.22 - 10 = -3.52...
    console.log(result);
    return result;
};

export default Calculate;
