# -*- coding: utf-8 -*-
"""Module that calculates the shell window size.

Most of the work comes from here: https://gist.github.com/jtriley/1108174
"""


__all__ = [
    'get_terminal_size',
]
__author__ = 'jtriley, GammaRayBurst'
__version__ = '1.1'


import os
import platform
import shlex
import struct
import subprocess
from typing import Tuple, Optional


def get_terminal_size() -> Tuple[int, int]:
    """Get the height and width of the console.

    This function works on Linux, OS X, Windows, and Cygwin (Windows)
    Originally retrieved from:
    http://stackoverflow.com/questions/566746/
    """
    current_os = platform.system()
    tuple_xy = None
    if current_os == 'Windows':
        tuple_xy = _get_terminal_size_windows()
        if tuple_xy is None:
            # Needed for Window's Python in Cygwin's xterm.
            tuple_xy = _get_terminal_size_tput()
    if current_os in ['Linux', 'Darwin'] or current_os.startswith('CYGWIN'):
        tuple_xy = _get_terminal_size_linux()
    if tuple_xy is None:
        # Default value.
        tuple_xy = (80, 25)
    return tuple_xy


def _get_terminal_size_windows() -> Optional[Tuple[int, int]]:
    """Get the console's height and width on Windows."""
    try:
        from ctypes import windll, create_string_buffer
        # stdin handle is -10
        # stdout handle is -11
        # stderr handle is -12
        h = windll.kernel32.GetStdHandle(-12)
        csbi = create_string_buffer(22)
        res = windll.kernel32.GetConsoleScreenBufferInfo(h, csbi)
        if res:
            (
                bufx,
                bufy,
                curx,
                cury,
                wattr,
                left,
                top,
                right,
                bottom,
                maxx,
                maxy,
            ) = struct.unpack("hhhhHhhhhhh", csbi.raw)
            sizex = right - left + 1
            sizey = bottom - top + 1
            return sizex, sizey
    except Exception:
        return None


def _get_terminal_size_tput() -> Optional[Tuple[int, int]]:
    """Get the console's height and width on Cygwin."""
    # Source: http://stackoverflow.com/questions/263890/
    try:
        cols = int(subprocess.check_call(shlex.split('tput cols')))
        rows = int(subprocess.check_call(shlex.split('tput lines')))
        return (cols, rows)
    except Exception:
        return None


def _get_terminal_size_linux() -> Optional[Tuple[int, int]]:
    """Get the console's height and width on Linux and OS X."""

    def ioctl_GWINSZ(fd):
        try:
            import fcntl
            import termios
            cr = struct.unpack(
                'hh',
                fcntl.ioctl(fd, termios.TIOCGWINSZ, '1234'),
            )
            return cr
        except Exception:
            return None

    cr = ioctl_GWINSZ(0) or ioctl_GWINSZ(1) or ioctl_GWINSZ(2)
    if not cr:
        try:
            fd = os.open(os.ctermid(), os.O_RDONLY)
            cr = ioctl_GWINSZ(fd)
            os.close(fd)
        except Exception:
            pass
    if not cr:
        try:
            cr = (os.environ['LINES'], os.environ['COLUMNS'])
        except Exception:
            return None
    return int(cr[1]), int(cr[0])
