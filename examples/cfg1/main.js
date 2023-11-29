import GrammatiX from "../../src/grammatix.js";

const generatedBtn = document.querySelector("#generate");
const generatedContent = document.querySelector("#generated");

const contextFreeGrammer = new GrammatiX();

const rules = {
    "start": ["In this example <noun.plural> is pluralized and the other picked word <noun.capitalized>|<verb.capitalized> is capitalized."],
    "article": ["a|an|the"],
    "noun": ["cat|dog|cow"],
    "verb": ["jump|cut|sing"]
}


generatedBtn.onclick = () => {
    generatedContent.innerHTML = contextFreeGrammer.generateText(rules);
}
