# Grid Drawer

There is only one specific command for this program. To generate a grid it's necessary to specify the number of columns, the number of rows, optionally the cell size in pixels, and the file name.

E.g. *15 10 battle_grid* will generate a file called *battle_grid.svg* with 10 rows and 15 columns. The cells will have the default size of 40 pixels.

All files are saved in the *saves* directory. The file name doesn't need to have the *.svg* extension, the program will add it if it's necessary. If the file already exists, the program will ask if you want to overwrite it. Be careful, because once the file is overwritten, the old file is lost.

# Bugs and other strange things

The program works perfectly on Linux, but unfortunately I can't test it on Windows and OS X. I can only hope it works on other operating systems, and I would really appreciate any kind of feedback, both positive and negative.

# Next Updates

At the moment the program is able to generate only a square grid. It would be interesting to implement a function to draw hexagonal grids as well. This is a much more complicated feature though, so I'm not sure I will ever implement it.

