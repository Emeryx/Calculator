const lex = (calc: string) => {
    // To lex the calc
    const lexed: string[] = []; // A lexed array composed from Calc, Lexed seperates between operators and numbers
    let tokenNum = "";
    let tokenOp = "";
    for (let i = 0; i < calc.length; i++) {
        // Iterates over calculation string, Returns new array composed of digit and operator array like ['123','/','--',4567'] (Tokens) and allows for easier prefixing afterwards - Distinguishing with prefix and infix minuses by using -- on prefixes
        const char = calc[i]; // Current character in iteration over original string
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

const handleFormulaLogic = (prefixed: string[]): string[] => {
    const formulaLogic: string[] = []; // Array for final formula logic result prioritizng */ operators
    let calcSequence: string[] = []; // Array for storing current calculation sequence (One or more */ operators involved)
    let sequenceResult = 0; // Sequence result calculation for each calculation sequence
    for (let i = 1; i < prefixed.length; i += 2) {
        // Iterating over prefixed array beginning from what must be the infix operator index (1)
        if (prefixed[i] === "*" || prefixed[i] === "/") {
            // If the current infix op is * or / it will push the operator's first number calculation and the operator itself
            calcSequence.push(prefixed[i - 1]); // Push the first num
            calcSequence.push(prefixed[i]); // Push operator
        } else {
            // If current operator is not */ The calculation sequence breaks
            if (calcSequence.length >= 1) {
                // Handling the push and calculation of a calculation sequence with the higher priority (*/ operators) if exists
                calcSequence.push(prefixed[i - 1]); // Pushes last not included number which has a */ operator before it
                console.log("CURRENT CALC SEQUENCE: " + calcSequence);
                for (let j = 1; j < calcSequence.length; j += 2) {
                    const n1 = parseFloat(calcSequence[j - 1]); // Num before infix op
                    const n2 = parseFloat(calcSequence[j + 1]); // Num after infix op
                    if (!sequenceResult) {
                        // If calculation result is 0 (beginning) it will set the initial first needed calculation
                        if (calcSequence[j] === "*") {
                            sequenceResult = n1 * n2;
                        } else {
                            sequenceResult = n1 / n2;
                        }
                    } else {
                        // Sequence result exists
                        if (calcSequence[j] === "*") {
                            sequenceResult *= n2;
                        } else {
                            sequenceResult /= n2;
                        }
                    }
                }
                formulaLogic.push(sequenceResult.toString());
                formulaLogic.push(prefixed[i]);
                calcSequence = [];
                sequenceResult = 0;
            } else {
                // If a calculation sequence does not currently exist
                formulaLogic.push(prefixed[i - 1]);
                formulaLogic.push(prefixed[i]);
            }
        }
    }
    if (
        prefixed[prefixed.length - 2] === "*" ||
        prefixed[prefixed.length - 2] === "/"
    ) {
        // Handle logic for last item
        if (calcSequence.length > 1) {
            calcSequence.push(prefixed[prefixed.length - 1]);
            console.log("CURRENT CALC SEQUENCE: " + calcSequence);
            for (let j = 1; j < calcSequence.length; j += 2) {
                const n1 = parseFloat(calcSequence[j - 1]); // Num before infix op
                const n2 = parseFloat(calcSequence[j + 1]); // Num after infix op
                if (!sequenceResult) {
                    // If calculation result is 0 (beginning) it will set the initial first needed calculation
                    if (calcSequence[j] === "*") {
                        sequenceResult = n1 * n2;
                    } else {
                        sequenceResult = n1 / n2;
                    }
                } else {
                    // Sequence result exists
                    if (calcSequence[j] === "*") {
                        sequenceResult *= n2;
                    } else {
                        sequenceResult /= n2;
                    }
                }
            }
            formulaLogic.push(sequenceResult.toString());
        }
    } else {
        formulaLogic.push(prefixed[prefixed.length - 1]);
    }
    return formulaLogic;
};

const handleFinalCalculation = (formulaLogic: string[]) => {
    if(formulaLogic.length === 1){
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
            }
            else{ // Must be -
                finalResult -= n2;
            }
        }
    }
    return finalResult.toString();
};

const Calculate = (calc: string): string => {
    console.log("Inputted value: " + calc); // '123/-456+7*8/9-10'
    // Lexing
    const lexed: string[] = lex(calc); // ['123','/','--','456','+','7','*','8','/','9','-','10']
    console.log("Lexed Array: " + lexed);
    const prefixed: string[] = handlePrefix(lexed); // ['123','/','-456','+','7','*','8','/','9','-','10']
    console.log(prefixed);
    const formulaLogic: string[] = handleFormulaLogic(prefixed); // ['-0.26...','+','6.22...','-'10]
    console.log(formulaLogic);
    const result: string = handleFinalCalculation(formulaLogic); // 0.26 + 6.22 - 10 = -3.52...
    console.log(result);
    return result;
};

export default Calculate;
