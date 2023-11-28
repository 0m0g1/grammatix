import cfg from "../../src/cfg.js";
import Rules from "./rules.js";

const generatedBtn = document.querySelector("#generate");
const generatedContent = document.querySelector("#generated");

const rules = Rules;
const contextFreeGrammer = new cfg();

generatedBtn.onclick = () => {
    generatedContent.innerHTML = contextFreeGrammer.generateText(rules);
}
