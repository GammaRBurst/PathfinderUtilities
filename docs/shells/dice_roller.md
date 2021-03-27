# Dice Roller

Dice Roller is a program that can make any kind of dice roll, even the most complex.

## Syntax
At its core, a dice roll is composed by the number of dice you want to roll, and the number of sides each die has. This is expressed using the common syntax `NdK`, to roll *N* *K*-sided dice. It's not necessary that the die actually exists in real life, e.g. it's possible to roll *1d5*. Each outcome is always equiprobable, with a probability of 1/K. Loaded dice can be obtained using conditional rolls (see below).

Percentile dice, i.e. *1d100*, can be written as *1d%* as well.

### Single-Die Operators
The following operators have to be written directly after the dice, in any order. They can be combined in any way, as long as it's meaningful.
* __Gaussian dice__: Adding a `g` after the dice makes them Gaussian. This means that the central values have a higher probability than the extreme values. E.g. *1d20g* produces a roll there the values 10 and 11 have the highest probability, and 1 and 20 the lowest. In general the probability follows the so-called bell curve. It is possible to specify a standard deviation after the `g` as an integer or a decimal number. A small standard deviation means the bell curve is very narrow. The default standard deviation is given by the formula `(N-1) sqrt((N+1) / 3N) / 2`, where *N* is the die's number of sides. The formula has no special meaning, except for the fact that it gives nice results.
* __Minimum and Maximum values__: `m` sets a minimum value for each die, while `M` sets a maximum value. Any die that rolls a result lower than the minimum or higher than the maximum is corrected. E.g. *1d20m4* rolls one d20 and brings and results under 4 to 4, the minimum value. This is different from *1d17+3* (see below for the sum operator), because in the first case every outcome has a probability of 1/20, except 4 that has a probability of 4/20, while in the second every outcome has a probability of 1/17.
* __Best and Worst throws__: `b` selects only the best results in a set of rolls, while `w` selects the worst ones. These two operators don't actually act on single dice, but on a single dice group. E.g. *4d6b3* rolls four d6, and selects only the best three.
* __Multiplication and Division__: `*` multiplies each die by the given amount, while `/` divides each die by the given amount. Numbers can be either integers or decimals. If the number after the division sign is integer, then the result will be rounded down, if necessary, for each die, before summing them. If the rounding is not desired, it's sufficient to add a decimal point after the divisor.

### Sum of Dice
It is possible to sum different dice, such as *1d4+1d6*, as well as add and subtract a constant from a dice roll, e.g. *1d12+5*. It is not possible to subtract one roll from another one (not directly at least, see stack below).

### Global Operators
The following operators will be applied in the order they are written. In general they are not commutative.
* __Minimum and Maximum total values__: `n` sets the minimum total value of a roll, while `N` sets the total maximum value. These operators are analogous to `m` and `M`, but they are applied to the final result, not to each die.
* __Global Multiplication and Division__: `**` multiplies the result of a roll by the given number, while `//` divides the result by the given number. The same rules for multiplication and division apply here.

### Repeated Rolls
Adding `x` followed by a number repeats the same roll by the given amount. E.g. *4d6b3 x6* rolls six times four 6-sided dice and chooses each time the best three.

### Comments
It is possible to add comments after a dice roll by writing `#` and the comment afterwards. The comment will be used as a title for the roll. This is particularly useful for complex rolls and macros, as well as if you need to check the log often (see below).

### Concatenation
Rolls can be concatenated on the same line by separating them with a comma (*,*). The rolls will be executed in the given order.

## Test Rolls
Each roll can be tested, to check the actual randomness of the random number generator, or to determine the shape of the probability distribution. Just add `t` in front of a roll to see a plot of its probability distribution. The `x` operator will be ignored. Conditional rolls (see below) are not available for tests as well.

__Warning__: Testing a roll may take some time, depending on your computer.

As long as the plot window is open, it's not possible to roll other dice. To test more than one roll at the same time, it's possible to concatenate tests.

## Conditional Rolls
Sometimes a simple roll is not enough. Sometimes the situation requires making a decision based on one roll. A good example could be an attack roll: if the value is too low the attack fails, if it's high enough it hits, and if it's very high it's a critical hit.

The syntax for conditional rolls is as follows:

    First throw ?? Condition 1 :: Consequence 1 && ... && :: Last consequence

The first throw can be any valid throw, as described above. Its result will be tested through the various conditions. Using the `x` operator in the first throw repeats the conditional tests as well.

Conditions are simple comparisons. They are composed of one comparison operator (= < > <= >= !=), followed by a number. If no condition is given, this counts as an **else** statement, i.e. it matches everything else not intercepted by previous conditions. Only the first true condition met counts, so for example

    1d6 ?? <= 3 :: 1d20 && <= 5 :: 2d10 && :: 2d20

will roll 1d20 if the first throw results in 1, 2 or 3, even if these outcomes qualify for the second condition as well. For this reason the **else** statement should always be the last.

If no condition is met, no roll is executed.

Consequences are any kind of rolls, even tests. They are executed if the corresponding condition is met. Consequences can't be other conditional rolls, but they can be macros (see below). This helps circumvent this necessary limitation and keeps the roll cleaner.

Example: loaded d6

    1d100 ?? <= 40 :: 1 && <= 60 :: 2 && <= 75 :: 3 && <= 85 :: 4 && <= 95 :: 5 && :: 6

This results in 1 with a probability of 40%, 2 with probability 20%, 3 at 15%, 4 and 5 at 10% each and 6 at 5%.

## Macros
Dice Roller offers the option to store dice rolls in memory, so that they can be used any time it's needed by just writing *@* followed by the macro name.

To set a new macro, or overwrite an old one, write `macro set` followed by the macro name and the roll. If the macro has to contain concatenated rolls, they have to be separated by *;* instead of a comma. A comma would mean the macro assignment is finished, and a new command follows.

It is possible to store macros with parameters. They are declared as a name enclosed in square brackets. E.g. `macro set attack 1d20+[bonus]` creates a macro called *attack*, that has a parameter called *bonus*. The macro can be called with `@attack[bonus = 5]`. It is also possible to set a default value for a parameter when the macro is declared. Simply add an = sign followed by the default value. The default value, as well as the value used when calling the macro, can be a number, a dice roll, or even another macro.

Macros can be deleted with `macro del` followed by the macro name.

Finally, it is possible to obtain a list of all macros with the command `macro list`. This list shows all the macro names, followed by the associated roll.

## Log and Profile
If Dice Roller is used for more than one campaign, it can be interesting to have different profiles. A profile includes its own log and its own macro list. To switch profile, or to create a new one, just write `profile` followed by the profile name.

It is also possible to switch the log and the macro list separately with the commands `log file` and `macro file` respectively, followed by the file name. These files can be found in the `settings/dice_roller` directory.

A log is a collection of all the rolls executed. Every line starts with the date (DD.MM.YYYY format) and hour or the roll, followed by the command inserted and the result.

## Other Options

### Verbose option

It is possible to set the level of detail of each throw. With `verbose off` only the selected dice results and the final outcome are shown, while with `verbose on` up to two intermediate steps are shown, depending on the situation. E.g. the throw *4d6 b3 N7* with the verbose option on could show

    [5 1 3 3] --> [5 3 3] --> 11 --> 7

while with the verbose option off it would show just

    [5 3 3] --> 7

In the first version the value of the discarded die is visible (1), as well as the intermediate result of 11, that is then brought to the maximum value of 7.

### Stack

During a session Dice Roller labels each roll with a unique number, starting from 1. It is possible to recall previous results by enclosing the result number in curly braces. So e.g. `{3}` will be replaced with the result of the third roll.

It is also possible to recall results starting from the end. This is done using negative numbers. `{-1}` recalls the last result, `{-2}` the second-to-last, and so on. This is obviously always a different number, so use it carefully.

