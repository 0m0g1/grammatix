import cfg from "../../src/cfg.js";

const generatedBtn = document.querySelector("#generate");
const generatedContent = document.querySelector("#generated");

const rules = {
    "start": ["<article> <noun>"],
    "article": ["a | an | the"],
    "noun": ["cat | dog | cow"]
}

const contextFreeGrammer = new cfg();

generatedBtn.onclick = () => {
    generatedContent.innerHTML = contextFreeGrammer.generateText(rules);
    // console.log(contextFreeGrammer.generateText(rules))
}
