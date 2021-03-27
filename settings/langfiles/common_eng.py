# -*- coding: utf-8 -*-


__all__ = ['common']
__author__ = 'GammaRayBurst'
__version__ = '1.0'


common = {
    # Multiline text.
    'copyright': """Copyright (c) %s GammaRayBurst
Distributed under Creative Commons license CC-BY-NC-SA 4.0 international
http://creativecommons.org/licenses/by-nc-sa/4.0/ for more informations""",
    'helpColor': """%(lc)sColor commands:%(r)s
Colored output can be helpful, but it can be disabled if needed
  %(blg)scolor on%(r)s: enables colored mode (default behaviour)
  %(blg)scolor off%(r)s: disables colored mode""",
    'helpLang': """%(lc)sLanguage commands:%(r)s
%(prog)s comes with multilanguage support and can be easily translated in any language.
  %(blg)slang list%(r)s: lists every language file installed
  %(blg)slang file %(lg)sfilename%(r)s: switches to a different language file (default: eng)""",
    'welcome': """Welcome to %s %s
Enter %s for more information.

Current settings:""",

    # Language messages.
    'langName': '    Language: English',
    'langError': '%s: language not installed.',
    'langSwitch': '    Language switched to English.',

    # Color messages.
    'colorOn': '    Colors are enabled.',
    'colorOff': '    Colors are disabled.',

    # Yes/no.
    'no': ['n', 'no'],
    'yes': ['y', 'yes'],

    # Various messages.
    'error': 'Syntax error',
    'goodbye': 'Goodbye',
    'interrupted': 'Interrupted',
    'prompt': '%s>>> %s',
    'version': '%s version %s',
}