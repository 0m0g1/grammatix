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
    "eoi": "eoi",
    "invalid": "invalid"
})

const modifiers = Object.freeze({
    "capitalized": "capitalized",
    "plural": "plural",
})


class Token {
    constructor(type = tokenTypes.invalid, value = null) {
        this.type = type;
        this.value = value;
    }
}

class Lexer {
    constructor(input) {
        this.input = input;
        this.currentPositionOnInput = 0;
    }
    getNextToken() {
        const currentToken = this.input[this.currentPositionOnInput];

        if (this.currentPositionOnInput >= this.input.length) {
            return new Token(tokenTypes.eoi);
        }
        
        if (/[a-zA-Z0-9]/.test(currentToken)) {
            let string = "";
            while (/[a-zA-Z0-9]/.test(this.input[this.currentPositionOnInput]) && this.currentPositionOnInput < this.input.length) {
                string += this.input[this.currentPositionOnInput];
                this.currentPositionOnInput++;
            }
            return new Token(tokenTypes.string, string);
        }

        if (/[\n]/.test(currentToken)) {
            this.currentPositionOnInput++;
            return new Token(tokenTypes.whitespace, tokenTypes.whitespace);
        }

        if (currentToken === "'") {
            let string = "";
            this.currentPositionOnInput++;
            
            while (this.input[this.currentPositionOnInput] !== "'") {
                if (this.currentPositionOnInput < this.input.length) {
                    string += this.input[this.currentPositionOnInput];
                    this.currentPositionOnInput++;
                } else {
                    const backtick = "'"
                    throw(`Expected "'" at the end of "${string}"`);
                }
            }
            this.currentPositionOnInput++;

            return new Token(tokenTypes.string, string);
        }

        if (currentToken == "<") {
            let tokenString = "";
            this.currentPositionOnInput++;

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

        switch (currentToken) {
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

class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.previousToken = null;
        this.currentToken = this.lexer.getNextToken();
        this.generatedTokens = [];
    }
    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            this.previousToken = this.currentToken;
            this.currentToken = this.lexer.getNextToken();
        } else {
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

    parse() {
        let tokens = [];

        if (this.currentToken.type == tokenTypes.expandable) {
            tokens.push(...this.parseExpandable());
        }
        
        if (this.currentToken.type == tokenTypes.pipe) {
            tokens.push(this.parsePipe());
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

class Tokenizer {
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
    modifyString(string, modifier) {
        if (modifier == modifiers.capitalized) {
            string = string.charAt(0).toUpperCase() + string.slice(1, string.length);
        }
        if (modifier == modifiers.plural) {
            string += "s";
        }
        if (modifier == modifier.linebreak) {
            string += "<br>";
        }

        return string;
    }
    expand(token = new Token(tokenTypes.expandable, "start"), expansion = []) {
        if (token.type == tokenTypes.expandable) {
            const tokenString = token.value.split(".")[0];
            if (this.rules[tokenString]) {
                const pick = arrayGetRandomChoice(this.rules[tokenString]); //Pick a random string from the array of structures
                const tokens = this.tokenizer.tokenize(pick);
                
                tokens.forEach((tokenItem) => {
                    if (tokenItem.type === tokenTypes.expandable) {
                        expansion.push(...this.expand(tokenItem));
                    } else {
                        const string = tokenItem.value;
                        let modifiers = token.value.split(".");
                        modifiers = modifiers.slice(1, modifiers.length);
                        let result = string;

                        modifiers.forEach((modifier) => {
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

export default cfg;