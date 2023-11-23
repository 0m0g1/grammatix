function removeAngleBrackets(text) {
    return text.replace("<", "").replace(">", "");
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const noneSpaceCharacters = [".", "?", "!"]

const tokenTypes = Object.freeze({
    "less": "less",
    "greater": "greater",
    "expandable": "expandable",
    "dot": "dot",
    "word": "word",
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
        
        if (/[\s]/.test(currentToken)) {
            while (/\s/.test(this.input[this.currentPositionOnInput]) && this.currentPositionOnInput < this.input.length) {
                this.currentPositionOnInput++;
                currentToken = this.input[this.currentPositionOnInput];
            }
        }
        
        if (/[a-zA-Z]/.test(currentToken)) {
            let word = "";
            while (/[a-zA-Z]/.test(this.input[this.currentPositionOnInput]) && this.currentPositionOnInput < this.input.length) {
                word += this.input[this.currentPositionOnInput];
                this.currentPositionOnInput++;
            }
            return new Token(tokenTypes.word, word);
        }

        if (currentToken == ".") {
            return new Token(tokenTypes.dot);
        }

        switch (currentToken) {
            case "<":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.less);
            case ">":
                this.currentPositionOnInput++;
                return new Token(tokenTypes.greater);
            case ".":
                return new Token(tokenTypes.dot);
            default:
                return new Token(tokenTypes.invalid)
        }
    }
}

class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }
    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            throw(`Unexpected "${this.currentToken.type}" token, "${tokenType}" expected`);
        }
    }
    parse() {
        let result = "";
        
        if (this.currentToken.type === tokenTypes.eoi) {
            this.eat(tokenTypes.eoi);
        };
        
        if (this.currentToken.type == tokenTypes.word) {
            result += this.currentToken.value;
            this.eat(tokenTypes.word);
            
        } else if (this.currentToken.type == tokenTypes.less) {
            this.eat(tokenTypes.less);
            result += this.parse();
            this.eat(tokenTypes.greater);
        }

        if (this.currentToken.type == tokenTypes.dot) {
            result += ".";
            this.eat(tokenTypes.dot);
        }

        return result;
    }
}

class Interprater {
    constructor() {
        this.lexer = null;
        this.Parser = null;
    }
    interprate(input) {
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        return parser.parse();
    }
}

class cfg { //context free grammer
    constructor() {
        this.rules = {};
    }
    expand(inputToken = "start", expansion = []) {

        const interpatedToken = new Interprater().interprate(inputToken);

        if (inputToken == "start" || (inputToken.startsWith('<') && inputToken.endsWith('>') && this.rules[interpatedToken])) {
            const tokenArray = this.rules[interpatedToken];
            const pickedFormat = tokenArray[getRndInteger(0, tokenArray.length - 1)];

            pickedFormat.forEach((formatItem) => {
                expansion.push(...this.expand(formatItem));
            });
        } else {
            expansion.push(interpatedToken);
        }
        
        return expansion;
    }
    generateText(rules) {
        this.rules = rules;
        const expansion = this.expand();

        let result = "";
        expansion.forEach((word) => {
            if (noneSpaceCharacters.includes(word)) {
                result += word;
            } else {
                result += ` ${word}`;
            }
        })
        return result;
    }
}

export default cfg;