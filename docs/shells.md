# Python Shell Programs

The Python programs included in this project all work in the same way. They are interactive shell programs, and this means that, once executed, they wait for the user's input indefinitely, and respond accordingly to every input written in the command line. All the included shell programs share a few basic commands:

* __help__: Shows a generic help message, describing the available commands. Sometimes more specific help messages may also be available.
* __c__, __copyright__: Shows copyright informations.
* __s__, __settings__: Shows the program's settings.
* __v__, __version__: Shows the current version.
* __q__, __quit__, __exit__: Exits the interactive shell. The same effect can be obtained by pressing CTRL+D.
* __lang list__: Shows a list of installed languages.
* __lang file__: Selects a language file. It has to be followed by one of the language codes displayed by the previous command, e.g. *lang file eng*. Currently only English and Italian are installed.
* __color__: If followed by *on*, it activates the colored text, if followed by *off* it disables colors. Colors are thought for a shell with a dark background and white text. Different settings may obtain less pleasurable results.

## Installation

If you are not interested in this program, you don't need to do anything. Just leave the scripts there, they are extremely lightweight and won't fill your computer space.

If, however, you want to try them out, the installation process depends on your operating system.

### Linux

If you are using Linux, chances are you already have everything you need. But let's make sure of it. Open a terminal and navigate to the *PathfinderUtilities* directory. Then type the following commands:

    chmod +x install.sh
    ./install.sh

The installer will ask for your password, and then install everything you need.

__Warning__: The installer is written for Ubuntu and similar distributions, that use APT as the packet manager. Other distributions may require some code adjustment.

### OS X

The procedure for OS X shouldn't be too different from the one for Linux, but unfortunately I'm not able to be more precise than that.

### Windows

Download and install the [latest version of Python](https://www.python.org/downloads/). Then open the command line (cmd.exe) and navigate to the *PathfinderUtilities* directory. Then type the following command:

    python -m pip install -r requirements.txt

## Execution

To execute any of the programs, you need to open a terminal/command line, and navigate to the *PathfinderUtilities* directory. Then type *python* followed by the program's name, e.g.:

    python dice_roller.py

This will execute the program in the shell. Unfortunately, as far as I know, there is no simpler and faster way to execute them. They are shell programs, and thus they require to be executed in a terminal.

