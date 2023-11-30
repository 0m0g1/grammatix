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
    "names": ["davis|sheillah|angela|ben|tony|willis|jeff"],
    "occupations": ["engineer|doctor|writer|farmer"],
    "story": [`
                Once upon a time there lived a <occupation> called <name.capitalized>.
                <name.capitalized> wanted to join the guild of <occupation.plural>.
                '<br>'
                <'old occupation' -> 'occupation'>
                <'occupation' -> 'occupations'> 
                After failing the test to join the guild he changed his new occupation to '<b>'<occupation>'</b>'.
                '<br>'
                So <name.capitalized> the former <old occupation> promised to read more for any tests that he might want to take
                in future.
            `]
}


generatedBtn.onclick = () => {
    generatedContent.innerHTML = contextFreeGrammer.generateText(rules);
}
