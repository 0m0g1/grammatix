# Grammatix

## Overview

The Grammatix system is a JavaScript implementation of a context-free grammar for generating structured text based on predefined rules and modifiers. It allows you to define grammatical structures and generate random variations of text based on those structures.

It is a text expansion library in short.

## How to use
#### An example grammer
 ```Javascript
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
      "evil character": ["alchemist|terorist|knight|dragon|lion|king|monster|terorist"]
  }
 ```

 #### The outputs of the grammer
 ```Text
 Once upon a time in a far away land nestled between two ancient trees. A doctor named Atlas lived. One day his home in between the trees was attacked by a mighty lion with two massive dogs. That ate the trees. Go Atlas!!! Go!!!.

 Once upon a time in a far away land nestled between two ancient trees. A engineer named Anabeth lived. One day his home in between the trees was attacked by a mighty lion with two massive dogs. That ate the trees. Go Anabeth!!! Go!!!.

Once upon a time in a far away land nestled between two ancient trees. A artist named Timothy lived. One day his home in between the trees was attacked by a mighty king with two massive dogs. That ate the trees. Go Timothy!!! Go!!!.
 ```

 