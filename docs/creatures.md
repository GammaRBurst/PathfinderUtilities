# Pathfinder Creatures and Monsters

This HTML page works both as a filter for creatures and monsters, as well as a random encounter generator.

## Available Filters

* __Challenge rating__: You can choose any interval between _1/8_ and _30_ on a double slider.
* __Mythic rank__: Same as before, between _0_ (non-mythic) and _10_.
* __Alignment__: You can choose one or more alignments. The software will search for any creature with _at least_ one of the alignments selected. (__OR__ selection mode)
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
* __Sources__: The books the creatures come from. Those under _Other books_ are actually groups of manuals, because they usually have too few entries each to justify an entire category. __OR__ selection mode is applied.
* __Templates__: What kind of templates are applied randomly to the creature. A high overall probability may slow considerably the generation of the table. Physical modification templates can be applied up to 3 times per creature, all other categories only once per creature. Different categories don't limit each other though.
* __List of creatures__: Creates a list of all the creatures that match the criteria, without creating groups. Disables _mixed groups_, _Number of creatures_, _CR increase_ as well as table settings.
* __Enable links__: Adds links to monster sheets on [Archives of Nethys](https://www.aonprd.com/).
* __Variant creatures__: Some creatures don't have their own personal sheet, but are defined as variations of other creatures and may require some extra work to use them. Disable this option if you don't like the idea.
* __Mixed groups__: Most of the groups generated are simply a certain amount of a specific creature. Mixed groups however contain two or more different creatures and may require some more study. Disable this option if you don't like the idea. These entries are not invented by the author or generated randomly, they all come from the monsters' descriptions.
* __Unique creatures__: Some monsters are simply unique, and thus not necessarely suited for a random encounter. Disable this option if you don't like the idea.
* __Creatures in the table__: How many rows (at most) will the generated table have. 0 indicates to list every creature.
* __Dice colum__: Used if you want to roll a die to select a creature. 0 indicates to remove the dice column, any other number indicated the die's number of sides.
* __Number of creatures__: Defines the minimum and maximum number of creatures that can be found in a group.
* __CR increase__: A double slider to select how big is the average CR of a group compared to the CR of a single member of this group (the strongest for mixed groups). This may be in conflict with the number of creatures if both options are used in a contradictory way (e.g. small CR increase and high number of creatures).
* __Sorting options__: You can choose to sort the results _by CR and then MR_, or _alphabetically_. If you choose both, the alphabetical filter is applied to the creatures that share the same _CR_ and _MR_. If you choose neither, the order is completely random.

All checkboxes, except those in the last panel, have a triple value. An unchecked box means that the property is indifferent, i.e. it can be present or absent. A green tick means the property must be present, the search mode is further defined by the selection mode (__AND__, __OR__, __XOR__), if available. A red cross means that the property has to be absent.

Similarly, the __Variant creatures__, __Mixed groups__ and __Unique creatures__ have a triple value, but with different meanings. An empty checkbox means the option is disabled and all creatures that match the criteria are excluded. A green tick means the option is enabled and no creature is excluded. A blue ring means only the creatures that match the search are included.

## Other Features

* Contains more than 3500 unique creatures and mixed groups and almost 50 templates.

## Bugs and other strange things

While no bug is known at the moment, I'm pretty sure there are some mistakes here and there.
* __Wrong link__: While AoN is quite predictable in the way it memorized the creatures' names, it sometimes deviates from its standards. Moreover, the software may create a link for a mythic creature while the creature is non-mythic or vice versa. If you spot a wrong link and you are sure the monster sheet exists, write an issue with the monster name and the correct URL of its sheet.
* __Known issues with links__: At the moment 5 creatures are missing on AoN (Andoletta, Being of Ib, Mudman, Mythic Sphinx, Xenarth) and 17 are misspelled (Ancient Paradise Dragon, Blood Maize, Bonethorn, Bonewrought Willow, Calligraphy Wyrm, 
Clacking Skull Swarm, Gliding Turtle, Greater Verdurous Ooze, Kamaitachi, Magnetite Golem, Oaur-Ooung, Proto-Shoggoth Syncytium, Skirk Nettle, Sodden Draugr Troop, Stymphalidies Swarm, Treerazer). At the moment the misspelled names are accounted for, but if and when they are corrected, the links to their sheets may not work anymore.
* __Wrong plural__: Plurals in English are usually easy to construct, but there are exceptions. Unfortunately English is not my mother language, so some irregular or special plural may have gone unnoticed. If you find a wrong plural, write an issue with the monster name and the correct plural.
* __Wrong/missing monster informations__: Most of the informations are translated as numbers to reduce the database's size. It's easy to type some digits instead of some others, and I already found some of these mistakes myself. These are by far the hardest mistakes to find, but if you happen to stumble upon one, write an issue with the monster name and what is wrong or missing.
* __Strange combination of templates__: Templates have to obey some simple rules to be applied to a creature, but this not always makes sense in the end. The conditions are already much more restrictive than originally though to avoid a lot of nonsense, but it can sometimes happen that a template shouldn't have been applied to a specific creature or a combination of templates produces absurd results. This is not really a bug in general, but if you think a particular combination shouldn't exist, report it and, if possible, I'll try to add some more conditions to avoid this result.
* __Everything else__: Be as specific as possible, it's much easier to find and correct the problems this way.

## Next Updates

Templates are implemented and working, but the execution time is unsatisfying. I need to work on the code to optimize it as much as I can. Moreover, there may be other templates I can implement. The more I can add, the better.

I'm also studying the possibility to implement a generic system to create NPCs with class levels. I'm planning to use only the creatures with no racial hit dice, since everything else requires knowing the monster role, and this would mean updating more than 3500 monsters. The idea is to give the most basic informations in a side page, things like race, class, level, CR, ability scores and money to buy equipment. I don't plan to add archetypes, multiple classes and prestige classes, to generate the whole sheet, an automatic system to generate equipment and all these details that require too much information and thousands of lines of code.

On a related note, this would also let me use some templates like Lich or Vampire to create more custom monsters. I'm not sure yet if I want to apply them only to NPCs or to any monster, I'll have to study the problem a bit more. The first alternative seems the easiest though, so it will be implemented first.

There are also a few monsters I'd like to list somewhere, those with a definition too vague or broad, such as the _balor lord_. They deserve to be listed somewhere, but this will require me to read every monster entry in every manual to seek for any kind of variations I missed previously. It will take me some time before I do this.

Finally, I'm studying the possibility of adding a thumbnail column in the table. Many monsters have a nice picture and I find valuable being able to see them. I'm not sure though if this is completely legal, so as a first step I will probably just release a system that checks if a specific image exists and, if it does, include it in the page, so every user can populate its own directory as they like. There is also a problem of distribution. At 2.4 GB and growing, my image directory is not easy to distribute, particularly to users with a less than ideal internet connection. We'll see what comes out of this though.

