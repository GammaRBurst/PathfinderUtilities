# -*- coding: utf-8 -*-


__all__ = ['lang']
__author__ = 'GammaRayBurst'
__version__ = '1.0'


import settings.langfiles.common_eng

lang = {
    # Multiline text.
    'changelog': """%(bb)sVersion 1.1%(r)s:
  * Code: upgrade to Python3.
  * Code: code reformatted to adhere to the PEP8 standard.

%(bb)sVersion 1.0%(r)s:
  * Code: updated a deprecated function.
  * Distribution: dropped requirments for diceRoller usage.

%(bb)sVersion 1.0 RC1%(r)s:
  * Macro: added default value for parameters.

%(bb)sVersion 0.8 beta%(r)s:
  * Parser: added multiplication and division of total value and of single dice.
  * Parser: added memory stack for results.
  * Parser: added conditional throws.
  * Macro: added parametric macros.

%(bb)sVersion 0.7 beta%(r)s:
  * Environment: added settings viewer.
  * Environment: color can be disabled.

%(bb)sVersion 0.6 beta%(r)s:
  * Parser: added maximum and minimum total value.
  * Parser: added verbose mode.
  * Macro: added macro functions.
  * Environment: added profile function.
  * Environment: added colors to text.
  * Environment: discarded/corrected throws to output.
  * Code: improved code order.
  * Languages: added multilanguage support.
  * Compatibility: added system compatibility test.

%(bb)sVersion 0.5 alpha%(r)s:
  * Parser: added comments.
  * Log: added logging functions.

%(bb)sVersion 0.4 alpha%(r)s:
  * Parser: added test operator.
  * Parser: added throw multiplier.
  * Code: improved code order.

%(bb)sVersion 0.3 alpha%(r)s:
  * Parser: added gaussian dice.
  * Parser: added maximum and minimum dice value.
  * Parser: added best and worst throws.

%(bb)sVersion 0.2 alpha%(r)s:
  * Parser: added multiple dice throw (comma operator).
  * Environment: added help and copyright.

%(bb)sVersion 0.1 alpha%(r)s:
  * Parser: recognises dice operator and sums.""",
    'help': """Type %(blg)shelp%(r)s followed by a topic to obtain more informations:
  * %(blg)srolls%(r)s: How to roll dice
  * %(blg)scond%(r)s: Hot to roll conditional throws
  * %(blg)sstack%(r)s: How use previous results
  * %(blg)scolor%(r)s: How to enable/disable colors
  * %(blg)slang%(r)s: How to change language
  * %(blg)slog%(r)s: How to enable/disable logging
  * %(blg)smacro%(r)s: How to enable/disable macros
  * %(blg)sprofile%(r)s: How to change profile
  * %(blg)sverbose%(r)s: How to enable/disable verbose mode

%(lc)sGeneric commands:%(r)s
  %(blg)shelp%(r)s: shows this message
  %(blg)sc%(r)s, %(blg)scopyright%(r)s: shows copyright informations
  %(blg)sq%(r)s, %(blg)squit%(r)s, %(blg)sexit%(r)s: interrupts program
  %(blg)ss%(r)s, %(blg)ssettings%(r)s: shows language, log, macro and verbose settings
  %(blg)schangelog%(r)s: shows changelog
  %(blg)sv%(r)s, %(blg)sversion%(r)s: shows diceRoller version""",
    'helpRolls': """%(lc)sSyntax%(r)s:
  [%(br)st%(r)s] %(lc)s_%(br)sd%(lc)s_%(r)s [%(br)sg%(r)s[%(lc)s_%(r)s]] [%(br)sm%(lc)s_%(r)s] [%(br)sM%(lc)s_%(r)s] [%(br)sb%(lc)s_%(r)s] [%(br)sw%(lc)s_%(r)s] [%(br)s*%(lc)s_%(r)s] [%(br)s/%(lc)s_%(r)s] [%(br)s+%(r)s/%(br)s-%(r)s%(lc)s...%(r)s] ...
  |1| |2| |________________3_________________| |__4___|

  ... [%(br)sn%(lc)s_%(r)s] [%(br)sN%(lc)s_%(r)s] [%(br)s**%(lc)s_%(r)s] [%(br)s//%(lc)s_%(r)s] [%(br)sx%(lc)s_%(r)s] [%(br)s#%(lc)s...%(r)s] [%(br)s,%(lc)s...%(r)s]
      |_________5_________| |6_| |_7__| |_8__|

%(lc)s_%(r)s represents a single number.
%(lc)s...%(r)s represents a more complex input.
Every character in %(br)sbold red%(r)s represents an operator, detailed below.
Spaces can be used (or not used) at will.
%(br)sWarning%(r)s: These commands are case-sensitive!

%(b)sBlock 1:%(r)s
  %(br)st%(r)s: plots the probability distribution of the roll
    Warning: may take some minutes, depending on your hardware.
    ex: %(br)st%(lc)s1d20g%(r)s (plots the distribution of a gaussian 20-sided dice)

%(b)sBlock 2:%(r)s
  %(br)sd%(r)s: binary operator 'dice'
    ex: %(lc)s2%(br)sd%(lc)s8%(r)s (rolls two 8-sided dice)
    ex: %(lc)s1%(br)sd%(lc)s%%%(r)s (rolls a 100-sided dice)

%(b)sBlock 3:%(r)s (operators in this block are commutative)
  %(br)sg%(r)s: gaussian dice, followed by standard deviation (optional)
    ex: 1d20%(br)sg%(lc)s5.7%(r)s (rolls a 20-sided dice with SD 5.7)
    ex: 2d4%(br)sg%(r)s (rolls two 4-sided dice with default SD for a standard d4)

  %(br)sm%(r)s: minimum value for every dice, can't be bigger than maximum value
    ex: 3d6%(br)sm%(lc)s2%(r)s (rolls three 6-sided dice, every value smaller than 2 becomes 2)

  %(br)sM%(r)s: maximum value for every dice, can't be smaller than minimum value
    ex: 2d10%(br)sM%(lc)s8%(r)s (rolls two 10-sided dice, every value bigger than 8 becomes 8)

  %(br)sb%(r)s: selects best throws
    ex: 4d6%(br)sb%(lc)s3%(r)s (rolls four 6-sided dice and select the best three values)

  %(br)sw%(r)s: selects worst throws
    ex: 2d12%(br)sw%(lc)s1%(r)s (rolls two 12-sided dice and select the worst value)

  %(br)s*%(r)s: multiplies every dice by a number
    ex: 3d6%(br)s*%(lc)s3%(r)s (every value is multiplied by 3)

  %(br)s/%(r)s: divides every dice by a number
    ex: 2d8%(br)s/%(lc)s2%(r)s (every value is divided by 2, rounded down, then summed)
    ex: 2d8%(br)s/%(lc)s2.%(r)s (every value is divided by 2, no rounding)

%(b)sBlock 4:%(r)s
  %(br)s+%(r)s: adds a number to the total or adds two dice sets
    ex: %(lc)s1d8%(br)s+%(lc)s3%(r)s (rolls a 8-sided dice and adds 3 to the result)
    ex: %(lc)s2d6%(br)s+%(lc)s1d6%(r)s (rolls two 4-sided dice and a 6-sided dice)

  %(br)s-%(r)s: subtracts a number from the total
    ex: %(lc)s2d4%(br)s-%(lc)s1%(r)s (rolls two 4-sided dice and subtracts 1 to the result)

%(b)sBlock 5:%(r)s (operators in this block will be applied in order)
  %(br)sn%(r)s: minimum total value
    ex: 1d6+1d4%(br)sn%(lc)s4%(r)s (every total value smaller than 4 becomes 4)

  %(br)sN%(r)s: maximum total
    ex: 2d8-2%(br)sN%(lc)s10%(r)s (every total value bigger than 10 becomes 10)

  %(br)s**%(r)s: multiplies total value
    ex: 1d6+1%(br)s**%(lc)s3%(r)s (multiplies total value by 3)

  %(br)s//%(r)s: divides total value
    ex: 1d20+1d8+2%(br)s//%(lc)s2%(r)s (divides total value by 2, rounded down)
    ex: 1d20+1d8+2%(br)s//%(lc)s2.%(r)s (divides total value by 2, no rounding)

%(b)sBlock 6:%(r)s
  %(br)sx%(r)s: repeats the roll
    ex: 4d6+1 %(br)sx%(lc)s2%(r)s (repeats twice the same roll)

%(b)sBlock 7:%(r)s
  %(br)s#%(r)s: comment
    ex: 1d20+3 %(br)s#%(lc)sattack roll%(r)s, 1d8+2 %(br)s#%(lc)sdamage%(r)s

%(b)sBlock 8:%(r)s
  %(br)s,%(r)s: separates two different rolls
    ex: %(lc)s1d6%(br)s, %(lc)s2d8+1%(r)s (rolls separately 1d6 and 2d8+1)""",
    'helpCond': """%(lc)sConditional commands:%(r)s
%(br)sWarning%(r)s: Not available for statistical tests!
diceRoller lets you create conditional throws. The command is composed of a first throw, followed by a series of conditions and consequences.
  %(lc)sFirst throw %(br)s??%(lc)s Condition 1 %(br)s::%(lc)s Consequence 1 %(br)s&&%(lc)s ... %(br)s&& ::%(lc)s Last consequence%(r)s
The first throw can be any valid throw. Its result will be tested through the various conditions. A repeated first throw means that the whole conditional test will be repeated too.
Conditions are simple mathematical comparisons. They consist of an operator (%(br)s= < > <= >= !=%(r)s) followed by a number. If no condition is given, this is considered as an %(br)selse%(r)s statement.
Conditions are evaluated in the given order, thus the %(br)selse%(r)s statement should always be the last.
Conditions can't be more complicated. If you wish to select results between two numbers, you should e.g. first declare a condition for any result bigger than the upper bound, then for any result bigger than the lower bound.
If no true condition is met, nothing is executed after the first roll.
A consequence is executed when the first true condition is met, then diceRoller stops looking for other true conditions.
Consequences must consist of single commands, so it's not possible to direcly insert multiple dice throws or nested conditions. To obtain such results, it is suggested to store these operations in macros and call them inside a condition.
Type %(blg)shelp macro%(r)s for more details on the topic.""",
    'helpStack': """%(lc)sStack commands:%(r)s
%(br)sWarning%(r)s: Not available for statistical tests!
diceRoller lets you access previous results in your rolls.
Every line starts with a number in curly brackets as a reference, e.g. %(lc)s{3}%(r)s.
By typing the same number in curly brackets, diceRoller recalls the corresponding result. It's also possible to access the stack from the end by using negative numbers. This way %(lc)s{-1}%(r)s is the last result and so on.
Using a number greater than the stack length will raise an error.
    ex: 1d20+%(br)s{%(lc)s34%(br)s}%(r)s (rolls a 20-sided dice and adds the result of operation 34)
    ex: 1d%%-%(br)s{%(lc)s-1%(br)s}%(r)s (rolls a percentile dice and subtracts the last result)""",
    'helpLog': """%(lc)sLog commands:%(r)s
diceRoller can save every throw in a log file of your choice.
  %(blg)slog on%(r)s: starts logging dice throws
  %(blg)slog off%(r)s: stops logging dice throws (default behaviour)
  %(blg)slog file %(lg)sfilename%(r)s: switches to a different log (default: dice)""",
    'helpMacro': """%(lc)sMacro commands:%(r)s
diceRoller supports macro, a useful item to save recurrent, complicated throws.
  %(blg)smacro set %(lg)smacroname dice%(r)s: adds a new macro or overwrites an old one; no spaces allowed in macroname, use semicolon (;) to separate various throws
  %(blg)smacro file %(lg)sfilename%(r)s: switches to a different macro list (default: dice)
  %(blg)smacro del %(lg)smacroname%(r)s: deletes an existing macro
  %(blg)smacro list%(r)s: lists every saved macro
  %(blg)s@%(lg)smacroname%(r)s: recalls a macro

Macros can contain parameters. A parameter is a single word enclosed in square brackets.
  ex: macro set attack 1d20+%(br)s[bonus]%(r)s
It is possible to specify a defalut value for each occurrence of each parameter.
  ex: macro set attack 1d20+%(br)s[bonus = 7]%(r)s
When calling a parametric macro, it is necessary to specify the parameter values.
This can be any valid expression, from a simple number, to a dice, to another macro.
  ex: @attack%(br)s[bonus = 5]%(r)s
If no value is specified, the default value is used. If no default value exists, 0 is used.""",
    'helpProfile': """%(lc)sProfile commands:%(r)s
diceRoller lets you easily switch together log and macro files.
  %(blg)sprofile %(lg)sprofilename%(r)s: switches to a different log and macro list""",
    'helpVerbose': """%(lc)sVerbose commands:%(r)s
diceRoller can show only used throws and the final result or every discarded or modified throw.
  %(blg)sverbose on%(r)s: displays more details about throws
  %(blg)sverbose off%(r)s: displays only basic informations about throws""",

    # Log messages.
    'logOff': '    Logging is disabled.',
    'logOn': '    Logging is enabled, log file is %s.',
    'logSwitch': '    Switching to log file: %s.',

    # Macro messages.
    'macroAdded': '    %sMacro "%s" added to list.%s',
    'macroEmpty': '    %sNo macro saved.%s',
    'macroError': 'Macro not existing',
    'macroNotAdded': '    %sMacro "%s" not added to list.%s',
    'macroNotExisting': '    %sMacro "%s" does not exist.%s',
    'macroOver': 'Macro name already existing. Overwrite? [Y/n] ',
    'macroRemoved': '    %sMacro "%s" removed from list.%s',
    'macroStart': '    Macro collection file is %s, %s macro(s) loaded.',
    'macroSwitch': '    Switching to macro file: %s, %s macro(s) loaded.',

    # Verbose messages.
    'verboseOff': '    Verbose mode is disabled.',
    'verboseOn': '    Verbose mode is enabled.',

    # Test messages.
    'testFreq': 'Frequency',
    'testValue': 'Dice value',

    # Conditional messages.
    'conditionError': 'Invalid condition',

    # Stack messages.
    'stackError': 'Stack index out of range',
}
lang.update(settings.langfiles.common_eng.common)
