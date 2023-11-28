import cfg from "../../src/cfg.js";
import Rules from "./rules.js";

const generatedBtn = document.querySelector("#generate");
const generatedContent = document.querySelector("#generated");

const contextFreeGrammer = new cfg();
contextFreeGrammer.rules = Rules;

generatedBtn.onclick = () => {
    generatedContent.innerHTML = contextFreeGrammer.generateText();
}
