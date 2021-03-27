# -*- coding: utf-8 -*-
"""Module for ANSI character management."""


__all__ = [
    'reset',
    'fx',
    'clear',
]
__version__ = '1.0'
__author__ = 'GammaRayBurst'


from typing import List


def reset(
        esc: bool = False,
        on: bool = True,
        ) -> str:
    """Resets every setting (fxs, background color, foreground color)."""
    if on:
        if esc:
            return '\x01\033[0m\x02'
        else:
            return '\033[0m'
    else:
        return ''


def fx(
        bgc: str = '',
        fgc: str = '',
        fxs: List[str] = [],
        bgl: bool = False,
        fgl: bool = False,
        stack: bool = False,
        esc: bool = False,
        on: bool = True,
        ) -> str:
    """Create ANSI codes for colored text.

    Keyword arguments:
    bgc -- String describing the background color
    fgc -- String describing the foreground color
    fxs -- String describing the text effects
    bgl -- Use lighter background colors
    fgl -- Use lighter foreground colors
    stack -- If possible, add fxs to already existing ones
    esc -- Add special characters around the ANSI options.
           Sometimes it's useful for correct line wrapping.
    on -- Activate ANSI code.

    Accepted color values for bgc and fgc:
        k: black
        b: blue
        c: cyan
        g: green
        m: magenta
        r: red
        w: white
        y: yellow
    Accepted effects for fxs:
        b: bold
        i: invert
        s: strike
        u: underline
    Both the single-letter and the extended word are accepted.
    Invert means the background and foreground colors are swapped.

    This function returns an ANSI code that adds one or more effects to the
    text displayed in the shell.
    """
    settings = []
    if on:
        if not stack:
            settings.append(0)
        if bgl:
            bg_shift = 60
        else:
            bg_shift = 0
        if bgc in ['k', 'black']:
            settings.append(40 + bg_shift)
        elif bgc in ['r', 'red']:
            settings.append(41 + bg_shift)
        elif bgc in ['g', 'green']:
            settings.append(42 + bg_shift)
        elif bgc in ['y', 'yellow']:
            settings.append(43 + bg_shift)
        elif bgc in ['b', 'blue']:
            settings.append(44 + bg_shift)
        elif bgc in ['m', 'magenta']:
            settings.append(45 + bg_shift)
        elif bgc in ['c', 'cyan']:
            settings.append(46 + bg_shift)
        elif bgc in ['w', 'white']:
            settings.append(47 + bg_shift)

        if fgl:
            fg_shift = 60
        else:
            fg_shift = 0
        if fgc in ['k', 'black']:
            settings.append(30 + fg_shift)
        elif fgc in ['r', 'red']:
            settings.append(31 + fg_shift)
        elif fgc in ['g', 'green']:
            settings.append(32 + fg_shift)
        elif fgc in ['y', 'yellow']:
            settings.append(33 + fg_shift)
        elif fgc in ['b', 'blue']:
            settings.append(34 + fg_shift)
        elif fgc in ['m', 'magenta']:
            settings.append(35 + fg_shift)
        elif fgc in ['c', 'cyan']:
            settings.append(36 + fg_shift)
        elif fgc in ['w', 'white']:
            settings.append(37 + fg_shift)

        if type(fxs) == str:
            fxs = [fxs]
        for fx in fxs:
            if fx in ['b', 'bold']:
                settings.append(1)
            elif fx in ['u', 'underline']:
                settings.append(4)
            elif fx in ['i', 'invert']:
                settings.append(7)
            elif fx in ['s', 'strike']:
                settings.append(9)

    if settings != []:
        settings.sort()
        settings = [str(setting) for setting in settings]
        if esc:
            return '\x01\033[' + ';'.join(settings) + 'm\x02'
        else:
            return '\033[' + ';'.join(settings) + 'm'
    else:
        return ''


def clear(
        on: bool = True
        ) -> str:
    """Clear every ANSI option in the shell.

    Keyword parameters:
    on -- Activate ANSI code.

    This function returns a special ANSI character that resets the following
    text to the default.
    """
    if on:
        return '\033c'
    else:
        return ''
