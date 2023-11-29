import GrammatiX from "../../src/grammatix.js";
import Rules from "./rules.js";

const generatedBtn = document.querySelector("#generate");
const generatedContent = document.querySelector("#generated");

const contextFreeGrammer = new GrammatiX();
const rules = Rules;

generatedBtn.onclick = () => {
    generatedContent.innerHTML = contextFreeGrammer.generateText(rules);
}
