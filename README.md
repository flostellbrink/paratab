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
| col 3 is	︀| right-aligned	︀| $1600	︀|
| col 2 is	︀| centered	︀| $12	︀|
| zebra stripes	︀| are neat	︀| $1	︀|

### End of line comments


## Getting started

* `npm install` to initialize the project
* `npm run watch` to start the compiler in watch mode
* open this folder in VS Code and press `F5`
* this will open the `[Extension Development Host]` window, running the extension:
  * Open any document that contains paratabs.
  * The extension will decorate paratabs with additional spacing.
