# -*- coding: utf-8 -*-


__all__ = ['lang']
__author__ = 'GammaRayBurst'
__version__ = '1.0'


import settings.langfiles.common_ita


lang = {
    # Multiline text.
    'help': """Digita %(blg)shelp%(r)s seguito da un argomento per ottenere maggiori informazioni:
  * %(blg)sgrid%(r)s: Come generare una griglia
  * %(blg)scolor%(r)s: Come abilitare/disabilitare i colori
  * %(blg)slang%(r)s: Come cambiare lingua

%(lc)sComandi generici:%(r)s
  %(blg)shelp%(r)s: mostra questo messaggio
  %(blg)sc%(r)s, %(blg)scopyright%(r)s: mostra le informazioni di copyright
  %(blg)sq%(r)s, %(blg)squit%(r)s, %(blg)sexit%(r)s: interrompe il programma
  %(blg)ss%(r)s, %(blg)ssettings%(r)s: mostra le impostazioni di lingua, registro, macro e dettaglio
  %(blg)sv%(r)s, %(blg)sversion%(r)s: mostra la versione di gridMaker""",
    'helpGrid': """%(lc)sDisegnare una griglia%(r)s:
Per disegnare una griglia bisogna inserire larghezza, altezza, lato di una cella e nome del file.
Larghezza e altezza devono essere numeri interi e indicano il numero di celle in una riga o colonna.
Il lato di una cella è la lunghezza del lato di un quadrato, misurato in pixel. Questo è l'unico argomento opzionale e, se omesso, il suo valore predefinito è 40.
Nome del file è il nome del file SVG che si vuole creare. Viene creato nella cartella "saves" e, se necessario, viene aggiunta l'estensione ".svg".

es: %(br)s10 10 test.svg%(r)s (disegna una griglia con 10 righe e 10 colonne, con celle di 40 pixel, di nome test.svg)
es: %(br)s20 10 50 test2%(r)s (disegna una griglia con 20 righe e 10 colonne, con celle di 50 pixel, di nome test2.svg)""",

    # Grid messages.
    'gridAbort': 'Griglia "%s" non creata.',
    'gridComplete': 'Griglia "%s" creata con successo.',
    'gridHeightError': 'Superato il massimo numero di righe (%s)',
    'gridOver': 'Nome griglia già usato. Sovrascrivere? [S/n] ',
    'gridWidthError': 'Superato il massimo numero di colonne (%s)',
}
lang.update(settings.langfiles.common_ita.common)