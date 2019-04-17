# Random Encounter Generator (REG) for Pathfinder
The Random Encounter Generator is, as the name suggests, a program that creates random encounter tables based on the user's input. The software is based on HTML and JavaScript and can be executed on every operating system (Windows, Mac, Linux, probably even mobile devices) with any browser (Firefox, Chrome, ...), even if offline, as long as JavaScript is enabled.

The filters available are:
* __Challenge rating__: You can choose any interval between _1/8_ and _30_ on a double slider.
* __Mythic rank__: Same as before, between _0_ (non-mythic) and _10_.
* __Alignment__: You can choose one or more alignments. The software will search any creature with _at least_ one of the alignments selected. (__OR__ selection mode)
* __Size__: Another double slider, this time the values range between _Fine_ and _Colossal_.
* __Types__: The canonical 12 types, such as _Aberration_, _Dragon_ or _Undead_. __OR__ selection mode is applied.
* __Subtypes__: Most _Humanoid_ subtypes, such as _Elf_ or _Dwarf_ are excluded, but almost anything else is available. The search can be executed in __OR__ selection mode, as well as __AND__ selection mode (creatures are considered ad valid if they have all the selected subtypes) and __XOR__ selection mode (creatures are considered ad valid if they have only one of the selected subtypes).
* __Creature groups__: Some creatures have much in common, and yet no subtype was created for them. __OR__ selection mode is applied.
* __Environment__: The place where the creatures live. __AND__ and __OR__ selection modes are available.
* __Climate__: The temperature the creatures are used to. Some combinations of environment and climate may be contradictory, e.g. warm glaciers. __OR__ and __XOR__ selection modes are available.
* __Planes__: The plane of origin. __OR__ and __XOR__ selection modes are available.
* __Sources__: The books the creatures come from. Those under _Other books_ are actually groups of manuals, because have usually too little material to justify an entire category. __OR__ selection mode is applied.
* __Variant creatures__: Some creatures don't have their own personal sheet, but are defined as variations of other creatures and may require some more work to use them. Disable this option if you don't like the idea.
* __Mixed groups__: Most of the groups generated are simply a certain amount of a creature. Mixed groups however contain two or more different creatures and may require some more study. Disable this option if you don't like the idea.
* __Unique creatures__: Some monsters are simply unique, and thus not necessarely suited for a random encounter. Disable this option if you don't like the idea.
* __Creatures in the table__: How many rows (at most) will the generated table have. 0 indicates to list every creature.
* __Dice colum__: Used if you want to roll a die to select a creature. 0 indicates to remove the dice column.
* __CR increase__: A double slider to select how big is the CR of a group compared to the CR of a member of this group (the strongest for mixed groups).

Other features:
* Contains over 3400 unique creatures and mixed groups.
* Each creature links to its sheet on [Archives of Nethys](https://www.aonprd.com/). __Warning__: Part of Bestiary 5 and most of Bestiary 6 are still to be imported on the site, so these link will generate an error.
* Creatures are ordered based on their _Challenge rating_ and then on their _Mythic rank_. Other than that, their order is random.

Missing volumes:
* Campaign Setting:
** Concordance of rivals (to be published)
** Druma, profit & prophecy (to be published)
* Player Companion:
** Heroes of Golarion
** Chronicle of legends (to be published)
* Adventure Path:
** Tyrant's grasp #1 - #6 (partly published)
