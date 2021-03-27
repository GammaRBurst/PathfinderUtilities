#!/usr/bin/env python3
# -*- coding: utf-8 -*-


__author__ = 'GammaRayBurst'
__version__ = '1.1'


import glob
import os
import readline  # noqa F401
import sys
import time
from typing import Dict, List, Tuple, Union

import matplotlib.pyplot as plt
from numpy import mean, std, histogram
from numpy.random import randint as rand, randn

from settings.modules import ansi
from settings.modules.common import wrap


# Important subroutines.
def prepare(
        dice: str,
        ) -> List[List[str]]:
    """Parse a string to extract the roll informations.

    Keyword arguments:
    dice -- A string containing the user's input

    This function returns a parsed list based on the input string.
    """
    dice_list = ['']
    for char in dice:
        if char == '+':
            dice_list.append('')
        elif char == '-' and dice_list[-1] != '':
            if (
                    len(dice_list[-1]) > 0 and
                    dice_list[-1][-1] in ['n', 'N', '^', '|']
                    ):
                dice_list[-1] += char
            else:
                dice_list.append(char)
        elif char in ['n', 'N', '^', '|']:
            dice_list.append(char)
        else:
            dice_list[-1] += char

    for die in dice_list:
        if '-' in die and 'd' in die:
            # Subtracting a die is not possible.
            return False

    dice_list2 = []
    for die in dice_list:
        # Separate every operator in every die.
        dice_list2.append([])
        dice_index = 0
        if (
                'd' not in die and
                ('n' in die or 'N' in die or '^' in die or '|' in die)
                ):
            dice_list2[-1].append(die)
        else:
            g = False  # Gaussian die.
            for i in range(len(die)):
                # Split the die string.
                if die[i] in ['m', 'M', 'b', 'w', '*', '/']:
                    if g:
                        # Add the number found after g operator to first
                        # element of the list.
                        dice_list2[-1][0] += die[dice_index: i]
                        g = False
                    else:
                        dice_list2[-1].append(die[dice_index: i])
                    dice_index = i
                elif die[i] == 'g':
                    dice_list2[-1].append(die[dice_index: i])
                    dice_index = i
                    g = True
            if g:
                # Add a number found after g operator to first element of the
                # list.
                dice_list2[-1][0] += die[dice_index:]
            else:
                dice_list2[-1].append(die[dice_index:])
    return dice_list2


def roll(
        dice: str,
        ) -> Union[bool, List[Union[int, float]]]:
    """Roll dice.

    Keyword arguments:
    dice -- A string containing the user's input

    This function rolls all the dice inputted by the user and returns the
    results of the roll.
    """
    try:
        dice_list = prepare(dice)
        min_dice, max_dice = get_extremes(dice_list, raw=False)
        dice_results = [[], []]
        operation_pos = {'n': -1, 'N': -1, '^': -1, '|': -1}
        operation_val = {'n': min_dice, 'N': max_dice, '^': 1, '|': 1}
        for die in dice_list:
            if die[0][0] not in ['n', 'N', '^', '|']:
                dice_results[0].append([])
                if 'd' in die[0]:
                    n, d = die[0].split('d')
                    n = int(n)
                    # Gaussian die.
                    if 'g' in d:
                        d, sigma = d.split('g')
                        d = int(d)
                        mu = (d + 1) / 2
                        if sigma != '':
                            sigma = float(sigma)
                        else:
                            sigma = (d - 1) * ((d + 1) / (3 * d)) ** 0.5 / 2
                        for i in range(n):
                            result = 0
                            while result < 0.5 or result > d + 0.5:
                                result = mu + sigma * randn()
                            dice_results[0][-1].append(int(round(result)))
                    # Equiprobable die.
                    else:
                        d = int(d)
                        for i in range(n):
                            result = rand(1, d + 1, dtype=int)
                            dice_results[0][-1].append(result)
                else:
                    n = 1
                    dice_results[0][-1].append(die[0])

                # Maximum and minimum modifiers.
                m = 0
                M = 0
                for chunk in die[1:]:
                    if chunk[0] == 'm':
                        m = int(chunk[1:])
                    elif chunk[0] == 'M':
                        M = int(chunk[1:])
                if m != 0 and M != 0 and (M < m or m > d or M < 1):
                    # Error if minimum value > maximum value.
                    return False

                dice_results[1].append([])
                if m > 0 or M > 0:
                    for i in range(len(dice_results[0][-1])):
                        # Maximum and minimum values.
                        if type(dice_results[0][-1][i]) == int:
                            if dice_results[0][-1][i] < m and m > 0:
                                dice_results[1][-1].append(m)
                            elif dice_results[0][-1][i] > M and M > 0:
                                dice_results[1][-1].append(M)
                            else:
                                dice_results[1][-1].append(
                                    dice_results[0][-1][i]
                                )
                        else:
                            return False
                else:
                    dice_results[1][-1] = dice_results[0][-1][:]

                # Best and worst modifiers
                b = 0
                w = 0
                for chunk in die[1:]:
                    if chunk[0] == 'b':
                        b = int(chunk[1:])
                    elif chunk[0] == 'w':
                        w = int(chunk[1:])
                if b > n or w > n:
                    # Error if there are too many dice.
                    return False
                if b == 0:
                    b = n
                if w == 0:
                    w = n

                if b >= w:
                    # Choose best and worst rolls.
                    for i in range(n - b):
                        dice_results[1][-1].remove(min(dice_results[1][-1]))
                    for i in range(b - w):
                        dice_results[1][-1].remove(max(dice_results[1][-1]))
                else:
                    for i in range(n - w):
                        dice_results[1][-1].remove(max(dice_results[1][-1]))
                    for i in range(w - b):
                        dice_results[1][-1].remove(min(dice_results[1][-1]))

                # Multiplication and division.
                mult = 1
                div = 1
                for chunk in die[1:]:
                    if chunk[0] == '*':
                        if '.' in chunk[1:]:
                            mult = float(chunk[1:])
                        else:
                            mult = int(chunk[1:])
                        for i in range(len(dice_results[1][-1])):
                            if type(dice_results[1][-1][i]) == str:
                                dice_results[1][-1][i] = \
                                    str(int(dice_results[1][-1][i]) * mult)
                            else:
                                dice_results[1][-1][i] *= mult
                            if (
                                    dice_results[1][-1][i] ==
                                    int(dice_results[1][-1][i])
                                    ):
                                dice_results[1][-1][i] = \
                                    int(dice_results[1][-1][i])
                    elif chunk[0] == '/':
                        if '.' in chunk[1:]:
                            div = float(chunk[1:])
                        else:
                            div = int(chunk[1:])
                        for i in range(len(dice_results[1][-1])):
                            if type(dice_results[1][-1][i]) == str:
                                dice_results[1][-1][i] = \
                                    str(int(dice_results[1][-1][i]) / div)
                            else:
                                dice_results[1][-1][i] /= div
                            if (
                                    dice_results[1][-1][i] ==
                                    int(dice_results[1][-1][i])
                                    ):
                                dice_results[1][-1][i] = \
                                    int(dice_results[1][-1][i])
            else:
                operation_pos[die[0][0]] = dice_list.index(die)
                if '.' in die[0][1:]:
                    operation_val[die[0][0]] = float(die[0][1:].strip())
                else:
                    operation_val[die[0][0]] = int(die[0][1:].strip())

        partial_result = sum_result(dice_results[1])
        if partial_result == int(partial_result):
            partial_result = int(partial_result)
        dice_results.append(partial_result)
        while len(operation_pos) > 0:
            min_pos = min(operation_pos.values())
            for operation in list(operation_pos.keys()):
                if operation_pos[operation] == min_pos:
                    if min_pos == -1:
                        operation_pos.pop(operation)
                    else:
                        if (
                                operation == 'n' and
                                partial_result < operation_val[operation]
                                ):
                            partial_result = operation_val[operation]
                        elif (
                                operation == 'N' and
                                partial_result > operation_val[operation]
                                ):
                            partial_result = operation_val[operation]
                        elif operation == '^':
                            partial_result *= operation_val[operation]
                        elif operation == '|':
                            partial_result /= operation_val[operation]
                        operation_pos.pop(operation)
        if partial_result == int(partial_result):
            partial_result = int(partial_result)
        dice_results.append(partial_result)
        return dice_results
    except Exception:
        return False


def pre_process(
        dice: str,
        ) -> None:
    """Process commands.

    Keyword arguments:
    dice -- A string containing the user's input

    This function processes all the commands inserted by the user.
    """

    def process_conditional(
            command: str,
            ) -> None:
        """Process conditional commands.

        Keyword arguments:
        command -- A string containing a conditional command
        """
        die, conditions = command.split('??', 1)
        conditions = \
            [condition.split('::') for condition in conditions.split('&&')]
        # Prepare repeated conditional rolls.
        if len(die.split('#')[0].split('x')) == 2:
            die, max_counter = die.split('#')[0].split('x')
            multiplier = 'x' + max_counter
            max_counter = int(max_counter)
        else:
            multiplier = ''
            max_counter = 1
        counter = 0
        # Repeat conditional rolls.
        while counter < max_counter:
            pre_process(die.replace(multiplier, '', 1))
            for condition in conditions:
                cond_test = test(stack[-1], condition[0].strip())
                if cond_test == -1:
                    break
                elif cond_test:
                    pre_process(condition[1].strip())
                    break
            if max_counter - counter > 1:
                print('')
            counter += 1
        return None

    def process_log(
            command: str,
            ) -> None:
        """Process log commands.

        Keyword arguments:
        command -- A string containing a log command
        """
        die = command.split('#')[0][4:].strip()
        # Activate log.
        if die.lower() == 'on':
            settings['logOn'] = True
            save_settings(settings)
            print(lang['logOn'] % (
                bg_green +
                settings['logFile'][:-4] +
                ansi.reset(on=settings['colorOn'])
            ))
        # Deactivate log.
        elif die.lower() == 'off':
            settings['logOn'] = False
            save_settings(settings)
            print(lang['logOff'])
        # Set a new log.
        elif die[:4].lower() == 'file':
            settings['logFile'] = die[5:].strip()
            # Add .log extension if necessary.
            if (
                    len(settings['logFile']) < 5 or
                    settings['logFile'][-4:] != '.log'
                    ):
                settings['logFile'] += '.log'
            save_settings(settings)
            print(lang['logSwitch'] % (
                bg_green +
                settings['logFile'][:-4] +
                ansi.reset(on=settings['colorOn'])
            ))
        # Wrong log command.
        else:
            error(command)
        return None

    def process_macro(
            command: str,
            ) -> None:
        """Process macro commands.

        Keyword arguments:
        command -- A string containing a macro command
        """
        global macro

        die = command.split('#')[0][6:].strip()
        # New macro.
        if die.lower().startswith('set'):
            macro_name, macro_dice = \
                command[6:].strip()[4:].strip().split(' ', 1)
            macro_dice = macro_dice.split(';')
            for i in range(len(macro_dice)):
                macro_dice[i] = macro_dice[i].split('#', 1)
                # Delete useless spaces.
                if len(macro_dice[i]) == 1:
                    macro_dice[i] = macro_dice[i][0].replace(' ', '')
                else:
                    macro_dice[i][0] = macro_dice[i][0].replace(' ', '')
                    macro_dice[i] = \
                        macro_dice[i][0] + ' #' + macro_dice[i][1].strip()
            macro_dice = ', '.join(macro_dice)
            # Overwrite existing macro.
            if macro_name in macro.keys():
                while True:
                    answer = input(lang['macroOver'])
                    answer = answer.lower()
                    if answer in lang['yes'] + ['']:
                        macro[macro_name] = macro_dice
                        save_macro(macro, macro_path + settings['macroFile'])
                        print(lang['macroAdded'] % (
                            ansi.fx(fgc='g', fgl=1, on=settings['colorOn']),
                            macro_name,
                            ansi.reset(on=settings['colorOn']))
                        )
                        break
                    elif answer in lang['no']:
                        print(lang['macroNotAdded'] % (
                            ansi.fx(fgc='r', fgl=1, on=settings['colorOn']),
                            macro_name,
                            ansi.reset(on=settings['colorOn']))
                        )
                        break
                    else:
                        continue
            # Save new macro.
            else:
                macro[macro_name] = macro_dice
                save_macro(macro, macro_path + settings['macroFile'])
                print(lang['macroAdded'] % (
                    ansi.fx(fgc='g', fgl=1, on=settings['colorOn']),
                    macro_name,
                    ansi.reset(on=settings['colorOn']))
                )
        # Delete macro, if it exists.
        elif die.lower().startswith('del'):
            macro_name = die[4:].strip()
            if macro_name in macro.keys():
                macro.pop(macro_name)
                save_macro(macro, macro_path + settings['macroFile'])
                print(lang['macroRemoved'] % (
                    ansi.fx(fgc='g', fgl=1, on=settings['colorOn']),
                    macro_name,
                    ansi.reset(on=settings['colorOn']))
                )
            else:
                print(lang['macroNotExisting'] % (
                    ansi.fx(fgc='r', fgl=1, on=settings['colorOn']),
                    macro_name,
                    ansi.reset(on=settings['colorOn']))
                )
        # List macro.
        elif die.lower().startswith('list'):
            macro_names = list(macro.keys())
            macro_names.sort()
            if len(macro_names) == 0:
                print(lang['macroEmpty'] % (
                    ansi.fx(fgc='r', fgl=1, on=settings['colorOn']),
                    ansi.reset(on=settings['colorOn']))
                )
            else:
                for name in macro_names:
                    print(
                        ansi.fx(fgc='b', on=settings['colorOn']) +
                        '  ' +
                        name +
                        ansi.reset(on=settings['colorOn']) +
                        ': ' +
                        macro[name]
                    )
        # Change macro file.
        elif die.lower().startswith('file'):
            settings['macroFile'] = die[5:].strip()
            # Add .macro extension, if necessary.
            if (
                    len(settings['macroFile']) < 7 or
                    settings['macroFile'][-6] != '.macro'
                    ):
                settings['macroFile'] += '.macro'
            macro = open_macro(macro_path + settings['macroFile'])
            save_settings(settings)
            print(lang['macroSwitch'] % (
                bg_green +
                settings['macroFile'][:-6] +
                ansi.reset(on=settings['colorOn']),
                len(macro))
            )
        else:
            error(command)
        return None

    def process_profile(
            command: str,
            ) -> None:
        """Process profile commands.

        Keyword arguments:
        command -- A string containing a profile command
        """
        global macro

        profile = command.split('#')[0][8:].strip()
        if profile.lower() == 'list':
            prof_files = glob.glob(os.path.join(log_path, '*.log'))
            prof_files.sort()
            for prof in prof_files:
                print(' ' + prof[:-4].replace(log_path, ''))
        else:
            settings['logFile'] = profile + '.log'
            settings['macroFile'] = profile + '.macro'
            macro = open_macro(macro_path + settings['macroFile'])
            save_settings(settings)
            print(lang['logSwitch'] % (
                bg_green +
                settings['logFile'][:-4] +
                ansi.reset(on=settings['colorOn']))
            )
            print(lang['macroSwitch'] % (
                bg_green +
                settings['macroFile'][:-6] +
                ansi.reset(on=settings['colorOn']),
                len(macro))
            )
        return None

    def process_language(
            command: str,
            ) -> None:
        """Process language commands.

        Keyword arguments:
        command -- A string containing a language command
        """
        die = command.split('#')[0][5:].strip()
        if die.lower().startswith('list'):
            lang_files = glob.glob(os.path.join(lang_path, '*.py'))
            lang_files.sort()
            for language in lang_files:
                if lang_path + lang_prefix in language:
                    print(
                        ' ' +
                        language[:-3].replace(lang_path + lang_prefix, '')
                    )
        elif die.lower().startswith('file'):
            language = die[5:].strip()
            try:
                exec(f'from {lang_pack}{language} import lang', globals())
                settings['lang'] = language
                save_settings(settings)
                print(lang['langSwitch'])
            except Exception:
                print(lang['langError'] % language)
        else:
            error(command)
        return None

    def process_verbose(
            command: str,
            ) -> None:
        """Process verbose commands.

        Keyword arguments:
        command -- A string containing a verbose command
        """
        die = command.split('#')[0][8:].strip()
        if die.lower().startswith('on'):
            settings['verboseOn'] = True
            save_settings(settings)
            print(lang['verboseOn'])
        elif die.lower().startswith('off'):
            settings['verboseOn'] = False
            save_settings(settings)
            print(lang['verboseOff'])
        else:
            error(command)
        return None

    def process_color(
            command: str,
            ) -> None:
        """Process color commands.

        Keyword arguments:
        command -- A string containing a color command
        """
        die = command.split('#')[0][6:].strip()
        if die.lower().startswith('on'):
            settings['colorOn'] = True
            save_settings(settings)
            print(lang['colorOn'])
        elif die.lower().startswith('off'):
            settings['colorOn'] = False
            save_settings(settings)
            print(lang['colorOff'])
        else:
            error(command)
        return None

    def process_help(
            command: str,
            ) -> None:
        """Process help commands.

        Keyword arguments:
        command -- A string containing a help command
        """
        help_key = die[5:].lower().strip()
        if help_key == 'rolls':
            str_help = 'helpRolls'
        elif help_key == 'cond':
            str_help = 'helpCond'
        elif help_key == 'stack':
            str_help = 'helpStack'
        elif help_key == 'color':
            str_help = 'helpColor'
        elif help_key == 'lang':
            str_help = 'helpLang'
        elif help_key == 'log':
            str_help = 'helpLog'
        elif help_key == 'macro':
            str_help = 'helpMacro'
        elif help_key == 'profile':
            str_help = 'helpProfile'
        elif help_key == 'verbose':
            str_help = 'helpVerbose'
        else:
            str_help = 'help'

        print(wrap(lang[str_help] % {
            'lc': ansi.fx(fgc='c', fgl=1, on=settings['colorOn']),
            'br': ansi.fx(fgc='r', fxs='b', on=settings['colorOn']),
            'blg': ansi.fx(fgc='g', fgl=1, fxs='b', on=settings['colorOn']),
            'lg': ansi.fx(fgc='g', fgl=1, on=settings['colorOn']),
            'b': ansi.fx(fxs='b', on=settings['colorOn']),
            'r': ansi.reset(on=settings['colorOn']),
            'prog': 'dice_roller',
        }))

    def process_test(
            command: str,
            ) -> None:
        """Process test commands.

        Keyword arguments:
        command -- A string containing a test command
        """
        repetitions = 10
        command = command[1:].strip()
        # Compose plot title.
        if '#' in command:
            die, comment = command.split('#', 1)
            orig_die = die.split('x')[0]
            die = die \
                .replace(' ', '') \
                .replace('%', '100') \
                .replace('**', '^') \
                .replace('//', '|') \
                .split('x')[0]
            title = f'{comment.strip()} [{orig_die}]'
        else:
            title = command.split('x')[0]
            die = command \
                .replace(' ', '') \
                .replace('%', '100') \
                .replace('**', '^') \
                .replace('//', '|') \
                .split('x')[0]
        counter = 0
        values = []
        tot_results = []
        min_dice, max_dice = get_extremes(die)
        throws = min([(max_dice - min_dice + 1) * 5000, 100000])
        bins = [min_dice + x for x in range(max_dice - min_dice + 2)]
        # Set of throws to study variance between sets.
        while counter < repetitions:
            result = []
            # Repeatedly throws dice to test their distribution.
            for i in range(throws):
                result.append(roll(die)[3])
            tot_results += result
            hist, bins2 = histogram(result, bins=bins, density=True)
            values.append(hist * 100)
            counter += 1
        results = [[] for x in range(len(values[0]))]
        for i in range(repetitions):
            for j in range(len(values[i])):
                results[j].append(values[i][j])
        hist = []
        sigma_b = []
        # Calculate mean value and standard deviation for every possible value.
        for result in results:
            hist.append(mean(result))
            sigma_b.append(std(result))
        mu_x = mean(tot_results)
        sigma_x = std(tot_results)
        mu_y = mean(hist)
        sigma_y = std(hist)
        plt.figure()
        plt.title(title)
        plt.xlabel(
            lang['testValue'] +
            fr'  ($\mu$ = {round(mu_x, 2)}, $\sigma$ = {round(sigma_x, 2)})'
        )
        plt.ylabel(
            lang['testFreq'] +
            fr' [%]  ($\mu$ = {round(mu_y, 2)}, ' +
            fr'$\sigma$ = {round(sigma_y, 2)})'
        )
        plt.bar(
            bins[:-1],
            hist,
            1,
            color=['#33CC33', '#55FF55'],
            yerr=sigma_b,
            ecolor='k'
        )
        plt.axis(xmin=min(bins) - 0.5, xmax=max(bins) - 0.5, ymin=0)
        # Add value labels if there are not too many bars.
        if len(bins) <= 30:
            for i in range(len(hist)):
                x = (bins[i] + bins[i + 1]) // 2
                percent = round(hist[i], 2)
                text = fr'{int(x)}: ({percent}$\pm${round(sigma_b[i], 2)})%'
                if percent < 0.35 * max(hist):
                    y = percent + 0.021 * max(hist)
                else:
                    y = 0.015 * max(hist)
                plt.text(
                    x + 0.2,
                    y,
                    text,
                    rotation='vertical',
                    rotation_mode='anchor',
                )
        return None

    def process_roll(
            command: str,
            ) -> None:
        """Process roll commands.

        Keyword arguments:
        command -- A string containing a roll command
        """
        if '#' in command:
            die, comment = command.split('#', 1)
            comment.strip()
        else:
            die = command
            comment = ''
        # Shouldn't find a macro at this point.
        if len(die) > 0 and die[0] == '@':
            error(die[1:], lang['macroError'])
            return
        orig_die = die
        die = die \
            .replace(' ', '') \
            .replace('%', '100') \
            .replace('**', '^') \
            .replace('//', '|')
        # Formats output string.
        if comment:
            title = f'{comment} ({orig_die.split("x")[0].strip()})'
        else:
            title = orig_die.split('x')[0].strip()
        # Prepare repeated rolls.
        if len(die.split('x')) == 2:
            die, max_counter = die.split('x')
            max_counter = int(max_counter)
        else:
            max_counter = 1
        counter = 0
        while counter < max_counter:
            temp_die = die
            while '{' in temp_die and '}' in temp_die:
                curly = temp_die[temp_die.index('{'): temp_die.index('}') + 1]
                pos = int(curly[1:-1])
                if pos > 0:
                    pos -= 1
                try:
                    temp_die = temp_die.replace(curly, str(stack[pos]))
                except IndexError:
                    error(temp_die, lang['stackError'])
                    return
            dice_results = roll(temp_die)
            if dice_results:
                stack.append(dice_results[3])
                output_num = \
                    ' ' + \
                    ansi.fx(fgc='g', fgl=1, on=settings['colorOn']) + \
                    f'{{{len(stack)}}}' + \
                    ansi.reset(on=settings['colorOn']) + \
                    ' '
                output = title + ': '
                if (
                        dice_results[0] == dice_results[1] and
                        format_dice(dice_results[0]) or
                        not settings['verboseOn']
                        ):
                    output += format_dice(dice_results[1])
                else:
                    output += \
                        format_dice(dice_results[0]) + \
                        ' --> ' + \
                        format_dice(dice_results[1])
                if (
                        dice_results[2] == dice_results[3] or
                        not settings['verboseOn']
                        ):
                    output += f' --> {dice_results[3]}'
                else:
                    output += f' --> {dice_results[2]} --> {dice_results[3]}'
                print(output_num + output)
                if settings['logOn']:
                    log_file = open(log_path + settings['logFile'], 'a')
                    log_file.write(
                        time.strftime('%d/%m/%Y %H:%M:%S') +
                        '\t' +
                        output.strip() +
                        '\n'
                    )
                    log_file.flush()
                    log_file.close()
            else:
                error(die)
            counter += 1
        return None

    # Replace macros with the actual rolls.
    for m in macro.keys():
        position = 0
        for i in range(dice.count('@' + m)):
            macro_name = dice[dice[position:].find('@' + m):] \
                .split(',')[0] \
                .split('#')[0]
            # Replace parameters in macro.
            params = macro_name.replace('@' + m, '').strip()[1:-1].split('][')
            position = dice[position:].find('@' + m) + 1
            subst = macro[m]
            for param in params:
                if param != '':
                    param_name, param_value = param.split('=', 1)
                    subst = subst.replace('[' + param_name + ']', param_value)
                    while '[' + param_name + '=' in subst:
                        pos1 = subst.find('[' + param_name + '=')
                        pos2 = subst[pos1:].find(']') + pos1 + 1
                        subst = subst.replace(subst[pos1: pos2], param_value)
            while '[' in subst:
                pos1 = subst.find('[')
                pos2 = subst[pos1:].find(']') + pos1 + 1
                if '=' in subst[pos1: pos2]:
                    subst = subst.replace(
                        subst[pos1: pos2],
                        subst[pos1 + 1: pos2 - 1].split('=', 1)[1],
                    )
                else:
                    subst = subst.replace(subst[pos1: pos2], '0')
            dice = dice.replace(macro_name, subst)

    # Parse every roll.
    plots = False
    for die in dice.split(','):
        try:
            die = die.strip()
            # Conditional roll.
            if (
                    die.count('??') > 0 and
                    die.count('::') > 0 and
                    not die.lower().startswith('macro')
                    ):
                process_conditional(die)
            # Log commands.
            elif die.lower().startswith('log'):
                process_log(die)
            # Macro commands.
            elif die.lower().startswith('macro'):
                process_macro(die)
            # Profile commands.
            elif die.lower().startswith('profile'):
                process_profile(die)
            # Language commands.
            elif die.lower().startswith('lang'):
                process_language(die)
            # Verbose commands.
            elif die.lower().startswith('verbose'):
                process_verbose(die)
            # Color commands.
            elif die.lower().startswith('color'):
                process_color(die)
            # Help commands.
            elif die.lower().startswith('help'):
                process_help(die)
            # Settings commands.
            elif die.lower() in ['settings', 's']:
                print(lang['langName'])
                get_settings()
            # Exit commands.
            elif die.lower() in ['exit', 'q', 'quit']:
                print(lang['goodbye'] + '!\n')
                raise SystemExit
            # Copyright commands.
            elif die.lower() in ['c', 'copyright']:
                print(wrap(lang['copyright'] % '2015'))
            # Changelog commands.
            elif die.lower() == 'changelog':
                print(wrap(lang['changelog'] % {
                    'bb': ansi.fx(fgc='b', fxs='b', on=settings['colorOn']),
                    'r': ansi.reset(on=settings['colorOn'])
                }))
            # Version commands.
            elif die.lower() in ['v', 'version']:
                print(wrap(lang['version'] % ('dice_roller', __version__)))
            # Empty commands (feed new line).
            elif die == '':
                continue
            # Comment line.
            elif die[0] == '#':
                print(f'    {die[1:].strip()}')
            # Probability distribution tester.
            elif die[0] == 't':
                process_test(die)
                plots = True
            # Roll dice.
            else:
                process_roll(die)
        except KeyboardInterrupt:
            error(die, lang['interrupted'])
        except SystemExit:
            sys.exit()
        except Exception:
            error(die)
    # Show plots all together.
    if plots:
        plt.show()


def test(
        number: Union[int, float],
        condition: str,
        ) -> Union[bool, int]:
    """Test if a number observes a condition.

    Keyword arguments:
    number -- A number
    condition -- A string that begins with a binary comparison operator
                 (<=, >=, <, >, !=, =), followed by a number

    This function returns True if the number observes a condition, False if it
    doesn't, and -1 if the condition is not parseable.
    """
    condition = condition.strip()
    if condition == '':
        return True
    elif condition.startswith('>='):
        return number >= float(condition[2:].strip())
    elif condition.startswith('<='):
        return number <= float(condition[2:].strip())
    elif condition.startswith('!='):
        return number != float(condition[2:].strip())
    elif condition.startswith('>'):
        return number > float(condition[1:].strip())
    elif condition.startswith('<'):
        return number < float(condition[1:].strip())
    elif condition.startswith('='):
        return number == float(condition[1:].strip())
    else:
        error(condition, lang['conditionError'])
        return -1


def sum_result(
        dice_results: List[Union[int, str]],
        ) -> int:
    """Sum the result of dice rolls.

    Keyword arguments:
    dice_results -- A list of results

    This function returns the sum of all results.
    """
    result = 0
    for die in dice_results:
        if len(die) == 1 and type(die[0]) == str:
            result += int(die[0])
        else:
            result += sum(die)
    return result


def error(
        command: str,
        reason: str = '',
        ) -> None:
    """Print an error message.

    Keyword arguments:
    command -- A string containing the user's input
    reason -- An explanation of what went wrong
    """
    if reason:
        print(
            f'    {command}: ' +
            ansi.fx(bgc='r', bgl=1, on=settings['colorOn']) +
            f'{reason}!' +
            ansi.reset(on=settings['colorOn'])
        )
    else:
        print(
            f'    {command}: ' +
            ansi.fx(bgc='r', bgl=1, on=settings['colorOn']) +
            f'{lang["error"]}!' +
            ansi.reset(on=settings['colorOn'])
        )
    return None


def get_extremes(
        dice: Union[str, List[str]],
        raw: bool = True,
        ) -> Tuple[Union[int, float], Union[int, float]]:
    """Get minimum and maximum values of a dice roll.

    Keyword arguments:
    dice -- Either the raw string submitted by the user, or a parsed list
    raw -- Determines if dice is a raw string or a parsed list
    """
    # Initial setup.
    if raw:
        dice_list = prepare(dice)
    else:
        dice_list = dice
    min_result = 0
    max_result = 0
    min_dice = 0
    max_dice = 0
    factor = 1
    divider = 1
    n = False
    N = False

    # Analize every die.
    for die in dice_list:
        if 'd' in die[0]:
            amount, value = die[0].split('d')
            # Remove Gaussian modifier, it's useless here.
            value = value.split('g')[0]
            amount = int(amount)
            min_temp = 1
            max_temp = int(value)
            for chunk in die[1:]:
                if '.' in chunk[1:]:
                    n = float(chunk[1:])
                else:
                    n = int(chunk[1:])
                if 'b' in chunk:
                    if amount > n:
                        amount = n
                elif 'w' in chunk:
                    if amount > n:
                        amount = n
                elif 'm' in chunk:
                    min_temp = max(1, n)
                elif 'M' in chunk:
                    max_temp = min(n, max_temp)
                elif '*' in chunk:
                    min_temp *= n
                    max_temp *= n
                elif '/' in chunk:
                    min_temp /= n
                    max_temp /= n
            min_result += amount * min_temp
            max_result += amount * max_temp
        elif die[0][0] == 'n':
            min_dice = int(die[0][1:])
            n = True
        elif die[0][0] == 'N':
            max_dice = int(die[0][1:])
            N = True
        elif die[0][0] == '^':
            if '.' in die[0][1:]:
                factor = float(die[0][1:])
            else:
                factor = int(die[0][1:])
            min_result *= factor
            max_result *= factor
            if n:
                min_dice *= factor
            if N:
                max_dice *= factor
        elif die[0][0] == '|':
            if '.' in die[0][1:]:
                divider = float(die[0][1:])
            else:
                divider = int(die[0][1:])
            min_result /= divider
            max_result /= divider
            if n:
                min_dice /= divider
            if N:
                max_dice /= divider
        else:
            min_result += int(die[0])
            max_result += int(die[0])
    if n:
        min_result = max([min_result, min_dice])
    if N:
        max_result = min([max_result, max_dice])

    if type(min_result) == float:
        min_result = int(min_result)
    if type(max_result) == float:
        if int(max_result) != max_result:
            max_result = int(max_result) + 1
        else:
            max_result = int(max_result)
    return min_result, max_result


def save_macro(
        macro_dict: Dict[str, str],
        macro_path: str,
        ) -> None:
    """Write a macro file.

    Keyword arguments:
    macro_dict -- A dict containing macros
    macro_path -- The path to the macro file
    """
    macro_names = list(macro_dict.keys())
    macro_names.sort()
    output = ''
    for name in macro_names:
        output += f'{name} {macro_dict[name]}\n'
    with open(macro_path, 'w') as macro_file:
        macro_file.write(output.strip())
    return None


def format_dice(
        dice_results: List[Union[str, int, float]],
        ) -> str:
    """Prepare a dice roll result to be printed.

    Keyword arguments:
    dice_results -- A list of results

    This function returns the result of a roll displayed in a pleasant form.
    """
    output = ''
    for result in dice_results:
        if len(result) == 1 and type(result[0]) == str:
            output += result[0] + '+'
        elif all(isinstance(x, (int, float)) for x in result):
            output += '['
            for chunk in result:
                output += f'{chunk} '
            output = f'{output[:-1]}]+'
        else:
            return False
    return output[:-1].replace('+-', '-').strip()


def open_macro(
        macro_path: str,
        ) -> Dict[str, str]:
    """Read a macro file.

    Keyword arguments:
    macro_path -- The path to the macro file

    This function returns a dict containing all the stored macros with their
    names as keys.
    """
    try:
        with open(macro_path, 'r') as macro_file:
            macro_dict = {}
            for line in macro_file.readlines():
                key, value = line.strip().split(' ', 1)
                macro_dict[key] = value
    except OSError:
        # Macro file does not exist.
        macro_dict = {}
    return macro_dict


def save_settings(
        settings: Dict[str, Union[bool, int, str]],
        ) -> None:
    """Save settings to file.

    Keyword arguments:
    settings -- A dict containing all the settings.
    """
    with open(settings_path, 'w') as settings_file:
        keys = list(settings.keys())
        keys.sort()
        for key in keys:
            if type(settings[key]) == bool:
                settings_file.write(f'{key}={int(settings[key])}\n')
            else:
                settings_file.write(f'{key}={settings[key]}\n')
    return None


def get_settings() -> None:
    """Read settings from file."""
    if settings['logOn']:
        print(lang['logOn'] % (
            bg_green +
            settings['logFile'][:-4] +
            ansi.reset(on=settings['colorOn'])
        ))
    else:
        print(lang['logOff'])

    print(lang['macroStart'] % (
        bg_green +
        settings['macroFile'][:-6] +
        ansi.reset(on=settings['colorOn']),
        len(macro))
    )

    if settings['verboseOn']:
        print(lang['verboseOn'])
    else:
        print(lang['verboseOff'])

    if settings['colorOn']:
        print(lang['colorOn'])
    else:
        print(lang['colorOff'])
    return None


dice = ''
lang = {}  # Placeholder, to explicitly declare the variable.
script_path = os.path.dirname(os.path.abspath(__file__))
settings_path = script_path + '/settings/sys/dice.settings'
lang_path = script_path + '/settings/langfiles/'
log_path = script_path + '/settings/dice_roller/log/'
macro_path = script_path + '/settings/dice_roller/macro/'
lang_prefix = 'dr_'
lang_pack = 'settings.langfiles.' + lang_prefix
stack = []

# Settings initialization.
try:
    with open(settings_path, 'r') as settings_file:
        settings = {}
        for line in settings_file.readlines():
            key, value = line.strip().split('=')
            if key.endswith('On'):
                value = bool(int(value))
            settings[key] = value
        if len(settings['lang']) > 3:
            settings['lang'] = settings['lang'][0:3]
except OSError:
    # Settings file does not exist.  Write a new default settings file.
    with open(settings_path, 'w') as settings_file:
        settings_file.write("""lang=eng
logOn=0
log_file=dice.log
macroFile=dice.macro
verboseOn=1
colorOn=1""")
        settings = {
            'lang': 'eng',
            'logOn': False,
            'verboseOn': True,
            'colorOn': True,
            'logFile': 'dice.log',
            'macroFile': 'dice.macro',
        }

exec(f'from {lang_pack}{settings["lang"]} import lang', globals())
macro = open_macro(macro_path + settings['macroFile'])
bg_green = ansi.fx(bgc='g', fgl=1, on=settings['colorOn'])

print(wrap(
    ansi.clear(on=settings['colorOn']) +
    lang['welcome'] % (
        'dice_roller',
        __version__,
        '"help", "copyright" or "changelog"',
    )
))
get_settings()
print('')

while True:
    try:
        dice = input(lang['prompt'] % (
            ansi.fx(fgc='c', fgl=1, esc=1, on=settings['colorOn']),
            ansi.reset(esc=1, on=settings['colorOn'])
        ))
        pre_process(dice)
        print('')  # Add an empty line after a list of rolls.
    except EOFError:
        print('\n' + lang['goodbye'] + '!\n')
        sys.exit()
    except KeyboardInterrupt:
        print('')
        continue
