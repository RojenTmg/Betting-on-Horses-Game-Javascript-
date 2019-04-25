/*
Assignment: Javascript AS2
Author    : Rojen Tamang (18413711)
*/

var interval;   
var currentLap = 0;   //initialize the current lap
var bet;  //storing the bet horse that player has choosen
var lap;  //storing the lap that player has choosen
var amount;   //storing the amount that player has bidden
var fund;   //final result of the bet(either win or subtract)
var faces = [];  //stores the result of the winner
var winner,pos2,pos3,pos4;  // determine the the position of horses for the result
var currentAmount = 100;  // initialize the current amount

function moveHorseAll(){
  var element = document.getElementsByClassName('horse');
  var face = document.querySelectorAll('#results .result');  //(Developer.rackspace.com, 2018) 

  betHorses();    //assign horse name corresponding to bet horse
  moveRight();   

  for (var j = 0; j < 4; j++) 
    face[j].className = 'result';     //removes all heads from result table

  function moveRight() {

    for (var i = 0; i < 4; i++) {     // moves all the horses one by one 
      element[i].className = 'horse runRight';
      var positionLeft = element[i].offsetLeft;
      element[i].style.left = positionLeft + Math.ceil(Math.random() * 1) + 'px';     

      if(positionLeft > window.innerWidth*0.77){    //checking the condition to move Up  
        clearInterval(interval);
        interval = setInterval(moveUp,5);
      } 

      //if the horses crosses this checkpoint, run this conditioon
      else if(positionLeft == window.innerWidth-(parseInt(window.innerWidth*0.703))){         

        //increases currentLap by 1 by each horse. If four horses passes by, currentLap increases by 4
        //in one lap currentLap increases by 4
        currentLap = currentLap + 1;  

        //if currentLap is greater than lap(lap * 4), run this condition
        //this condtion runs only in the last lap
        //this condition chooses winner and doesn't run at second 'for' loop  
        if(currentLap > lap && face[0].className != winner){  
          winner = element[i].id;
          face[0].className = winner;     //keeps the wiinner's face in the result table
        }
        //this condition chooses second position and doesn't run at third 'for' loop 
        else if(currentLap > lap  && face[1].className != pos2){
          pos2 = element[i].id;
          face[1].className = pos2;
        }
        //this condition chooses third position and doesn't run at fourth 'for' loop 
        else if(currentLap > lap  && face[2].className != pos3){
          pos3 = element[i].id;
          face[2].className = pos3;
        }
        //this condition chooses last position
        else if(currentLap > lap){
          pos4 = element[i].id;
          face[3].className = pos4;
        }
        //and finally currentLap becomes just greater than 'lap+3'
      }

      //then enter's to this condition
      else if(lap+3 < currentLap){
        clearInterval(interval);
        if(bet == winner){      //  checks the bet from user input and winner from the final result
          alert('The winner is ' + winner + '.');
          alert('Congratulation! You won the bet.');
          currentAmount += amount;    
        }
        else{
          alert('The winner is ' + winner + '.');
          alert('You lost the bet.');
          currentAmount -= amount;
        }
        fund.innerText = currentAmount;	    //sets the final amount at fund

        for (var i = 0; i < 4; i++)
          element[i].className = 'horse standRight';    //stops all the horse as soon as the last horse passes the line

        document.getElementById('start').disabled = false;    //enables the start button again
        reset();    //resets currentLap to 0.
      }
    }
  }


  function moveUp() {
    for (var i = 0; i < 4; i++) {
      element[i].className = 'horse runUp';
      var positionTop = element[i].offsetTop;
      element[i].style.top = positionTop - Math.ceil(Math.random() * 1) + 'px';  

      if (positionTop < window.innerHeight - 655){      
        clearInterval(interval);
        interval = setInterval(moveLeft,9);
      } 
    } 
  }

  function moveLeft() {
    for (var i = 0; i < 4; i++) {
      element[i].className = 'horse runLeft';
      var positionLeft = element[i].offsetLeft;
      element[i].style.left = positionLeft - Math.ceil(Math.random() * 3) + 'px';   //chooses random speed for each of the horses

      if (positionLeft < window.innerWidth*0.045){		
        clearInterval(interval);
        interval = setInterval(moveDown,8);  
      }
    }
  }

  function moveDown() {
    for (var i = 0; i < 4; i++) {
      element[i].className = 'horse runDown';
      var positionTop = element[i].offsetTop;
      element[i].style.top = positionTop + Math.ceil(Math.random() * 1) + 'px';

      if (positionTop > window.innerHeight - 140){
        clearInterval(interval);
        interval = setInterval(moveRight,1);
      }
    }  
  }  
}

//setting the the bet Horse to the corresponding horse name. So that, to check the condtion on line 60 
function betHorses(){   
  if(bet == 1) bet = 'horse1';  
  if(bet == 2) bet = 'horse2';
  if(bet == 3) bet = 'horse3';
  if(bet == 4) bet = 'horse4';
}

function reset(){   // resets the currentLap to 0, after the game finishes

  currentLap = 4;
}

function moveHorse(){

  lap = document.getElementById('lap').value*4;
  amount = parseInt(document.getElementById('amount').value);
  bet = document.getElementById('bethorse').value;
  fund = document.getElementById('funds');

  //if user inputs lap less than or equal to 0, alert this message
  if (lap <= 0){    
    alert('Lap should be greater than 0');
  }
  //if amount is greater than the actual amount, alert this message
  else if (currentAmount < amount){   
    alert('You dont have enough amount.');
  }
  //is all the condition is satisfied, run 'moveHorseAll' function
  else{  
    this.disabled = true;   //disable the start button, after the click
    interval = setInterval(moveHorseAll,1); 
  }
}

function myLoad(){

  var start = document.getElementById('start');
  start.addEventListener('click',moveHorse);    //when clicking on 'start' button run 'moveHorse' function
}

document.addEventListener('DOMContentLoaded',myLoad);   //loads myLoad function as soon as page finishes loading
