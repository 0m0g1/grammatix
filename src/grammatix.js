/**
 * @author Davis Omogi
 */


function removeCharAtIndex(str, index) {
    if (index < 0 || index >= str.length) {
        // Invalid index, return original string
        return str;
    } else {
        // Create a new string by slicing the original string before and after the specified index
        return str.slice(0, index) + str.slice(index + 1);
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arrayGetRandomChoice(array) {
    return array[getRndInteger(0, array.length - 1)];
}

const noneSpaceCharacters = [".", "?", "!"]

const tokenTypes = Object.freeze({
    "quote": "'",
    "less": "<",
    "greater": ">",
    "whitespace": " ",
    "pipe": "|",
    "expandable": "expandable",
    "comma": ",",
    "dot": ".",
    "string": "string",
    "variable": "variable",
    "eoi": "eoi",
    "invalid": "invalid"
})

const modifiers = Object.freeze({
    "capitalized": "capitalized",
    "plural": "plural",
})


class Token { //The base class for all tokens
    constructor(type = tokenTypes.invalid, value = null) {
        this.type = type;
        this.value = value;
        this.rootStructure = "";
    }
}

class Lexer { //A class to convert text inputs to tokens
    constructor(input) {
        this.input = input;
        this.currentPositionOnInput = 0;
    }
    getNextToken() { //Gets the next token in the input string
        const currentToken = this.input[this.currentPositionOnInput];

        if (this.currentPositionOnInput >= this.input.length) { //If the position being looked at in the input string is past the inputs length
            return new Token(tokenTypes.eoi);
        }
        
        if (/[a-zA-Z0-9]/.test(currentToken)) { //Check if the current character in the input is a letter or number
            let string = "";

            //As long as the character is a letter or digit get the character and add it to the string variable
            while (/[a-zA-Z0-9]/.test(this.input[this.currentPositionOnInput]) && this.currentPositionOnInput < this.input.length) {
                string += this.input[this.currentPositionOnInput];
                this.currentPositionOnInput++;
            }
            return new Token(tokenTypes.string, string);
        }

        if (/[\n]/.test(currentToken)) { //If the current character is a newline character replace it with a space
            this.currentPositionOnInput++;
            return new Token(tokenTypes.whitespace, tokenTypes.whitespace);
        }

        //Another format for string tokens
        //Any character in between single quotes is a string token
        if (currentToken === "'") {
            let string = "";
            this.currentPositionOnInput++;
            
            //If the current character is not a single qoute its part of the string
            while (this.input[this.currentPositionOnInput] !== "'") {
                if (this.currentPositionOnInput < this.input.length) {
                    string += this.input[this.currentPositionOnInput];
                    this.currentPositionOnInput++;

                } else { //If you've reached the end of the input string and there was no closing qoute throw an error
                    throw(`Expected "'" at the end of "${string}"`);
                }
            }
            this.currentPositionOnInput++;

            return new Token(tokenTypes.string, string);
        }

        //Expandable token and variable token
        if (currentToken == "<") { //Their first character is less angle bracket
            this.currentPositionOnInput++;

            /**
             * If the next character after the < character is a single quote the token is a variable
             * This validates if the structure of the variable token is <'string' -> 'string'> 
             */
            if (this.input[this.currentPositionOnInput] === "'") {
                let variableName = "";
                let rootStructure = "";

                this.currentPositionOnInput++

                while (this.input[this.currentPositionOnInput] != "'") {
                    if (this.currentPositionOnInput < this.input.length) {
                        variableName += this.input[this.currentPositionOnInput];
                        this.currentPositionOnInput++;
                    } else {
                        throw(`Expected "' -> string>" after "'${variableName}'"`);
                    }
                }
                this.currentPositionOnInput++;

                if (this.input[this.currentPositionOnInput] == " ") {
                    this.currentPositionOnInput++;
                }
                
                if (this.input[this.currentPositionOnInput] == "-") {
                    this.currentPositionOnInput++;
                    
                    if (this.input[this.currentPositionOnInput] == ">") {
                        this.currentPositionOnInput++;

                    } else {
                        throw(`Expected "> 'string'>" after "'${variableName}"' -"`);
                        
                    }
                    if (this.input[this.currentPositionOnInput] == " ") {
                        this.currentPositionOnInput++;
                    }

                } else {
                    throw(`Expected "-> 'structure name' after ${variableName}"`);
                }

                if (this.input[this.currentPositionOnInput] === " ") {
                    this.currentPositionOnInput++;
                }

                if (this.input[this.currentPositionOnInput] === "'") {
                    this.currentPositionOnInput++;

                    while (this.input[this.currentPositionOnInput] !== "'") {
                        if (this.currentPositionOnInput < this.input.length) {
                            rootStructure += this.input[this.currentPositionOnInput];
                            this.currentPositionOnInput++;
                        } else {
                            throw(`Expected "'" after "${rootStructure}"`);
                        }
                    }

                } else {
                    throw(`Expected "structure name" after "<'${variableName}' -> "`);

                }

                this.currentPositionOnInput++;
                
                if (this.input[this.currentPositionOnInput] != ">") {
                    throw(`Expected ">" after "'${rootStructure}'"`);
                }
                
                this.currentPositionOnInput++;

                const variableToken = new Token(tokenTypes.variable, variableName);
                variableToken.rootStructure = rootStructure;

                return variableToken;
            }

            //Expandable token
            /**
             * If the next character after the < character is letter then the token is an expandable token
             * This validates if the structure of the variable token is <string>
             * As long as the current token in the input is not ">" add that character to the string token
            */
            let tokenString = "";

            while (this.input[this.currentPositionOnInput] !== ">") { 
                if (this.currentPositionOnInput < this.input.length) {
                    tokenString += this.input[this.currentPositionOnInput];
                    this.currentPositionOnInput++;
                } else {
                    throw(`Expected ">" at the end of <${tokenString}`);
                }
            }

            this.currentPositionOnInput++;

            return new Token(tokenTypes.expandable, tokenString);
        }

        switch (currentToken) {//Other tokens
            case " ":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.whitespace, tokenTypes.whitespace);
            case ".":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.string, ".");
            case ",":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.string, ",");
            case "|":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.pipe);
            default:
                return new Token(tokenTypes.invalid)
        }
    }
}

//Parser
/**
 * Performs operations on the tokens with other tokens
 * It throws an error if the structure of tokens is wrong for example
 */
class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.previousToken = null;
        this.currentToken = this.lexer.getNextToken();
        this.generatedTokens = [];
    }
    //
    eat(tokenType) { //Check if the current token type is the expected token type
        if (this.currentToken.type === tokenType) { //If the current token type is expected move to the next token
            this.previousToken = this.currentToken;
            this.currentToken = this.lexer.getNextToken();

        } else { //If the current token type is not expected throw an error
            throw(`Unexpected "${this.currentToken.type}" token, "${tokenType}" expected`);
        }
    }
    parseString() {
        let tokens = [];

        this.eat(tokenTypes.string);

        if (this.currentToken.type == tokenTypes.pipe) {
            const choice = this.parsePipe();
            tokens.push(choice);
        } else {
            tokens.push(this.previousToken);
        }

        tokens.push(...this.parse());

        return tokens;
    }
    parseWhitespace() {
        let tokens = [];

        tokens.push(this.currentToken);
        this.eat(tokenTypes.whitespace);

        tokens.push(...this.parse());
        
        return tokens;
    }
    parsePipe() {
        const previousToken = this.previousToken;
        const choices = [previousToken];
        
        while (this.currentToken.type === tokenTypes.pipe) {
            this.eat(tokenTypes.pipe);
            choices.push(this.currentToken);
            this.eat(this.currentToken.type);
        }

        const choice = arrayGetRandomChoice(choices);
        this.previousToken = choice;

        return choice;
    }
    parseExpandable() {
        let tokens = [];

        this.eat(tokenTypes.expandable);

        if (this.currentToken.type == tokenTypes.pipe) {
            const choice = this.parsePipe();
            tokens.push(choice);
        } else {
            tokens.push(this.previousToken);
        }

        tokens.push(...this.parse());

        return tokens
    }
    parseVariable() {
        let tokens = [];

        tokens.push(this.currentToken);
        this.eat(tokenTypes.variable);
        tokens.push(...this.parse());

        return tokens;
    }
    parse() {
        let tokens = [];

        if (this.currentToken.type == tokenTypes.expandable) {
            tokens.push(...this.parseExpandable());
        }
        
        if (this.currentToken.type == tokenTypes.pipe) {
            tokens.push(this.parsePipe());
        }

        if (this.currentToken.type == tokenTypes.variable) {
            tokens.push(...this.parseVariable());
        }

        if (this.currentToken.type == tokenTypes.whitespace) {
            tokens.push(...this.parseWhitespace());
        }

        if (this.currentToken.type == tokenTypes.string) {
            tokens.push(...this.parseString());
        }

        return tokens;
    }
}

class Tokenizer { //Breaks the inputed string into a list of tokens
    constructor() {
        this.lexer = null;
        this.Parser = null;
    }
    tokenize(input) {
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        return parser.parse();
    }
}

class cfg { //context free grammer
    constructor() {
        this.rules = {};
        this.tokenizer = new Tokenizer();
    }
    // Modifies the string based on the given modifier
    modifyString(string, modifier) {
        if (modifier == modifiers.capitalized) {
            string = string.charAt(0).toUpperCase() + string.slice(1, string.length);
        }
        if (modifier == modifiers.plural) {
            // console.log(string);
            string += "s";
        }
        if (modifier == modifier.linebreak) {
            string += "<br>";
        }

        return string;
    }
    // Creates a variable token
    createVariable(token) {
        const structure = new Token(tokenTypes.expandable, token.rootStructure);
        
        if (this.rules[token.rootStructure]) {
            this.rules[token.value] = this.expand(structure);
        } else {
            throw(`Cannot create variable "${token.value}", root structure "${token.rootStructure}" does not exist`)
        }
    }
    expand(token = new Token(tokenTypes.expandable, "start"), expansion = []) {
        if (token.type == tokenTypes.expandable) {
            const tokenString = token.value.split(".")[0];
            console.log(tokenString);
            if (this.rules[tokenString]) {
                const pick = arrayGetRandomChoice(this.rules[tokenString]); //Pick a random string from the array of structures
                const tokens = this.tokenizer.tokenize(pick);
                
                tokens.forEach((tokenItem) => {
                    if (tokenItem.type === tokenTypes.expandable) {
                        expansion.push(...this.expand(tokenItem));

                    } else if (tokenItem.type === tokenTypes.variable) {
                        this.createVariable(tokenItem);

                    } else {
                        const string = tokenItem.value;
                        let modifiers = token.value.split(".");
                        modifiers = modifiers.slice(1, modifiers.length);
                        let result = string;
                        
                        modifiers.forEach((modifier) => {
                            console.log(string)
                            result = this.modifyString(result, modifier);
                        })

                        expansion.push(result);
                    }
                });
                
            } else {
                throw(`Structure "${token.value}" does not exist`)
            }
        } else {
            expansion.push(tokenItem.value);
        }

        return expansion;
    }
    generateText() {
        const expansion = this.expand();
        return expansion.join("");
    }
}


class GrammatiX {
    generateText(rules) {
        const textGenerator = new cfg();
        textGenerator.rules = rules;
        return textGenerator.generateText();
    }
}

export default GrammatiX;