# -*- coding: utf-8 -*-
"""Module that collects common functions."""


__all__ = [
    'wrap',
    'error',
]
__author__ = 'GammaRayBurst'
__version__ = '1.0'


import textwrap

import settings.modules.termsize as termsize

wrapper = textwrap.TextWrapper()


def wrap(
        text: str,
        ) -> str:
    """Split the text so that it's displayed appropriately in every shell.

    Keyword parameters:
    text -- Text to be wrapped

    Shells usually fit as many characters as possible in a line before
    breaking it.  This results usually in words being split in all the wrong
    places, and reduces the overall readability of the text.  This function
    solves the problem by wrapping the text in a more readable way, using
    the shell's window size to determine where to place the line breaks.
    """
    width = termsize.get_terminal_size()[0]
    wrapper.width = width
    result = []
    for line in text.split('\n'):
        positions = []
        for i in range(line.count('\033')):
            pos1 = line.find('\033')
            pos2 = pos1 + line[pos1:].find('m') + 1
            positions.append([pos1, line[pos1: pos2]])
            line = line[:pos1] + line[pos2:]
        positions.reverse()
        line = wrapper.wrap(line)
        for pos in positions:
            tot_len = -1
            row = 0
            for sub_line in line:
                tot_len += len(sub_line) + 1
                if tot_len >= pos[0]:
                    break
                else:
                    row += 1
            col = pos[0] - len(' '.join(line[:row]))
            if row >= 1:
                col -= 1
            line[row] = line[row][:col] + pos[1] + line[row][col:]
        result.append('\n'.join(line))
    return '\n'.join(result)
