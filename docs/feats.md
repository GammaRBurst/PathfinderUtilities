# Pathfinder Feats

This HTML page is a filter for feats.

## Available filters

* __Feat Tree__ or __Feat List__: The list representation is the traditional alphabetical list of feats. It's faster to generate, but harder to explore. The tree representation is similar. Feats are still listed alphabetically, but also based on their dependencies on other feats. For example, the feat _Improved Disarm_ requires _Combat Expertise_, so the first feat will be listed under the second, indented and with a dotted line connecting it to its prerequisite, in a way that shows its subordinate role.
* __Grey feats__: If you are planning a PC for a campaign, or a recurring NPC, some of the values inserted in the filters explained below will change over the course of the campaign. And while it's important to show only the feats you actually qualify for, it's also important to plan ahead. For this reason you can enable this option to show in grey all the feats for which you don't have high enough ability scores, class level, or skill ranks.
* __Remove orphan feats__: Orphan feats are feats that depend on a feat for which you don't qualify, or that were excluded by other filters. They can appear in list mode only, and you can choose to show them in grey, or hide them.
* __Ability Scores__: If you check the checkbox, you can set your ability scores, and feats that require higher scores will be hidden or shown in grey.
* __Race__: If you check the checkbox and choose a race, all feats that require another race will be hidden.
* __Classes and Level__: If you check the checkbox, you can set your level in the various classes, as well as your caster levels, overall character level, mythic tier, and base attack bonus (BAB). Feats that require higher scores will be hidden or shown in grey.
* __Skill Ranks__: If you check the checkbox, you can set the number of skill ranks you have for each skill. Feats that require higher scores will be hidden or shown in grey.
* __Feat Types__: You can choose what kind of feats you are interested in. Checkboxes have three states: unselected (indifferent), selected (feats have to be of the specified type) and excluded (feats can't be of the specified type). You can click on checkboxes to go through these possibilities, or right click to cycle in the opposite direction.
* __Sources__: The books the feats come from. Some of them are actually groups of manuals, because they usually have too few entries each to justify an entire category. The checkboxes work in the same way as for feat types.
* __Manual filter__: All the above filters may not be enough to plan the progression for your character. Even after applying most of them, you may still have to deal with tens or hundreds of feats. If you are not interested in a particular feat, you can remove it by pressing the *X* at the left of its name. This will hide the feat from view. If however you change your mind, or removed one feat by mistake, there's no need to reload the page. You can find all the removed feats listed under the *Removed Feats* menu, just under the filters. Just click on a feat's name to have it reappear in the list. The menu will appear as soon as you remove one feat. In the tree representation, if the feat has a number following it in brackets, it means there are dependent feats that were automatically hidden as well. They will reappear together.

## Other Features

* Contains more than 3500 unique feats.
* Clicking on a feat shows its complete text. If a feat appeared on more than one manual, or was updated once or more, it shows the most updated and newest version, followed by all the older versions.

## Bugs and other strange things

While no bug is known at the moment, I'm pretty sure there are some mistakes here and there.
* __Wrong/missing feat informations__: Most of the informations are translated as numbers to reduce the database's size. It's easy to type some digits instead of some others, and I already found some of these mistakes myself. These are by far the hardest mistakes to find, but if you happen to stuble upon one, write an issue with the feat name and what is wrong or missing.
* __Everything else__: Be as specific as possible, it's much easier to find and correct the problem this way.

Just one note on missing informations. You may notice that, on feats that require other feats as prerequisites, some other prerequisites may be missing. This is not a bug. In the manuals some feats always display all previous requirements, some display only a part of them, and some others only the new ones. I decided to uniform the requirements. If a feat requires e.g. _Int 13_, then all feats that require this feat will also **implicitly** require _Int 13_. You can see previous requisites very well in tree mode.

# Next Updates

Almost certainly there won't be any, except for a few bug fixes. I feel like this part of the project is complete and perfectly usable.

