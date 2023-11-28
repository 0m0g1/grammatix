import nouns from "../structures/nouns.js";
import pronouns from "../structures/pronouns.js";
import queries from "../structures/query.js";
import statements from "../structures/statements.js";
import verbs from "../structures/verbs.js";

const Rules = {
    "start": ["<story>"],
    "story": ["<paragraph 1> '<br><br>' <paragraph 2> '<br><br>' <paragraph 3> '<br><br>' <paragraph 4>"],
    "paragraph 1": [`
            Once upon a time, in a serene valley nestled between towering mountains,
            there lived a curious cat named Whiskers.
            Whiskers had a penchant for exploration and a spirit that yearned for adventure.
            Every morning, with the sun peeking over the horizon, 
            Whiskers would begin the day with a leap from the old oak tree that stood just outside her cozy cottage.
        `],
    "paragraph 2": [`
            On this particular morning, a crisp breeze whispered secrets of distant lands,
            beckoning Whiskers to unravel their mysteries. She scampered through emerald meadows,
            her paws dancing amidst the fragrant wildflowers. Along the babbling brook,
            she encountered a troupe of rabbits engaged in a joyous game of hopscotch.
            With a mischievous glint in her eye, Whiskers joined their revelry,
            her graceful leaps adding a whimsical touch to their game.
    `],
    "paragraph 3": [`
            As the day tiptoed toward noon, Whiskers found herself beneath the towering branches of the
            ancient willow tree. Its gnarled roots formed a labyrinth, concealing a hidden path that led
            to the enchanted garden. Here, flora of every hue and shape swayed in harmony, inviting her to
            partake in their enchanting ballet.
    `],
    "paragraph 4": [`
            As dusk painted the sky in shades of lavender and gold, Whiskers made her way back home.
            The twinkling stars overhead seemed to whisper tales of her adventures, promising more wonders in
            the days to come. With a contented sigh, she curled up by the hearth, dreaming of the next sunrise and
            the boundless adventures it would bring.
    `]
}

const rules = {
    "start": ["<sentence>"],
    "sentence": [
                    "<statement>.",
                    "<query>`?`"
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