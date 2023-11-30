# Grammatix

## Overview

The Grammatix system is a JavaScript implementation of a context-free grammar for generating structured text based on predefined rules and modifiers. It allows you to define grammatical structures and generate random variations of text based on those structures.

It is a text expansion library in short.

[A link to some of the places grammatix has been used](https://0m0g1.github.io/grammatix)

## Introduction

### Example

```Javascript
import GrammatiX from "../grammatix.js";

const textGenerator = new GrammatiX();
const rules = {
    "start": ["<sentence>"],
    "sentence": ["Hello world"]
}

const text = textGenerator.generateText();
console.log(textGenerator.generateText(rules));
```
###### Output
```Text
Hello world
```
### Explanation
Non Terminal characters are written with in angle brackets like so `<string>` and terminal characters are just written.

The text generator generates text based of the rules given as an argument to the `generateText()` function.
Grammatix class then looks for the start structure and finds `<sentence>` in it so it expands sentence by looking for it in `rules.sentence` and outputs `hello world` because sentence is a terminal structure and cannot be expanded further.

If `rules` did not have such a structure / key `sentence` and error would be given.

## How to use

### A sighlty more complex example grammer

 ```Javascript
const rules = {
    "start": ["<variables> <story>"],
    "variables": [`
            <'name' -> 'names'>
            <'occupation' -> 'occupations'>
    `],
    "names": ["davis|sheillah|angela|ben|tony|willis|jeff"],
    "occupations": ["engineer|doctor|writer|farmer"],
    "story": [`
                Once upon a time there lived a <occupation> called '<b>'<name.capitalized>'</b>'.
                <name.capitalized> wanted to join the guild of <occupation.plural>.
            `]
}
 ```

 #### The outputs of the grammer
 ```Text
Once upon a time there lived a farmer called Willis. Willis wanted to join the guild of farmers.

Once upon a time there lived a writer called Jeff. Jeff wanted to join the guild of writers.

Once upon a time there lived a doctor called Angela. Angela wanted to join the guild of doctors.
 ```

## Explanation

### Expanding Variables

Grammatix looks for the start rule or structure and finds the variables token first so it expands it.

Variables have to be declared before they are used. So if your going to use them in the story you have to expand variables first before you expand the story so that the variables can be created otherwise the variables won't exist and you will be referencing a non exisiting structure which will result in an error.

Though you can also create variables in the middle of the story in between lines for example if you introduce a new character. But you have to create the variable before you reference it still.

In the example above, the variables structure has two variables defined `name` and `occupation`.
Variables are declared in the format `<'variable name' -> 'root structure name'>`.

For example:
`<'name' -> 'names'>`

Here Grammatix will create a variable called name then it will assign a value to it from the structure in rules
that corresponds to its `root structure's` name. In this case the root structure is `names` or `rules.names`.
So grammatix will look at the `names` structure and assign `name` with a value from it. If names doesn't exist it will result in an error.

The `|` pipe symbol in the names structure is a simple way of saying `or` instead of writting:
```Javascript
"names": ["davis","sheillah","angela","ben","tony","willis","jeff"];
```
its much much simpler to write:
```Javascript
"names": ["davis|sheillah|angela|ben|tony|willis|jeff"]
```

The above structure is also valid (the structure using `","`)  but you should preferably use it for a structure that can have different structures where each structure consists of multiple structures for example:

```Javascript
"sentence": ["<noun phrase> <verb phrase>", "<interjection>, <noun phrase> <verb phrase>"];
```

Here grammatix will interprate a sentence as being either:
```Javascript
"sentence": ["<noun phrase> <verb phrase>"];
```
or
```Javascript
"sentence": ["<interjection>, <noun phrase> <verb phrase>"];
```

If you used a `|` symbol in this case like so:

```Javascript
"sentence": ["<noun phrase> <verb phrase>|<interjection>, <noun phrase> <verb phrase>"];
```

The structure will be interprated as `verb phrase or interjection` so the full sentence structure will stay the same but grammatix will interprate sentence as

```Javascript
"sentence": ["<noun phrase> <verb phrase>, <noun phrase> <verb phrase>"];
```
or 
```Javascript
"sentence": ["<noun phrase> <interjection>, <noun phrase> <verb phrase>"];
```

So after creating the name variable, grammatix then creates the next variable occupation from the root structure occupations.

### Expanding the story

After the variables `name` and `occupation` have been created they are now ready to be used in the story.

Grammatix moves on to expand the story. It replaces every `<occupation>` variable with the occupation it picked when it expanded the varibles structure. This ensures that the same occupation is shown throught the entire story unless you change it by creating reassigning it by recreating it like so 

```Javascript
[`
    After failing the test to join the guild he changed his new occupation to <'occupation' -> 'occupations'> <occupation>.
`]
```

In this example There are some modifiers used `.capitalized` and `.plural`. These modifiers make the first letter capitalized and add an `s` to the string respectively. You can also chain modifiers `<name.capitalized.italicized>` will produce a bold and italicized text. 

This makes it simple to modifiy texts without redifining them for example if you had a word that didn't have to be capital but came at the beginnig of the text it had to be capital. You can just modify it.

You can see this example in action [here](https://studio-0m0g1.github.io/cfg/examples/cfg1/cfg.html)
The source code the the example is [here](https://github.com/studio-0m0g1/cfg/blob/main/examples/cfg1/main.js)

## Html tags

There are two types of strings in `Grammatix`:

- Any kind of letter or number that isn't in between angle brackets is taken as a string
- Any character that is written in between single quotes

What ever is written in between single qoutes is parsed as a single string token and placed into your generated text as is.

There are many use cases for quoted strings like:

- Using html tags in your structures by putting them in single quotes for example `'<b>'Hi'</b>'` will create a bold hi statement. This allows you to style and manipulate your text generated text with more freedom with things like ids `'<span id = "text" >Hello world</span>'`

- So for example you wanted to write `<name>` in your text without it being expanded and resulting in an error because the `rules.name` structure does not exist you can use single quotes `'<name>'` like so to just output `<name>` without it being taken as an expandable token structure.

- Also most special characters will bring about an error because they are invalid tokens that might have other uses later as gramatix progresses so in order to use them you have to surround them in single quotes like so: `'!'`,`'?'` or `'@'`.

- Single qoutes are also used to make compund words. That is two or more words or characters that are to be interprated as a single token for example a person's name like `'Timothy George'` or book titles `'This is a long book title'` all of these words and names will be taken as a single string token.