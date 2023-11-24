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

        if (this.currentPositionOnInput >= this.input.length) {
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
            console.log(this.input);
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

        switch (currentToken) {
            case "<":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.less);
            case ">":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.greater);
            case " ":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.whitespace);
            // case ".":
            //     this.currentPositionOnInput++;
            //     return new Token(tokenTypes.string, ".");
            case "|":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.pipe);
            case "'":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.quote);
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
    }
    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            this.previousToken = this.currentToken;
            this.currentToken = this.lexer.getNextToken();
        } else {
            throw(`Unexpected "${this.currentToken.type}" token, "${tokenType}" expected`);
        }
    }
    parseDot() {
        let tokens = [];

        tokens.push(new Token(tokenTypes.dot, tokenTypes.dot));
        this.eat(tokenTypes.dot);
        tokens.push(...this.parse());

        return tokens;
    }
    parseWhiteSpace() {
        let tokens = [];
        
        const tokenBeforeThisSpace = this.previousToken;
        this.eat(tokenTypes.whitespace);
        
        if (this.currentToken.type === tokenTypes.string) {
            tokens.push(tokenBeforeThisSpace);
            tokens.push(new Token(tokenTypes.whitespace, tokenTypes.whitespace));
            tokens.push(...this.parse());
        
        } else if (this.currentToken.type === tokenTypes.whitespace) {
            tokens.push(new Token(tokenTypes.whitespace, tokenTypes.whitespace));
            tokens.push(new Token(tokenTypes.whitespace, tokenTypes.whitespace));
            this.eat(tokenTypes.whitespace);
            tokens.push(...this.parse());
        
        } else if (this.currentToken.type === tokenTypes.pipe) {
            this.previousToken = tokenBeforeThisSpace;

            const choices = [this.previousToken];
            this.eat(tokenTypes.pipe);
            this.eat(tokenTypes.whitespace);
            choices.push(...this.parse());

            const choice = arrayGetRandomChoice(choices);;
            
            tokens.push(choice);
            
        }

        return tokens;
    }
    parseAngleBracket() {
        let tokens = [];
        
        this.eat(tokenTypes.less);
        this.eat(tokenTypes.string);
        const expandableToken = new Token(tokenTypes.expandable, this.previousToken.value);
        this.eat(tokenTypes.greater);

        this.previousToken = expandableToken;

        tokens.push(...this.parse());

        return tokens;
    }
    parseString() {
        let tokens = [];
        
        this.eat(tokenTypes.string);

        tokens.push(...this.parse());

        return tokens;
    }
    parsePipe() {
        let tokens = [];

        let choices = [this.previousToken];
        this.eat(tokenTypes.pipe);
        this.eat(tokenTypes.whitespace);
        choices.push(...this.parse());

        const choice = arrayGetRandomChoice(choices);

        tokens.push(choice);
        tokens.push(...this.parse())

        return tokens;
    }
    parseEoi() {
        const result = [];
        
        if (this.previousToken.type == tokenTypes.string) {
            result.push(new Token(tokenTypes.whitespace, tokenTypes.whitespace));
            result.push(this.previousToken);

        } else if (this.previousToken.type == tokenTypes.expandable) {
            result.push(this.previousToken);
        }

        this.eat(tokenTypes.eoi);
        return result;
    }
    parse() {
        let tokens = [];
        
        if (this.currentToken.type === tokenTypes.eoi) {
            tokens.push(...this.parseEoi());
        }
        
        if (this.currentToken.type == tokenTypes.whitespace) {
            tokens.push(...this.parseWhiteSpace());
        }
        
        if (this.currentToken.type == tokenTypes.less) {
            tokens.push(...this.parseAngleBracket());
        } 
        
        if (this.currentToken.type == tokenTypes.string) {
            tokens.push(...this.parseString());
        }
        
        if (this.currentToken.type == tokenTypes.dot) {
           tokens.push(...this.parseDot());     
        }

        if (this.currentToken.type == tokenTypes.pipe) {
            tokens.push(...this.parsePipe());   
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