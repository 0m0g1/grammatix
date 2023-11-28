import cfg from "../../src/cfg.js";

const generatedBtn = document.querySelector("#generate");
const generatedContent = document.querySelector("#generated");

const rules = {
    "start": ["<sentence>"],
	"sentence": ["<NP> <VP>", "<Interj> <NP> <VP>"],
	"NP": ["<Det> <N>", "<Det> <N> that <VP>", "<Det> <Adj> <N>", "<Det> <N> <PP>"],
	"PP": ["<Prep> <NP>"],
	"Prep": ["in", "on", "over", "against"],
	"VP": ["<Vtrans> <NP>", "<Vintr>"],
	"Interj": ["oh,", "my,", "wow,", "damn,"],
	"Det": ["this", "that", "the"],
	"N": ["amoeba", "dichotomy", "seagull", "trombone", "corsage", "restaurant", "suburb"],
	"Adj": ["bald", "smug", "important", "tame", "overstaffed", "luxurious", "blue"],
	"Vtrans": ["computes", "examines", "foregrounds", "prefers", "interprets", "spins"],
	"Vintr": ["coughs", "daydreams", "whines", "slobbers", "vocalizes", "sneezes"]
}


const contextFreeGrammer = new cfg();

generatedBtn.onclick = () => {
    generatedContent.innerHTML = contextFreeGrammer.generateText(rules);
}
