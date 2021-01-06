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

Got into a lot of trouble because modules wasn't working 
nicely with Webpack-dev-server and Jest. At the end of the
day, it still wasn't working.

### Day 5
Removed Webpack. Reverted to using a custom node server found
on stackoverflow which was able to solve the MIME-type problem.
Also started over implementing Jest with Babel and found a 
simple solution. The dev environment finally works with ES6
modules and unit tests!

Finalized the game and refactored a lot of the code to make 
it more Functional.

### Day 6
Did a code review with Dennis. He gave me some very good insights.
Wrote a lot of todo's down and I'm going to refactor the app soon.

### Day 7
Refactored all the todo's. And, oh my god, it looks so much better!
The separation between I/O and game-logic is super clear now! 
I'm very happy with the changes.
The only advice I didn't follow was Dennis' suggestion to have the 
render function accept 'actions' rather than having multiple render functions.
Or, well, I did follow his advice, but came to the conclusion that it
would be even better to have a render function that accepted an object.  
