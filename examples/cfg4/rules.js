const Rules = {
    "start": ["<variables> <story>"],
    "variables": [`
            <'hero' -> 'character'>
            <'name' -> 'names'> 
            <'villain' -> 'evil character'>
    `],
    "story": ["<paragraph 1>"],
    "paragraph 1": [`
            Once upon a time in a far away land nestled between two ancient trees. A <hero> named <name> lived.
            One day his home in between the trees was attacked by a mighty <villain> with two massive dogs. That ate
            the trees. Go <name>'!!!' Go'!!!'.
        `],
    "names" : ["Atlas|Bosco|Timothy|Anabelle|Anabeth"],
    "character": ["doctor|writer|knight|physician|engineer|artist|soldire"],
    "evil character": ["alchemist|terorist|knight|dragon|lion|king|monster|terorist"],
    "locations": ["city|mountain|hill|cave|apartment|park|valley|river"]
}

export default Rules;