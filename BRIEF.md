# The Wedding Shop – Technical Tests – React Position

Below is a fun coding task that we would like you to complete. It should be considered an opportunity to demonstrate
your creativity and ability to think outside the box. The problem demonstrates the minimum required for the output.
You may also include a brief explanation of your design and assumptions along with your code.

## Problem - Mars Rover
A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau, which is curiously rectangular,
must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to
send back to Earth.
A rover&#39;s position and location are represented by a combination of x and y co-ordinates and a letter representing one of
the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might
be 0, 0, N, which means the rover is in the bottom left corner and facing North.
In order to control a rover, NASA sends a simple string of letters. The possible letters are &#39;L&#39;, &#39;R&#39; and &#39;M&#39;. &#39;L&#39; and &#39;R&#39; makes
the rover spin 90 degrees left or right respectively, without moving from its current spot. &#39;M&#39; means move forward one
grid point and maintain the same heading.
Assume that the square directly North from (x, y) is (x, y+1).
Write a simple application that takes a user’s starting point, and then directional instructions and displays the resulting
position to the user.

### INPUT
The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.
The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input.
The first line gives the rover&#39;s position, and the second line is a series of instructions telling the rover how to explore the
plateau.
The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and
the rover&#39;s orientation.
Each rover will be finished sequentially, which means that the second rover won&#39;t start to move until the first one has
finished moving.

### OUTPUT
The output for each rover should be its final co-ordinates and heading.

### INPUT AND OUTPUT
Test Input:
```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```
Expected Output:

```
1 3 N
5 1 E
```
