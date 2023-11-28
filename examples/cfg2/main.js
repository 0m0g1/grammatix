import cfg from "../../src/cfg.js";

const generatedBtn = document.querySelector("#generate");
const generatedContent = document.querySelector("#generated");

const contextFreeGrammer = new cfg();

contextFreeGrammer.rules = {
		"start": ["<sentence>"],
		"sentence": ["<noun phrase> <verb phrase>", "<interjection> <noun phrase> <verb phrase>"],
		"noun phrase": ["<determinant> <noun>", "<determinant> <noun> that <verb phrase>", "<determinant> <Adj> <noun>", "<determinant> <noun> <PP>"],
		"PP": ["<Prep> <noun phrase>"],
		"Prep": ["in", "on", "over", "against"],
		"verb phrase": ["<Vtrans> <noun phrase>", "<Vintr>"],
		"interjection": ["oh,", "my,", "wow,", "damn,"],
		"determinant": ["this", "that", "the"],
		"noun": ["amoeba", "dichotomy", "seagull", "trombone", "corsage", "restaurant", "suburb"],
		"Adj": ["bald", "smug", "important", "tame", "overstaffed", "luxurious", "blue"],
		"Vtrans": ["computes", "examines", "foregrounds", "prefers", "interprets", "spins"],
		"Vintr": ["coughs", "daydreams", "whines", "slobbers", "vocalizes", "sneezes"]
}



generatedBtn.onclick = () => {
    generatedContent.innerHTML = contextFreeGrammer.generateText();
}
