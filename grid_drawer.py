#!/usr/bin/env python3
# -*- coding: utf-8 -*-


__author__ = 'GammaRayBurst'
__version__ = '1.0'


import glob
import os
import readline  # noqa F401
import sys
from itertools import product
from typing import Dict, Union

from settings.modules import ansi
from settings.modules.common import wrap


# Important subroutines.
def pre_process(
        grids: str,
        ) -> None:
    """Process commands.

    Keyword arguments:
    grids -- A string containing the user's input

    This function processes all the commands inserted by the user.
    """

    def process_language(
            command: str,
            ) -> None:
        """Process language commands.

        Keyword arguments:
        command -- A string containing a language command
        """

        # Remove "lang " at the beginning and comments.
        lang_command = command.split('#')[0][5:].strip()

        # List installed languages.
        if lang_command.lower().startswith('list'):
            lang_files = glob.glob(os.path.join(lang_path, '*.py'))
            lang_files.sort()
            for language in lang_files:
                if lang_path + lang_prefix in language:
                    lang_code = \
                        language[:-3].replace(lang_path + lang_prefix, '')
                    print(f' {lang_code}')
        # Change language.
        elif lang_command.lower().startswith('file'):
            language = lang_command[5:].strip()
            try:
                exec(f'from {lang_pack}{language} import lang', globals())
                settings['lang'] = language
                save_settings(settings)
                print(lang['langSwitch'])
            except ImportError:
                print(lang['langError'] % language)
        # Unrecognized command.
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

        # Remove "color " at the beginning and comments.
        color_command = command.split('#')[0][6:].strip()

        # Activate colored text.
        if color_command[:2].lower() == 'on':
            settings['colorOn'] = True
            save_settings(settings)
            print(lang['colorOn'])
        # Deactivate colored text.
        elif color_command[:3].lower() == 'off':
            settings['colorOn'] = False
            save_settings(settings)
            print(lang['colorOff'])
        # Unrecognized command.
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
        # Remove "help " at the beginning and comments.
        help_command = command.split('#')[0][4:].strip()

        # Choose the correct help message.
        if help_command.lower().strip() == 'grid':
            str_help = 'helpGrid'
        elif help_command.lower().strip() == 'color':
            str_help = 'helpColor'
        elif help_command.lower().strip() == 'lang':
            str_help = 'helpLang'
        else:
            str_help = 'help'

        # Print the help message.
        print(wrap(
            lang[str_help] % {
                'lc': ansi.fx(fgc='c', fgl=1, on=settings['colorOn']),
                'br': ansi.fx(fgc='r', fxs='b', on=settings['colorOn']),
                'blg':
                    ansi.fx(fgc='g', fgl=1, fxs='b', on=settings['colorOn']),
                'lg': ansi.fx(fgc='g', fgl=1, on=settings['colorOn']),
                'b': ansi.fx(fxs='b', on=settings['colorOn']),
                'r': ansi.reset(on=settings['colorOn']),
                'prog': 'grid_drawer',
            }
        ))

    def process_grid(
            command: str,
            ) -> None:
        """Process grid commands.

        Keyword arguments:
        command -- A string containing a grid command
        """
        def xml_line(
                x1: float,
                y1: float,
                x2: float,
                y2: float,
                ) -> str:
            """Create the text for an SVG line.

            Keyword arguments:
            x1, y1, x2, y2 -- Coordinates of the initial and final points of
                              the line segment

            This function returns the XML code for an SVG line.
            """
            return (
                f'\t\t\t<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" ' +
                'style="stroke:#777777;stroke-width:1px;" />\n'
            )

        def xml_label(
                x: float,
                y: float,
                font_size: int,
                label: Union[int, str],
                ) -> str:
            """Create the text for an SVG line.

            Keyword arguments:
            x, y -- Coordinates of the text label
            font_size -- A number of pixels
            label -- The actual text to be displayed

            This function returns the XML code for an SVG text label.
            """
            return (
                f'\t\t\t<text x="{x}" y="{y}" ' +
                f'style="font-size:{font_size}px;' +
                f'font-family:sans-serif;fill:#000000;">{label}</text>\n'
            )

        # Parsing the user input.
        letters = 'ABCDEFGHKLMNPQRSTUVWXYZ'
        if len(command.split(' ')) == 4:
            width, height, side, file_name = command.split(' ')
            side = float(side.strip())
        elif len(command.split(' ')) == 3:
            width, height, file_name = command.split(' ')
            side = 40
        else:
            error(command)
            return None
        if (
                int(width) != float(width) or
                int(width) > len(letters) + len(letters) ** 2
                ):
            error(
                command,
                lang['gridWidthError'] % str(len(letters) + len(letters) ** 2),
            )
            return None
        else:
            width = int(width.strip())
        if int(height) != float(height) or int(height) >= 100:
            error(command, lang['gridHeightError'] % '99')
            return None
        else:
            height = int(height.strip())
        file_name = file_name.strip()
        if file_name.split('.')[-1] != 'svg':
            file_name += '.svg'
        complete_file_name = grids_path + file_name.strip()

        overwrite = True
        if os.path.isfile(complete_file_name):
            while True:
                answer = input(lang['gridOver'])
                answer = answer.lower()
                if answer in lang['yes'] + ['']:
                    break
                elif answer in lang['no']:
                    overwrite = False
                    break
                else:
                    continue

        # File creation.
        if overwrite:
            with open(complete_file_name, 'w') as f:
                img_width = (width + 2) * side + 40
                img_height = (height + 2) * side + 40
                # XML declaration and svg tag.
                f.write(
                    '<?xml version="1.0" encoding="UTF-8"?>\n' +
                    f'<svg width="{img_width}" height="{img_height}">\n' +
                    '\t<g>\n' +
                    '\t\t<g>\n'
                )

                # Horizontal lines of the grid.
                for i in range(height + 1):
                    y = 20 + side * (i + 1)
                    f.write(xml_line(20, y, (width + 2) * side + 20, y))

                # Vertical lines of the grid.
                for i in range(width + 1):
                    x = 20 + side * (i + 1)
                    f.write(xml_line(x, 20, x, (height + 2) * side + 20))
                f.write('\t\t</g>\n\t\t<g>\n')

                # Numerical vertical labels, left and right of the grid.
                font_size = 2 * side // 3
                for i in range(height):
                    x1 = 25 - 2 * font_size * (len(str(i + 1)) - 1) // 5
                    x2 = \
                        img_width - 20 - font_size * (len(str(i + 1)) + 4) // 5
                    y = 13 + side * (i + 2)
                    f.write(xml_label(x1, y, font_size, i + 1))
                    f.write(xml_label(x2, y, font_size, i + 1))

                # Alphabetical horizontal label, above and below the grid.
                if width <= len(letters):
                    # Only single-letter labels.
                    for i in range(width):
                        x = 20 + side * (i + 1.25)
                        y1 = 10 + side
                        y2 = img_height - 20 - 3 * (side - 10) // 10
                        f.write(xml_label(x, y1, font_size, letters[i]))
                        f.write(xml_label(x, y2, font_size, letters[i]))
                else:
                    # Single- and double-letter labels.
                    for i in range(len(letters)):
                        x = 20 + side * (i + 1.25)
                        y1 = 10 + side
                        y2 = img_height - 20 - 3 * (side - 10) // 10
                        f.write(xml_label(x, y1, font_size, letters[i]))
                        f.write(xml_label(x, y2, font_size, letters[i]))
                    # A different cycle is needed because a double-letter
                    # label has to be positioned differently.
                    letters2 = list(product(letters, repeat=2))
                    for i in range(width - len(letters)):
                        x = 21 + side * (i + len(letters) + 1)
                        y1 = 10 + side
                        y2 = img_height - 20 - 3 * (font_size) // 10
                        label = ''.join(letters2[i])
                        f.write(xml_label(x, y1, font_size, label))
                        f.write(xml_label(x, y2, font_size, label))

                f.write('\t\t</g>\n\t</g>\n</svg>')
            print(lang['gridComplete'] % file_name)
        else:
            print(lang['gridAbort'] % file_name)
        return None

    for grid in grids.split(','):
        try:
            grid = grid.strip()
            # Language commands.
            if grid.lower().startswith('lang '):
                process_language(grid)
            # Color commands.
            elif grid.lower().startswith('color '):
                process_color(grid)
            # Help commands.
            elif grid.lower().startswith('help'):
                process_help(grid)
            # Settings commands.
            elif grid.lower() in ['settings', 's']:
                print(lang['langName'])
                get_settings()
            # Exit commands.
            elif grid.lower() in ['exit', 'q', 'quit']:
                print(lang['goodbye'] + '!\n')
                raise SystemExit
            # Copyright commands.
            elif grid.lower() in ['copyright', 'c']:
                print(wrap(lang['copyright'] % '2017'))
            # Version commands.
            elif grid.lower() in ['version', 'v']:
                print(wrap(lang['version'] % ('grid_drawer', __version__)))
            # Empty command (feeds new line).
            elif grid == '':
                continue
            # Draw grid.
            else:
                process_grid(grid)
        except KeyboardInterrupt:
            error(grid, lang['interrupted'])
        except SystemExit:
            sys.exit()
        except Exception:
            error(grid)


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
    if settings['colorOn']:
        print(lang['colorOn'])
    else:
        print(lang['colorOff'])
    return None


grids = ''
lang = {}  # Placeholder, to explicitly declare the variable.
script_path = os.path.dirname(os.path.abspath(__file__))
settings_path = script_path + '/settings/sys/grid.settings'
lang_path = script_path + '/settings/langfiles/'
grids_path = script_path + '/saves/'
lang_prefix = 'gd_'
lang_pack = 'settings.langfiles.' + lang_prefix

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
        settings_file.write('lang=eng\ncolorOn=1')
        settings = {'lang': 'eng', 'colorOn': True}

exec(f'from {lang_pack}{settings["lang"]} import lang', globals())
bg_green = ansi.fx(bgc='g', fgl=1, on=settings['colorOn'])

print(wrap(
    ansi.clear(on=settings['colorOn']) +
    lang['welcome'] % ('grid_drawer', __version__, '"help" or "copyright"')
))
get_settings()
print('')

# Main loop.
while True:
    try:
        grids = input(lang['prompt'] % (
            ansi.fx(fgc='c', fgl=1, esc=1, on=settings['colorOn']),
            ansi.reset(esc=1, on=settings['colorOn']),
        ))
        pre_process(grids)
        print('')  # Add an empty line after a grid generation.
    except EOFError:
        print('\n' + lang['goodbye'] + '!\n')
        sys.exit()
    except KeyboardInterrupt:
        print('')
        continue
