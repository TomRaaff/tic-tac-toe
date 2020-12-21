#### Day 1 
started the project, did a quick start of the CSS

#### Day 2 
Set up the gameboard in CSS 
Started implementing the game based on updating the
clicked element. Each element would contain the 
complete game logic and figure out if the computer
could make a move. This also meant I would be 
referencing the dom quite often. And that broke
the purity of the functions. 

I figured out it was better to refactor and try 
reading the entire gameboard on click and then handle
the updating outside of the clicked element. As an 
attempt to keep the impure functions at the edge of
my application. 

#### Day 3
Rewrote all of the JS code. It now reads the board once
and uses it's data throughout the app. Rendering is 
also done via a separate method.

#### Day 4
Implemented JS-modules and split up the code over 
multiple files.

Also implemented Babel, Webpack and Jest in order to be
able to run the code from a webserver and have it be
testable. Apparently, jest, nor jasmine is able to handle 
ES6 modules, so that's why I needed babel.
For more help/instrucions on the webpack setup, see:
https://medium.com/swlh/webpack-v4-in-examples-all-you-need-to-know-73831915b314

