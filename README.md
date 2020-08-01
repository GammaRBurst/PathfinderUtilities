# News about this project
This project seems abandoned, but it's far from true. I'm still working on it, sort of, but it became so big that at the moment I can't update a stable version. As soon as it is uploadable (and it could take months or more) I'll create a new repository for it. The new software will be an almost complete resource for Pathfinder first edition players, with the ability to search for monsters and generate random encounter tables (this project), as well as a filter for feats, complete with tree structure (almost complete), a filter for spells (work in progress), a class progression planner complete with archetypes (not started yet), a magic item filter (not started yet) and maybe also some sort of databases for races, deities, mundane equipment, traits and various perils (traps, haunts, ...). I have yet to decide what I want to include in this project, but in general it should be something more than a mere list, there are already many websites that provide lists.

I'm also working on some other software, this time based on Python3, namely a dice roller (complete), a SVG grid drawer for battle maps (complete), a starry sky generator for the maniacally thorough workbuilders (work in progress, some of the early results are beautiful if you are into astronomy), and a random name generator that produces words that sound like known languages (work in progress, if I can access a good number of proper nouns for a sufficient number of languages and a complete list of their hyphenation rules).

# Random Encounter Generator (REG) for Pathfinder
The Random Encounter Generator is, as the name suggests, a program that creates random encounter tables based on the user's input. The software is based on HTML and JavaScript and can be executed on every operating system (Windows, Mac, Linux, probably even mobile devices) with any browser (Firefox, Chrome, ...), even if offline, as long as JavaScript is enabled.

Just download the files and double-click on *random_encounters.html*! No installation needed.

## Available Filters
* __Challenge rating__: You can choose any interval between _1/8_ and _30_ on a double slider.
* __Mythic rank__: Same as before, between _0_ (non-mythic) and _10_.
* __Alignment__: You can choose one or more alignments. The software will search any creature with _at least_ one of the alignments selected. (__OR__ selection mode)
* __Size__: Another double slider, this time the values range between _Fine_ and _Colossal_.
* __Types__: The canonical 13 types, such as _Aberration_, _Dragon_ or _Undead_. __OR__ selection mode is applied.
* __Subtypes__: Most _Humanoid_ subtypes, such as _Elf_ or _Dwarf_ are excluded, but almost anything else is available. The search can be executed in __OR__ selection mode, as well as __AND__ selection mode (creatures are considered valid if they have all the selected subtypes) and __XOR__ selection mode (creatures are considered valid if they have only one of the selected subtypes).
* __Creature groups__: Some creatures have much in common, and yet no subtype was created for them. __OR__ selection mode is applied.
* __Hit dice__: Similar to Challenge rating, a double slider between _1_ and _40_.
* __Movement types__: How the creature moves. You can choose between _land_, _burrow_, _climb_, _fly_, _swim_ and _other_ speeds, but it's not possible to select the actual speed, nor the flight maneuverability. __AND__, __OR__ and __XOR__ selection modes are available.
* __Ability scores__: Six double sliders that range between _0_ (no ability score, represented by _-_) and _60_. (Though no creature has scores as high.)
* __Environment__: The place where the creatures live. __AND__ and __OR__ selection modes are available.
* __Climate__: The temperature the creatures are used to. Some combinations of environment and climate may result in strange contradictions, such as warm glaciers. __OR__ and __XOR__ selection modes are available.
* __Planes__: The plane of origin. __OR__ and __XOR__ selection modes are available.
* __Sources__: The books the creatures come from. Those under _Other books_ are actually groups of manuals, because they usually have too little material to justify an entire category. __OR__ selection mode is applied.
* __Templates__: What kind of templates are applied randomly to the creature. A high overall probability may slow considerably the generation of the table. Physical modification templates can be applied up to 3 times per creatures, all other categories only once per creature. Different categories don't limit each other though.
* __List of creatures__: Creates a list of all the creatures that match the criteria, without creating groups. Disables _mixed groups_, _Number of creatures_, _CR increase_ as well as table settings.
* __Enable links__: Adds links to monster sheets on [Archives of Nethys](https://www.aonprd.com/).
* __Variant creatures__: Some creatures don't have their own personal sheet, but are defined as variations of other creatures and may require some more work to use them. Disable this option if you don't like the idea.
* __Mixed groups__: Most of the groups generated are simply a certain amount of a creature. Mixed groups however contain two or more different creatures and may require some more study. Disable this option if you don't like the idea.
* __Unique creatures__: Some monsters are simply unique, and thus not necessarely suited for a random encounter. Disable this option if you don't like the idea.
* __Creatures in the table__: How many rows (at most) will the generated table have. 0 indicates to list every creature.
* __Dice colum__: Used if you want to roll a die to select a creature. 0 indicates to remove the dice column.
* __Number of creatures__: Defines the minimum and maximum number of creatures that can be found in a group.
* __CR increase__: A double slider to select how big is the average CR of a group compared to the CR of a single member of this group (the strongest for mixed groups). This may be in conflict with the number of creatures if both options are used in a contradictory way (e.g. small CR increase and high number of creatures).
* __Sorting options__: You can choose to sort the results _by CR and then MR_, or _alphabetically_. If you choose both, the alphabetical filter is applied to the creature that share the same _CR_ and _MR_. If you choose neither, the order is completely random.

All checkboxes, except those in the last panel, have a triple value. An unchecked box means that the property is indifferent, i.e. it can be present or absent. A green tick means the property must be present, the search mode is further defined by the selection mode (__AND__, __OR__, __XOR__), if available. A red cross means that the property has to be absent.

Similarly, the __Variant creatures__, __Mixed groups__ and __Unique creatures__ have a triple value, but with different meanings. An empty checkbox means the option is disabled and all creatures that match the criteria are excluded. A green tick means the option is enabled and no creature is excluded. A blue ring means only the creatures that match the search are included.

## Other Features
* Contains more than 3500 unique creatures and mixed groups and almost 50 templates.

## Bugs and other strange things
While no bug is known at the moment, I'm pretty sure there are some mistakes here and there.
* __Wrong link__: While AoN is quite predictable in the way it memorized the creatures' names, it sometimes deviates from its standards. Moreover, the software may create a link for a mythic creature while the creature is non-mythic or vice versa. If you spot a wrong link and you are sure the monster sheet exists, write an issue with the monster name and the correct URL of its sheet.
    __Known issues with links__: At the moment 5 creatures are missing on AoN (Andoletta, Being of Ib, Mudman, Mythic Sphinx, Xenarth) and 17 are misspelled (Ancient Paradise Dragon, Blood Maize, Bonethorn, Bonewrought Willow, Calligraphy Wyrm, 
Clacking Skull Swarm, Gliding Turtle, Greater Verdurous Ooze, Kamaitachi, Magnetite Golem, Oaur-Ooung, Proto-Shoggoth Syncytium, Skirk Nettle, Sodden Draugr Troop, Stymphalidies Swarm, Treerazer). At the moment the misspelled names are accounted for, but if and when they are corrected, the links to their sheets may not work anymore.
* __Wrong plural__: Plurals in English are usually easy to construct, but there are exceptions. Sadly English is not my mother language, so some irregular or special plural may have gone unnoticed. If you find a wrong plural, write an issue with the monster name and the correct plural.
* __Wrong/missing monster informations__: Most of the informations are translated as numbers to reduce the database's size. It's easy to type some digits instead of some others, and I already found some of these mistakes myself. These are by far the hardest mistakes to find, but if you happen to stuble upon one, write an issue with the monster name and what is wrong or missing.
* __Strange combination of templates__: Templates have to obey some simple rules to be applied to a creature, but this not always makes sense in the end. The conditions are already much more restrictive than originally though to avoid a lot of nonsense, but it can sometimes happen that a template shouldn't have been applied to a specific creature or a combination of templates produces absurd results. This is not really a bug in general, but if you think a particular combination shouldn't exist, report it and, if possible, I'll try to add some more conditions to avoid this result.
* __Everything else__: Be as specific as possible, it's much easier to find and correct the problem this way.

## Missing Manuals
* Campaign Setting:
  * Druma, profit & prophecy
* Adventure Path:
  * Tyrant's grasp #6

## Next Update
I'm still waiting for AoN to publish the new monsters, so they will have to wait for the next update.

Templates are implemented and working, finally, but I feel like this topic is far from closed. There are quite a few more templates that I discarded for the first test because they looked harder to implement, but now it may be a good moment to look at them more closely. Not all of them will make it to the end, but if I manage to squeeze in a few more, all the better.

I'm also studying the possibility to implement a generic system to create NPCs with class levels. I'm planning to use only the creatures with no racial hit dice, since everything else requires knowing the monster role, and this would mean updating more than 3500 monsters. The idea is to give the most basic informations in a side page, things like race, class, level, CR, ability scores and money to buy equipment. I don't plan to add archetypes, multiple classes and prestige classes, to generate the whole sheet, an automatic system to generate equipment and all these details that require too much information and thousands of lines of code.

On a related note, this would also let me use some templates like Lich or Vampire to create more custom monsters. I'm not sure yet if I want to apply them only to NPCs or to any monster, I'll have to study the problem a bit more. The first alternative seems the easiest though, so it will be implemented first.

There are also a few monsters I'd like to list somewhere, those with a definition too vague or broad, such as the _balor lord_. They deserve to be listed somewhere, but this whill require me to read every monster entry in every manual to seek for any kind of variations I missed previously. It will take me some time before I do this.

Finally, I'm studying the possibility of adding a thumbnail column in the table. Many monsters have a nice picture and I find valuable being able to see them. I'm not sure though if this is completely legal, and even if it is, it will take me __a lot__ of time to rip all the images from the manuals.

I noticed I planned to implement (and managed to implement in one case) every point of my __Things You Won't Find Here__ list, all the things I discarded at the beginning of this project because the seemed too difficult to realize. Maybe I was wrong, we'll see.
