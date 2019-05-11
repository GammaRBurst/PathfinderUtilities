# Random Encounter Generator (REG) for Pathfinder
The Random Encounter Generator is, as the name suggests, a program that creates random encounter tables based on the user's input. The software is based on HTML and JavaScript and can be executed on every operating system (Windows, Mac, Linux, probably even mobile devices) with any browser (Firefox, Chrome, ...), even if offline, as long as JavaScript is enabled.

Just download the files and double-click on *random_encounters.html*! No installation needed.

## Available Filters
* __Challenge rating__: You can choose any interval between _1/8_ and _30_ on a double slider.
* __Mythic rank__: Same as before, between _0_ (non-mythic) and _10_.
* __Alignment__: You can choose one or more alignments. The software will search any creature with _at least_ one of the alignments selected. (__OR__ selection mode)
* __Size__: Another double slider, this time the values range between _Fine_ and _Colossal_.
* __Types__: The canonical 12 types, such as _Aberration_, _Dragon_ or _Undead_. __OR__ selection mode is applied.
* __Subtypes__: Most _Humanoid_ subtypes, such as _Elf_ or _Dwarf_ are excluded, but almost anything else is available. The search can be executed in __OR__ selection mode, as well as __AND__ selection mode (creatures are considered ad valid if they have all the selected subtypes) and __XOR__ selection mode (creatures are considered ad valid if they have only one of the selected subtypes).
* __Creature groups__: Some creatures have much in common, and yet no subtype was created for them. __OR__ selection mode is applied.
* __Hit dice__: Similar to Challenge rating, a double slider between _1_ and _40_. (No creature has more than 36 HD at the moment.)
* __Movement types__: How the creature moves. You can choose between _land_, _burrow_, _climb_, _fly_, _swim_ and _other_ speeds, but it's not possible to select the actual speed, nor the flight maneuverability. __AND__, __OR__ and __XOR__ selection modes are available.
* __Ability scores__: Six double sliders that range between _0_ (no ability score, represented by _-_) and _60_. (Though no creature has scores as high.)
* __Environment__: The place where the creatures live. __AND__ and __OR__ selection modes are available.
* __Climate__: The temperature the creatures are used to. Some combinations of environment and climate may be contradictory, e.g. warm glaciers. __OR__ and __XOR__ selection modes are available.
* __Planes__: The plane of origin. __OR__ and __XOR__ selection modes are available.
* __Sources__: The books the creatures come from. Those under _Other books_ are actually groups of manuals, because have usually too little material to justify an entire category. __OR__ selection mode is applied.
* __List of creatures__: Creates a list of all the creatures that match the criteria, without creating groups. Disables _mixed groups_, _CR increase_ as well as table settings.
* __Enable links__: Adds links to monster sheets on [Archives of Nethys](https://www.aonprd.com/). __Warning__: Part of Bestiary 5 and most of Bestiary 6 are still to be imported on the site, so these link may generate an error.
* __Variant creatures__: Some creatures don't have their own personal sheet, but are defined as variations of other creatures and may require some more work to use them. Disable this option if you don't like the idea.
* __Mixed groups__: Most of the groups generated are simply a certain amount of a creature. Mixed groups however contain two or more different creatures and may require some more study. Disable this option if you don't like the idea.
* __Unique creatures__: Some monsters are simply unique, and thus not necessarely suited for a random encounter. Disable this option if you don't like the idea.
* __Creatures in the table__: How many rows (at most) will the generated table have. 0 indicates to list every creature.
* __Dice colum__: Used if you want to roll a die to select a creature. 0 indicates to remove the dice column.
* __CR increase__: A double slider to select how big is the CR of a group compared to the CR of a member of this group (the strongest for mixed groups).

All checkboxes, except those in the last panel, have a triple value. An unchecked box means that the property is indifferent, i.e. it can be present or absent. A green tick means the property must be present, the search mode is further defined by the selection mode (__AND__, __OR__, __XOR__), if available. A red cross means that the property has to be absent.

Similarly, the __Variant creatures__, __Mixed groups__ and __Unique creatures__ have a triple value, but with different meanings. An empty checkbox means the option is disabled and all creatures that match the criteria are excluded. A green tick means the option is enabled and no creature is excluded. A blue ring means only the creatures that match the search are included.

## Other Features
* Contains around 3500 unique creatures and mixed groups.
* Creatures are ordered based on their _Challenge rating_ and then on their _Mythic rank_. Other than that, their order is random.

## Things you Won't Find Here
* __Creatures with class levels__ rarely entered the creature database. Most of them are playable races (e.g _drow_, _strix_) or creatures with a template (e.g. _lich_, _vampire_).
* __Creatures with templates__ are included only if they looked significant and/or iconic enough to me. Most undead are, as well as lycanthropes and many others. Other creatures looked too specific, e.g. the _half-celestial unicorn_.
* __Variants with too broad a definition__ are never included. The variants that found their way into the database should be fairly easy to construct. Monsters like e.g. the _balor lord_ that don't have a fixed CR, usually have class levels and the like are practically impossible to define in a way that will work with the software.
* __An automatic system__ to apply templates and/or class levels to existing creatures or playable races was part of the project at the start, but I quickly realized that:
  * Adding class levels to monsters requires the knowledge of the monster role, an information that can be found only in the Bestiaries, which leaves about 1/4 of the material without this information.
  * There are a ton o classes, archetypes and prestige classes. Yes, it's in no way comparable to the number of creatures that can be found in the database, but then there are all the possible combinations of these classes, archetypes and prestige classes, each with its own set of rules and requirements. And the combinations have to be somehow significant.
  * Templates require a lot of information on the base creature. Informations that are not always easy to insert into the database, such as immunity to fire or the presence of an exoskeleton.

  These are jobs for a human mind, not a machine.

## Bugs and other strange things
While no bug is known at the moment, I'm pretty sure there are some mistakes here and there.
* __Wrong link__: While AoN is quite predictable in the way it memorized the creatures' names, it sometimes deviates from its standards. Moreover, the software may create a link for a mythic creature while the creature is non-mythic or vice versa. If you spot a wrong link and you are sure the monster sheet exists, write an issue with the monster name and the correct URL of its sheet.
* __Wrong plural__: Plurals in English are usually easy to construct, but there are exceptions. Sadly English is not my mother language, so some irregular or special plural may have gone unnoticed. If you find a wrong plural, write an issue with the monster name and the correct plural.
* __Wrong/missing monster informations__: Most of the informations are translated as numbers to reduce the database's size. It's easy to type some digits instead of some others, and I already found some of these mistakes myself. These are by far the hardest mistakes to find, but if you happen to stuble upon one, write an issue with the monster name and what is wrong or missing.
* __Everything else__: Be as specific as possible, it's much easier to find and correct the problem this way.

## Missing Manuals
* Campaign Setting:
  * Concordance of rivals
  * Druma, profit & prophecy (to be published in June)
* Player Companion:
  * Chronicle of legends (to be published in May)
* Adventure Path:
  * Tyrant's grasp #3 - #6 (partly published)

## Next Update
* __Sorting__: It'll be possible to sort based on CR/MR (only current possibility), CR/MR and then name, only name or completely random order. _Studying the problem._
* __New options__: I'm planning to add the  _no racial HD_ group (Sorry, I couldn't find a better name). _Software implemented, database not yet updated._

I expect this new version to be ready for the second half of May.

I'm also studying templates more closely, in particular what are the requisites and what are the effects on the creatures. I was right when I said there are a lot of things to consider, but maybe it's doable, at least partly. It will need further research and won't probably be included in the next update.
