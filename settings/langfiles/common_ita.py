# -*- coding: utf-8 -*-


__all__ = ['common']
__author__ = 'GammaRayBurst'
__version__ = '1.0'


common = {
    # Multiline text.
    'copyright': """Copyright (c) %s GammaRayBurst
Distribuito con licenza Creative Commons CC-BY-NC-SA 4.0 internazionale
http://creativecommons.org/licenses/by-nc-sa/4.0/ per maggiori informazioni""",
    'helpColor': """%(lc)sComandi di colore:%(r)s
L'output colorato può essere utile, ma può essere disabilitato se necessario
  %(blg)scolor on%(r)s: abilita la modalità colorata (comportamento predefinito)
  %(blg)scolor off%(r)s: disabilita la modalità colorata""",
    'helpLang': """%(lc)sComandi di lingua:%(r)s
%(prog)s supporta il multilinguismo e può essere tradotto agevolmente in ogni lingua.
  %(blg)slang list%(r)s: elenca ogni file di lingua installato
  %(blg)slang file %(lg)snomefile%(r)s: cambia file di lingua (predefinito: eng)""",
    'welcome': """Benvenuto in %s %s
Inserisci %s per maggiori informazioni.

Impostazioni attuali:""",

    # Language messages.
    'langName': '    Lingua: Italiano',
    'langError': '%s: lingua non installata.',
    'langSwitch': '    Lingua impostata su Italiano.',

    # Color messages.
    'colorOn': '    I colori sono abilitati.',
    'colorOff': '    I colori sono disabilitati.',

    # Yes/no.
    'no': ['n', 'no'],
    'yes': ['s', 'sì', 'si'],

    # Various messages.
    'error': 'Errore di sintassi',
    'goodbye': 'Arrivederci',
    'interrupted': 'Interrotto',
    'prompt': '%s>>> %s',
    'version': '%s versione %s',
}