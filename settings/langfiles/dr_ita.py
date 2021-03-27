# -*- coding: utf-8 -*-


__all__ = ['lang']
__author__ = 'GammaRayBurst'
__version__ = '1.0'


import settings.langfiles.common_ita

lang = {
    # Multiline text.
    'changelog': """%(bb)sVersione 1.1%(r)s:
  * Codice: aggiornamento a Python3.
  * Codice: riformattazione secondo gli standard PEP8.

%(bb)sVersione 1.0%(r)s:
  * Codice: aggiornamento di una funzione obsoleta.
  * Distribuzione: eliminati i requisiti per usare diceRoller.

%(bb)sVersione 1.0 RC1%(r)s:
  * Macro: aggiunti valori predefiniti per i parametri.

%(bb)sVersione 0.8 beta%(r)s:
  * Parser: aggiunti moltiplicazione e divisione del valore totale e di singoli dadi.
  * Parser: aggiunto stack di memoria per i risultati.
  * Parser: aggiunti tiri condizionali.
  * Macro: aggiunte macro parametriche.

%(bb)sVersione 0.7 beta%(r)s:
  * Ambiente: aggiunto visualizzatore di impostazioni.
  * Ambiente: il colore può essere disattivato.

%(bb)sVersione 0.6 beta%(r)s:
  * Parser: aggiunti valore totale massimo e minimo.
  * Parser: aggiunto modo dettagliato.
  * Macro: aggiunte funzioni di macro.
  * Ambiente: aggiunta funzione di profilo.
  * Ambiente: aggiunto testo colorato
  * Ambiente: tiri scartati/corretti nell'output.
  * Codice: ordine del codice migliorato.
  * Lingue: aggiunto supporto multilingua.
  * Compatibilità: aggiunto controllo di compatibilità di sistema.

%(bb)sVersione 0.5 alpha%(r)s:
  * Parser: aggiunti commenti.
  * Registro: aggiunte funzioni di registro.

%(bb)sVersione 0.4 alpha%(r)s:
  * Parser: aggiunto operatore di test
  * Parser: aggiunto moltiplicatore di tiri.
  * Codice: ordine del codice migliorato.

%(bb)sVersione 0.3 alpha%(r)s:
  * Parser: aggiunto tiro gaussiano.
  * Parser: aggiunti valore massimo e minimo di un dado.
  * Parser: aggiunti tiri migliori e peggiori.

%(bb)sVersione 0.2 alpha%(r)s:
  * Parser: aggiunti tiri multipli (operatore virgola).
  * Ambiente: aggiunti aiuto e copyright.

%(bb)sVersione 0.1 alpha%(r)s:
  * Parser: risconosce operatori dado e somma.""",
    'help': """Digita %(blg)shelp%(r)s seguito da un argomento per ottenere maggiori informazioni:
  * %(blg)srolls%(r)s: Come tirare dadi
  * %(blg)scond%(r)s: Come eseguire tiri condizionali
  * %(blg)sstack%(r)s: Come usare i risultati precedenti
  * %(blg)scolor%(r)s: Come abilitare/disabilitare i colori
  * %(blg)slang%(r)s: Come cambiare lingua
  * %(blg)slog%(r)s: Come abilitare/disabilitare il registro
  * %(blg)smacro%(r)s: Come abilitare/disabilitare le macro
  * %(blg)sprofile%(r)s: Come cambiare profilo
  * %(blg)sverbose%(r)s: Come abilitare/disabilitare il modo dettagliato

%(lc)sComandi generici:%(r)s
  %(blg)shelp%(r)s: mostra questo messaggio
  %(blg)sc%(r)s, %(blg)scopyright%(r)s: mostra le informazioni di copyright
  %(blg)sq%(r)s, %(blg)squit%(r)s, %(blg)sexit%(r)s: interrompe il programma
  %(blg)ss%(r)s, %(blg)ssettings%(r)s: mostra le impostazioni di lingua, registro, macro e dettaglio
  %(blg)schangelog%(r)s: mostra il registro delle modifiche
  %(blg)sv%(r)s, %(blg)sversion%(r)s: mostra la versione di diceRoller""",
    'helpRolls': """%(lc)sSintassi%(r)s:
  [%(br)st%(r)s] %(lc)s_%(br)sd%(lc)s_%(r)s [%(br)sg%(r)s[%(lc)s_%(r)s]] [%(br)sm%(lc)s_%(r)s] [%(br)sM%(lc)s_%(r)s] [%(br)sb%(lc)s_%(r)s] [%(br)sw%(lc)s_%(r)s] [%(br)s*%(lc)s_%(r)s] [%(br)s/%(lc)s_%(r)s] [%(br)s+%(r)s/%(br)s-%(r)s%(lc)s...%(r)s] ...
  |1| |2| |________________3_________________| |__4___|

  ... [%(br)sn%(lc)s_%(r)s] [%(br)sN%(lc)s_%(r)s] [%(br)s**%(lc)s_%(r)s] [%(br)s//%(lc)s_%(r)s] [%(br)sx%(lc)s_%(r)s] [%(br)s#%(lc)s...%(r)s] [%(br)s,%(lc)s...%(r)s]
      |_________5_________| |6_| |_7__| |_8__|

%(lc)s_%(r)s rappresenta un singolo numero.
%(lc)s...%(r)s rappresenta un input più complesso.
Ogni lettera in %(br)sgrassetto rosso%(r)s rappresenta un operatore, descritto sotto.
Gli spazi possono essere usati (o non usati) a piacere.
%(br)sAttenzione%(r)s: Questi comandi distinguono maiuscole e minuscole!

%(b)sBlocco 1:%(r)s
  %(br)st%(r)s: disegna la distribuzione di probabilità del tiro
    Attenzione: può richiedere alcuni minuti, a dipendenza dell'hardware.
    es: %(br)st%(lc)s1d20g%(r)s (disegna la distribuzione di un dado gaussiano a 20 facce)

%(b)sBlocco 2:%(r)s
  %(br)sd%(r)s: operatore binario 'dado'
    es: %(lc)s2%(br)sd%(lc)s8%(r)s (tira due dadi a 8 facce)
    es: %(lc)s1%(br)sd%(lc)s%%%(r)s (tira un dado a 100 facce)

%(b)sBlocco 3:%(r)s (gli operatori in questo blocco sono commutativi)
  %(br)sg%(r)s: dado gaussiano, seguito dalla deviazione standard (opzionale)
    es: 1d20%(br)sg%(lc)s5.7%(r)s (tira un dado a 20 facce con DS 5.7)
    es: 2d4%(br)sg%(r)s (tira due dadi a 4 facce con DS predefinito per un d4)

  %(br)sm%(r)s: valore minimo per ogni dado, non può essere maggiore del valore massimo
    es: 3d6%(br)sm%(lc)s2%(r)s (tira tre dadi a 6 facce, ogni valore minore di 2 diventa 2)

  %(br)sM%(r)s: valore massimo per ogni dado, non può essere minore del valore minimo
    es: 2d10%(br)sM%(lc)s8%(r)s (tira due dadi a 10 facce, ogni valore maggiore di 8 diventa 8)

  %(br)sb%(r)s: sceglie i tiri migliori
    es: 4d6%(br)sb%(lc)s3%(r)s (tira quattro dadi a 6 facce e sceglie i tre valori migliori)

  %(br)sw%(r)s: sceglie i tiri peggiori
    es: 2d12%(br)sw%(lc)s1%(r)s (tira due dadi a 12 facce e sceglie il valore peggiore)

  %(br)s*%(r)s: moltiplica ogni dado per un numero
    es: 3d6%(br)s*%(lc)s3%(r)s (ogni valore è moltiplicato per 3)

  %(br)s/%(r)s: divide ogni valore per un numero
    es: 2d8%(br)s/%(lc)s2%(r)s (ogni valore è diviso per 2, arrotondato verso il basso, poi sommato)
    es: 2d8%(br)s/%(lc)s2.%(r)s (ogni valore è diviso per 2, nessun arrotondamento)

%(b)sBlocco 4:%(r)s
  %(br)s+%(r)s: aggiunge un numero al totale o somma due tiri
    es: %(lc)s1d8%(br)s+%(lc)s3%(r)s (tira un dado a 8 facce e aggiunge 3 al risultato)
    es: %(lc)s2d6%(br)s+%(lc)s1d6%(r)s (tira due dadi a 4 facce e un dado a 6 facce)

  %(br)s-%(r)s: sottrae un numero dal totale
    es: %(lc)s2d4%(br)s-%(lc)s1%(r)s (tira due dadi a 4 facce e sottrae 1 al risultato)

%(b)sBlocco 5:%(r)s (gli operatori in questo blocco verranno applicati in ordine)
  %(br)sn%(r)s: valore totale minimo
    es: 1d6+1d4%(br)sn%(lc)s4%(r)s (ogni valore totale minore di 4 diventa 4)

  %(br)sN%(r)s: valore totale massimo
    es: 2d8-2%(br)sN%(lc)s10%(r)s (ogni valore totale maggiore di 10 diventa 10)

  %(br)s**%(r)s: moltiplica valore totale
    es: 1d6+1%(br)s**%(lc)s3%(r)s (moltiplica valore totale per 3)

  %(br)s//%(r)s: divide valore totale
    es: 1d20+1d8+2%(br)s//%(lc)s2%(r)s (divide valore totale per 2, arrotondato verso il basso)
    es: 1d20+1d8+2%(br)s//%(lc)s2.%(r)s (divide valore totale per 2, nessun arrotondamento)

%(b)sBlocco 6:%(r)s
  %(br)sx%(r)s: ripete il tiro
    es: 4d6+1 %(br)sx%(lc)s2%(r)s (ripete due volte lo stesso tiro)

%(b)sBlocco 7:%(r)s
  %(br)s#%(r)s: commento
    es: 1d20+3 %(br)s#%(lc)stiro per colpire%(r)s, 1d8+2 %(br)s#%(lc)sdanni%(r)s

%(b)sBlocco 8:%(r)s
  %(br)s,%(r)s: separa due tiri differenti
    es: %(lc)s1d6%(br)s, %(lc)s2d8+1%(r)s (tira separatamente 1d6 e 2d8+1)""",
    'helpCond': """%(lc)sComandi condizionali:%(r)s
%(br)sAttenzione%(r)s: Non disponibile per i test statistici!
diceRoller permette di creare tiri condizionali. Il comando si compone di un primo tiro, seguito da una serie di condizioni e conseguenze.
  %(lc)sPrimo tiro %(br)s??%(lc)s Condizione 1 %(br)s::%(lc)s Conseguenza 1 %(br)s&&%(lc)s ... %(br)s&& ::%(lc)s Ultima conseguenza%(r)s
Il primo tiro può essere un qualunque tiro valido. Il suo risultato viene testato dalle varie condizioni. Un primo tiro ripetuto implica che viene ripetuto l'intero test condizionale.
Le condizioni sono semplici confronti matematici. Consistono di un operatore (%(br)s= < > <= >= !=%(r)s) seguito da un numero. Se nessuna condizione è data, viene considerata come la condizione %(br)saltrimenti%(r)s.
Le condizioni sono valutate nell'ordine dato, per cui la condizione %(br)saltrimenti%(r)s dovrebbe essere sempre l'ultima.
Le condizioni non possono essere più complicate. Se si desidera selezionare risultati fra due numeri, si può p.e. dichiarare una condizione per ogni risultato maggiore del limite superiore e successivamente per ogni risultato maggiore del limite inferiore.
Se non viene incontrata nessuna condizione vera, non viene eseguito nessun comando dopo il primo tiro.
Una conseguenza viene eseguita quando viene incontrata la prima condizione vera, dopodiché diceRoller non controlla più le condizioni successive.
Le conseguenze devono consistere di un singolo comando, quindi non è possibile inserire direttamente tiri multipli o condizioni annidate. Per ottenere tali risultati, si consiglia di salvare queste operazioni nelle macro e richiamarle all'interno di una condizione.
Digita %(blg)shelp macro%(r)s per maggiori informazioni sull'argomento.""",
    'helpStack': """%(lc)sComandi di stack:%(r)s
%(br)sAttenzione%(r)s: Non disponibile per i test statistici!
diceRoller permette di accedere ai risultati dei precedenti tiri.
Ogni linea comincia con un numero fra parentesi graffe come riferimento, p.e. %(lc)s{3}%(r)s.
Inserendo lo stesso numero fra parentesi graffe, diceRoller richiama il risultato corrispondente. È anche possibile accedere allo stack dalla fine usando numeri negativi. In questo modo %(lc)s{-1}%(r)s è l'ultimo risultato e così via.
Usare un numero maggiore della lunghezza dello stack genera un errore.
    es: 1d20+%(br)s{%(lc)s34%(br)s}%(r)s (tira un dado a 20 facce e aggiunge il risultato dell'operazione 34)
    es: 1d%%-%(br)s{%(lc)s-1%(br)s}%(r)s (tira un dado percentile e sottrae il risultato dell'ultimo tiro)""",
    'helpLog': """%(lc)sComandi di registro:%(r)s
diceRoller può salvare ogni tiro in un file di registro di tua scelta.
  %(blg)slog on%(r)s: registra i tiri di dadi
  %(blg)slog off%(r)s: non registra i tiri di dadi (comportamento predefinito)
  %(blg)slog file %(lg)snomefile%(r)s: cambia file di registro (predefinito: dice)""",
    'helpMacro': """%(lc)sComandi di macro:%(r)s
diceRoller supporta le macro, uno strumento utile per salvare tiri ricorrenti e complessi.
  %(blg)smacro set %(lg)snomemacro dadi%(r)s: aggiunge una nuova macro o ne sovrascrive una già esistente; non sono ammessi spazi in nomemacro, usa il punto e virgola (;) per separare i vari tiri
  %(blg)smacro file %(lg)snomefile%(r)s: cambia file di elenco macro (predefinito: dice)
  %(blg)smacro del %(lg)snomemacro%(r)s: cancella una macro esistente
  %(blg)smacro list%(r)s: elenca ogni macro salvata
  %(blg)s@%(lg)snomemacro%(r)s: esegue una macro

Le macro possono contenere parametri. Un parametro è una singola parola racchiusa fra parentesi quadre.
  es: macro set attack 1d20+%(br)s[bonus]%(r)s
È possibile specificare un valore predefinito per ogni ricorrenza di ogni parametro.
  es: macro set attack 1d20+%(br)s[bonus = 7]%(r)s
Quando si esegue una macro è necessario specificare il valore dei parametri.
Questo valore può essere qualsiasi espressione valida, da un semplice numero a un dado ad un'altra macro.
  es: @attack%(br)s[bonus = 5]%(r)s
Se non è specificato nessun valore, viene usato il valore predefinito.
Se non esiste un valore predefinito, viene usato il numero 0.""",
    'helpProfile': """%(lc)sComandi di profilo:%(r)s
diceRoller ti permette di selezionare facilmente i file di registro e di macro insieme.
  %(blg)sprofile %(lg)snomeprofilo%(r)s: cambia file di registro e di elenco macro""",
    'helpVerbose': """%(lc)sComandi di dettaglio:%(r)s
diceRoller può mostrare solo i tiri usati e il risultato finale oppure ogni tiro scartato o modificato.
  %(blg)sverbose on%(r)s: mostra maggiori dettagli sui tiri
  %(blg)sverbose off%(r)s: mostra solo le informazioni essenziali sui tiri""",

    # Log messages.
    'logOff': '    Il registro è disabilitato.',
    'logOn': '    Il registro è abilitato, il file di registro è %s.',
    'logSwitch': '    Cambio file di registro: %s.',

    # Macro messages.
    'macroAdded': '    %sMacro "%s" aggiunta alla lista.%s',
    'macroEmpty': '    %sNessuna macro salvata.%s',
    'macroError': 'Macro non esistente',
    'macroNotAdded': '    %sMacro "%s" non aggiunta alla lista.%s',
    'macroNotExisting': '    %sMacro "%s" non esistente.%s',
    'macroOver': 'Nome macro già usato. Sovrascrivere? [S/n] ',
    'macroRemoved': '    %sMacro "%s" rimossa dalla lista.%s',
    'macroStart': '    Il file di raccolta macro è %s, %s macro caricate.',
    'macroSwitch': '    Cambio file macro: %s, %s macro caricate.',

    # Verbose messages.
    'verboseOff': '    Modo dettagliato non è attivo.',
    'verboseOn': '    Modo dettagliato è attivo.',

    # Test messages.
    'testFreq': 'Frequenza',
    'testValue': 'Valore dadi',

    # Conditional messages.
    'conditionError': 'Condizione non valida',

    # Stack messages.
    'stackError': 'Indice dello stack non valido',
}
lang.update(settings.langfiles.common_ita.common)
