const simplePrepositions = [
        "about|above|across|after|against|along|among|around|as|",
        "at|before|behind|below|beneath|beside|between|beyond|but|by|concerning|",
        "considering|despite|down|during|except|for|from|in|inside|into|like|near|",
        "of|off|on|onto|out|outside|over|past|regarding|round|since|through|",
        "throughout|till|to|toward|under|underneath|until|up|upon|with|within|without"
];


const compoundPrepositions = [
        "'according to'|'along with'|'apart from'|'as for'|'as of'|'as per'|'aside from'|'because of'|",
        "'by means of'|'close to'|'due to'|'except for'|'far from'|'in addition to'|'in front of'|'in place of'",
        "'in spite of'|'instead of'|'on account of'|'out of'|'owing to'|'prior to'|'regardless of'",
        "'with regard to'|'with respect to'|'with the exception of'"
    ];


const phrasalPrepositions = [
        "'according to'|'as for'|'as of'|'aside from'|'because of'|'close to'|'due to'|'except for'",
        "'far from'|'in addition to'|'in front of'|'in place of'|'in spite of'|'instead of'",
        "'on account of'|'out of'|'owing to'|'prior to'|'regardless of'|'with regard to'|'with respect to'",
        "'with the exception of'"
];


const doublePrepositions = [
        "'alongside'|'apart from'|'aside from'|'because of'|'by means of'|'close to'|'due to'",
        "'except for'|'far from'|'inside of'|'instead of'|'near to'|'next to'|'on account of'",
        "'outside of'|'owing to'|'prior to'|'up to'"
];

const participlePrepositions = ["regarding", "following", "concerning", /* ... */];

const prepositionalPhrases = ["in the house", "under the table", "on the chair", /* ... */];

const prepositions = {
    simple: simplePrepositions,
    compound: compoundPrepositions,
    phrasal: phrasalPrepositions,
    double: doublePrepositions,
    participle: participlePrepositions,
    phrases: prepositionalPhrases,
};

export default prepositions;
