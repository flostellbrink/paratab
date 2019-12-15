# Paratab

## What is this?

Aligned tabs within paragraphs.

## Why?

### Tables

Have you ever tried to write a table in markdown? Did it look like this?

```md
| Tables        | Are                                 | Cool  |
|-              |-                                    |-      |
| col 3 is      | right-aligned and also sort of wide | $1600 |
| col 2 is      | centered                            | $12   |
| zebra stripes | are neat                            | $1    |
```

What happens if you add more content to a cell? That's right, it gets wider.

```md
| Tables        | Are           | Cool  |
|-              |-              |-      |
| col 3 is      | right-aligned and also sort of wide | $1600 |
| col 2 is      | centered      | $12   |
| zebra stripes | are neat      | $1    |
```

But the other cells do not magically grow. You are gonna have to change all of them. By hand.
Even worse now your git diff will look like this:

```diff
-| Tables        | Are           | Cool  |
-|-              |-              |-      |
-| col 3 is      | right-aligned | $1600 |
-| col 2 is      | centered      | $12   |
-| zebra stripes | are neat      | $1    |
+| Tables        | Are                                 | Cool  |
+|-              |-                                    |-      |
+| col 3 is      | right-aligned and also sort of wide | $1600 |
+| col 2 is      | centered                            | $12   |
+| zebra stripes | are neat                            | $1    |
```

Paratabs will keep columns aligned and the diff clean!

| Tables	︀| Are	︀| Cool	︀|
|-	︀|-	︀|-	︀|
| col 3 is	︀| right-aligned and also sort of wide	︀| $1600	︀|
| col 2 is	︀| centered	︀| $12	︀|
| zebra stripes	︀| are neat	︀| $1	︀|

### End of line comments

All the same problem happen with end of line comments.
Now I am not sure why you would use them, but I am sure everyone has seen something like this at some point:

```
const constant1 = 123;    // Comment describing constant1
const constant2 = "abc";  // Comment describing constant2
```

Again all the same issues come up. When any length changes, you'll have to update all lines in that block.

That's not only tedious but will, again, pollute your diffs.

## How does this work?

Paratabs are simply tab character followed by [variation selector 1](https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)).

This means that editors without support for paratabs will simply render them as tabs.

Editors with support, such as VS Code with this extension, will instead render a paratab that aligns with other paratabs in the same paragraph.

## Getting started

* `npm install` to initialize the project
* `npm run watch` to start the compiler in watch mode
* open this folder in VS Code and press `F5`
* this will open the `[Extension Development Host]` window, running the extension:
  * Open any document that contains paratabs.
  * The extension will decorate paratabs with additional spacing.
