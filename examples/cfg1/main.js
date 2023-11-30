import GrammatiX from "../../src/grammatix.js";

const generatedBtn = document.querySelector("#generate");
const generatedContent = document.querySelector("#generated");

const contextFreeGrammer = new GrammatiX();

const rules = {
    "start": ["<variables> <story>"],
    "variables": [`
            <'name' -> 'names'>
            <'occupation' -> 'occupations'>
    `],
    "names": ["davis|ian|sheillah|kate|sheldon|angela|ben|tony|willis|jeff"],
    "occupations": ["engineer|doctor|writer|farmer|knight|soldire|dentist|pharmacist"],
    "story": [`
                Once upon a time there lived a <occupation.bold> called <name.capitalized.italicized>.
                <name.capitalized.italicized> wanted to join the guild of <occupation.plural>.
                '<br>'
                <'old occupation' -> 'occupation'>
                <'occupation' -> 'occupations'> 
                After failing the test to join the guild he changed his new occupation to '<b>'<occupation>'</b>'.
                '<br>'
                So <name.capitalized.italicized> the former <old occupation.bold> now a <occupation.bold> promised to read more for any tests that he might want to take
                in future.
            `]
}


generatedBtn.onclick = () => {
    generatedContent.innerHTML = contextFreeGrammer.generateText(rules);
}
