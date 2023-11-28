import nouns from "./structures/nouns.js";
import pronouns from "./structures/pronouns.js";
import queries from "./structures/query.js";
import statements from "./structures/statements.js";
import verbs from "./structures/verbs.js";

const Rules = {
    "start": ["<sentence>"],
    "sentence": [
                    "<statement>.",
                    "<query>'?'"
                ],
    "statement": statements.statements,
    "query": queries.queries,    
    "noun phrase": [
                    "<noun>",
                    "<pronoun>",
                    "<proper noun>",
                    "<adjective> <noun>",
                    "<imperfect verb> <noun>",
                ],
    "plural noun phrase": [
                    "<plural noun>",
                    "<pronoun>",
                    "<proper noun>",
                    "<adjective> <noun>",
                    "<imperfect verb> <noun>",
                    "<imperfect verb> <plural noun>",
                ],
    "determined noun phrase": ["<determinant> <noun phrase>"],
    "verb phrase": [
                    "<verb>",
                    "<adverb> <verb>",
                    "<verb> <adverb>"
                ],
    "relative clause": ["<relative pronoun> <verb phrase>"],
    "prepositional phrase": [
                                "<preposition> <pronoun>",
                                "<preposition> <determinant> <noun>"
                            ],
    "relative clause": ["<relative pronoun> <verb phrase>"],
    "determinant": ["a|an|the|this|the|that"],
    "noun": nouns.singular,
    "plural noun": nouns.plural,
    "do verb": verbs.do,
    "verb": verbs.present,
    "imperfect verb": verbs.imperfect,
    "past verb": verbs.past,
    "auxillary verb": verbs.perfectAuxillary,
    "imperfect auxillary verb": verbs.imperfectAuxillary,
    "conjuction": ["and|but|or"],
    "pronoun": ["I|you|he|she|we|they|it"],
    "personal subject pronoun": pronouns.personalSubjectPronouns,
    "personal object pronoun": pronouns.personalObjectPronouns,
    "possessive adjective pronoun": pronouns.possessiveAdjectivePronouns,
    "possessive pronoun": pronouns.possessivePronouns,
    "reflexive pronoun": pronouns.reflexivePronouns,
    "demonstrative pronoun": pronouns.demonstrativePronouns,
    "interrogative pronoun": pronouns.interrogativePronouns,
    "relative pronoun": pronouns.relativePronouns,
    "indefinite pronoun": pronouns.indefinitePronouns,
    "reciprocal pronoun": pronouns.reciprocalPronouns,
    "intensive pronouns": pronouns.intensivePronouns,
    "proper noun": nouns.proper,
    "preposition": ["in|above|under|for"],
    "relative pronoun": ["which|who|that"],
    "adjective": ["big|small|red|yellow|bright|blue|beautiful|ugly"],
    "adverb": ["slowly|quickly|efficiently|gently|excitedly"],
    "interjection": ["oh|my|wow|damn"],
};


export default Rules;