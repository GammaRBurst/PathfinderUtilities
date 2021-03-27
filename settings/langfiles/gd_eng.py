# -*- coding: utf-8 -*-


__all__ = ['lang']
__author__ = 'GammaRayBurst'
__version__ = '1.0'


import settings.langfiles.common_eng


lang = {
	# Multiline text
	'help': """Type %(blg)shelp%(r)s followed by a topic to obtain more informations:
  * %(blg)sgrid%(r)s: How to draw a grid
  * %(blg)scolor%(r)s: How to enable/disable colors
  * %(blg)slang%(r)s: How to change language

%(lc)sGeneric commands:%(r)s
  %(blg)shelp%(r)s: shows this message
  %(blg)sc%(r)s, %(blg)scopyright%(r)s: shows copyright informations
  %(blg)sq%(r)s, %(blg)squit%(r)s, %(blg)sexit%(r)s: interrupts program
  %(blg)ss%(r)s, %(blg)ssettings%(r)s: shows language, log, macro and verbose settings
  %(blg)sv%(r)s, %(blg)sversion%(r)s: shows gridMaker version""",
	'helpGrid': """%(lc)sDrawing a grid%(r)s:
To draw a grid you simply have to input width, height, cell side and file name.
Width and height have to be whole number and indicate the number of cells in a row or column.
Cell side is the length of the side of a square, measured in pixels. This is the only optional argument and, if omitted, its default value is 40.
File name is the name of the SVG file you want to create. It will be created in the "saves" folder and, if necessary, the extension ".svg" is added.

ex: %(br)s10 10 test.svg%(r)s (draws a grid with 10 rows and 10 columns, cell side is 40 pixels, named test.svg)
ex: %(br)s20 10 50 test2%(r)s (draws a grid with 20 rows and 10 columns, cell side is 50 pixels, named test2.svg)""",

	# Grid messages
	'gridAbort': 'Grid "%s" not drawn.',
	'gridComplete': 'Grid "%s" drawn successfully.',
	'gridHeightError': 'Maximum amount of rows (%s) exceeded',
	'gridOver': 'Grid name already existing. Overwrite? [Y/n] ',
	'gridWidthError': 'Maximum amount of columns (%s) exceeded',
}
lang.update(settings.langfiles.common_eng.common)