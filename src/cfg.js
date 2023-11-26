function removeAngleBrackets(text) {
    return text.replace("<", "").replace(">", "");
}

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
    return array[getRndInteger(0, array.length -1)];
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

const rules = {
    "start":[   ["<article>", "<adjective>", "<noun>", "."],
                ["<interogative>", "<linking verb>", "<article>", "<noun>", "?"]
            ],
    "article": [["a"], ["an"], ["the"]],
    "adjective": [["slow"], ["fast"], ["big"], ["slim"]],
    "noun": [["cat"], ["dog"], ["cow"]]
};

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

        if (this.currentPositionOnInput >= this.input.length - 1) {
            return new Token(tokenTypes.eoi);
        }
        
        // if (/[\s]/.test(currentToken)) {
        //     while (/\s/.test(this.input[this.currentPositionOnInput]) && this.currentPositionOnInput < this.input.length) {
        //         this.currentPositionOnInput++;
        //         currentToken = this.input[this.currentPositionOnInput];
        //     }
        // }
        
        if (/[a-zA-Z0-9]/.test(currentToken)) {
            let string = "";
            while (/[a-zA-Z0-9]/.test(this.input[this.currentPositionOnInput]) && this.currentPositionOnInput < this.input.length) {
                string += this.input[this.currentPositionOnInput];
                this.currentPositionOnInput++;
            }
            return new Token(tokenTypes.string, string);
        }

        if (currentToken === "'") {
            let string = "";
            this.currentPositionOnInput++;
            
            while (this.input[this.currentPositionOnInput] !== "'") {
                if (this.currentPositionOnInput < this.input.length) {
                    string += this.input[this.currentPositionOnInput];
                    this.currentPositionOnInput++;
                } else {
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

        if (this.currentToken.type == tokenTypes.whitespace) {
            tokens.push(...this.parse());

        } else if (this.currentToken.type == tokenTypes.pipe) {
            tokens.push(...this.parse());
        } else {
            tokens.push(this.previousToken);
            tokens.push(...this.parse());

        return tokens;
    }
    parseWhitespace() {
        let tokens = [];

        const previousToken = this.previousToken;
        this.eat(tokenTypes.whitespace);

        if (this.currentToken.type == tokenTypes.pipe) {
            this.previousToken = previousToken;
        
        } else {
            tokens.push(previousToken);
            tokens.push(this.previousToken);

        }
        
        tokens.push(...this.parse());
        
        return tokens;
    }
    parsePipe() {
        let tokens = [];
        
        const previousToken = this.previousToken;
        this.eat(tokenTypes.pipe);
        const choices = [previousToken, this.currentToken];
        const choice = arrayGetRandomChoice(choices);
        this.currentToken = choice;
        this.eat(this.currentToken.type);

        tokens.push(...this.parse());

        return tokens;
    }
    parseExpandable() {
        let tokens = [];

        this.eat(tokenTypes.expandable);
        tokens.push(...this.parse());

        return tokens;
    }

    parse() {
        let tokens = [];
        
        if (this.currentToken.type == tokenTypes.eoi) {
            tokens.push(this.previousToken);
        }

        if (this.currentToken.type == tokenTypes.expandable) {
            tokens.push(...this.parseExpandable());
        }
        
        if (this.currentToken.type == tokenTypes.pipe) {
            tokens.push(...this.parsePipe());
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

    expand(token = new Token(tokenTypes.expandable, "start"), expansion = []) {
        if (token.type == tokenTypes.expandable) {
            if (this.rules[token.value]) {
                const pick = arrayGetRandomChoice(this.rules[token.value]); //Pick a random string from the array of structures
                const tokens = this.tokenizer.tokenize(pick);
                
                tokens.forEach((tokenItem) => {
                    if (tokenItem.type === tokenTypes.expandable) {
                        expansion.push(...this.expand(tokenItem));
                    } else {
                        expansion.push(tokenItem.value);
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
    generateText(rules) {
        this.rules = rules;
        const expansion = this.expand();
        // console.log(expansion);
        return expansion.join("");
    }
}

export default cfg;
