# List of Manuals

* [Creatures](creatures.md)
* [Templates](templates.md)
* [Feats](feats.md)

## Introduction

If you are interested in adding custom entries to one of the databases, here is presented the general file structure, shared by every database. I chose to store everything in text files instead of faster, more compact, and more versatile formats because in this way anyone can use and edit them, without the need to install additional software.

__Warning 1__: Some of the indications given here or in one of the specific manuals may change in future updates. I like to have everything in order, usually sorted alphabetically based on a property's name, and the numerical values should mirror that order, so whenever I add/move/remove some values I shift all the numbers appropriately. This means that a custom entry may need to be redefined after an update. Refer to specific manuals to check if the values changed. The chances of this happening on a closed project are of course much lower.

__Warning 2__: If you decide to add a new possible value for one of the fields, remember that you will also need to edit the corresponding HTML file to include a checkbox for it.

## Common Structure

Every database is organized as a PSV (pipe-separated values) file. The whole database is included in a javascript string variable. This is how it looks like:

    var var_name = `
    [PSV content here]
    `;
    var_name = var_name.split('\n');

Every line contains always the same amount of values, each separated by a pipe, or vertical line (|). The pipe can't be used for anything else. If the number of fields of one line is different, the entry is automatically discarded by the software.

If not indicated differently, every field is mandatory. An empty field looks like this: || (between the two pipes).

Empty lines, or lines containing only spaces and tabulations, as well as lines beginning with # are ignored. You can separate your content with as many empty lines as you wish and add comments with # to better identify everything. Spaces around values are ignored, so you don't need to, say, add a space before or after every pipe. It's not much, but it helps keep the database lighter.

Don't edit in any way the first and the last two lines of the database file. Insert everything after the first line and before the second-to-last. If you don't, the software will almost certainly generate an error and stop working.

You can edit any one of the database with any text editor. I would advise against programs that manage CSV-like files, such as Microsoft Excel, because this is not a perfect PSV file. If you do anyway, remember that the program will add pipes to each empty line and comment, or it may even decide on its own to change all the separators to commas or semicolons. The amount of work it generates is simply not worth it.

### Text Fields

Some of the fields in a database may contain a text description. They all share the same syntax:
* __Italic__ text can be obtained by enclosing the text between three backticks (`) on each side.
* __Bold__ text can be obtained by enclosing the text between three apostrophes (') on each side. As a stylistical rule, bold is used only to highlight a short inline title at the start of a paragraph, while italic is used to highlight everything else. For this reason, the bold operator starts a new paragraph automatically.
* __Underlined__ text can be obtained by enclosing the text between three underscores (_) on each side.
* __Complex HTML content__, such as tables or lists, have to be included from an outside file. The file is called `tables.js` and is located in the same directory as the database. Its structure is outlined below. To recall a particular chunk of HTML code, put it's ID number between three square brackets ([]). This will always break the paragraph, even if the HTML code is composed only of inline elements. If the `tables.js` is not already present in the database's directory, then this option is not available for that database.
* __References to manuals__ are used for homonyms. When two entries have the same name, but different content, it's possible to distinguish the two by adding the acronym ID enclosed by three curly braces ({}) on each side. The acronyms are stored in the `acronyms.js` file, located in the same directory as the database. If the `acronyms.js` is not already present in the database's directory, then this option is not available for that database.

It's also possible to insert some small HTML content directly into the text. This is mainly used to insert line breaks through the HTML tag `<br />`.

### *tables.js*

This file's structure is simply an array of strings, each one with some HTML content:

    var tables = [
    [array of HTML strings here]
    ];

The backtick (`) is probably the best string delimiter for this kind of content, because it permits multiline content.

Remember that the enumeration of array elements starts from 0, when you recall them with the triple square brackets. It's advised to add a comment with the ID and a short description before each element of the array. The file can get big very fast, and keeping trace of the ID progression can be challenging otherwise.

### *acronyms.js*

This file's structure is simply an array of strings, each one a different acronym:

    var acronyms = [
    [array of strings here]
    ];

Contrary to what was advised for `tables.js`, adding comments to this file will probably triple its size. If you use a text editor that displays line numbers, it should be simple enough to deduce the index from the line number (`line - 2`). Just remember that the indexing starts at 0.

