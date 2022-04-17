/**
 * @author: Yushae raza
 * @description: index file of battleship
 * 
 * 
 */
 import readline from 'readline';
 import Player from './src/player.js';

 var input = readline.createInterface({
    input : process.stdin,
    output: process.stdout
  });
  /**
   * player starting turn function
   * @param {String} inp - input from the user
   * @param {Player} player - player object
   * @param {Number} turn - turn number
   * @returns  error - error message
   */
 function playerStart(inp,player,turn){
    var cordinates = inp.split(":");
    var endRow=parseInt(cordinates[1].substring(1))
    var endCol=cordinates[1].substring(0,1);
    var startRow=parseInt(cordinates[0].substring(1))
    var startCol=cordinates[0].substring(0,1);
    var direction=cordinates[2];
    var error= player.placeShip([startRow,startCol], [endRow,endCol], 3, direction);
    if(!error){
    player.grid.display();
   
    }
    return error;

 }
 /**
  * display the end game status
  * @param {Player} player1 
  * @param {Player} player2 
  */
 function displayEndGameStatus(player1,player2){
    console.log(`Player1 ${player1.status}`);
    console.log(`Player2 ${player2.status}`);
    console.log("Player1:");
    player1.grid.display();
    console.log("Player2:");
    player2.grid.display();
 }
 /**
  * fuction to start the game and generate the grid
  * @param {String} inp - input from the user
  * @param {Player} player1 - player1 object
  * @param {Player} player2 - player2 object
  * @param {int} turn - turn number
  * @returns error - error message
  */
 function gameStart(inp,player1,player2,turn){
    if(turn%2==0){  //player1's turn
        console.log("Player1:");
        const error =playerStart(inp,player1);
        if(!error){
        turn+=1;

        console.log("Player2: Enter ship coordinates and direction (e.g. A1:C1:H)");
        console.log("Player2:");
        player2.grid.display();
        }
        else{
            console.log("Player1: Enter ship coordinates and direction (e.g. A1:C1:H)");
            return error
        }
    }
    else{ //player2's turn
        
        console.log("Player2:");
        const error = playerStart(inp,player2);
        if(!error){
        turn++;
        console.log("Player1: Enter coordinates to hit (e.g. A1)");
        }
        else{

            console.log("Player2: Enter ship coordinates and direction (e.g. A1:C1:H)");
            return error
        }

    }
    }
 const  inpformat = /[A-Z]+[1-10]+:[A-Z][1-10]+:V||H/i;

 /**
  * main loop of the game
  */
function mainLoop(){
    var turn=0;
    console.log("Welcome to Battleship!");
    console.log("type exit to exit the game");
    var player1 = new Player();
    var player2 = new Player();
    console.log("Player1:");
    player1.grid.display();
  
    console.log("Player1: Enter ship coordinates and direction (e.g. A1:C1:H)");
    var start=true;
    //

    input.on("line", function(inp){
        // if inp is equal to exit, then exit the game
        if(inp=="exit"){
            input.close();
            return;
        }

        const command= inp.toUpperCase();
        if(start ){//if game is in the starting phase
            
            if(inpformat.test(command)){//if input is in the correct format
                var error =gameStart( command,player1,player2,turn);
                if(!error){
                turn+=1;
                }
            }
            else{
                console.log("Invalid input");
            }
        
        
    }
    else if(!player1.status &&!player2.status) {//if game is in the playing phase and one of the players has lost or won
        var startRow=parseInt(command.substring(1))
        var startCol=command.substring(0,1);
        if(turn%2==0){ 
           //player1's turn
     
            player1.fire([startRow,startCol],player2);//fire at player2
           //
            turn++;
            if(player1.status){
                displayEndGameStatus(player1,player2);//display the end game status
                console.log("thanks for playing");
                input.close();
                return;
            }
            else{
                console.log("Player2: Enter coordinates to hit (e.g. A1)");
            }
          
           

        }
        else{ //player2's turn
            player2.fire([startRow,startCol],player1);
            
            turn++;
            if(player1.status){
                displayEndGameStatus(player1,player2);
                console.log("thanks for playing");
                input.close();
                return;
            }
            else{
                console.log("Player1: Enter coordinates to hit (e.g. A1)");
            }
            

        }
    }
        if(turn==2){
            start=false;
        }


       
        
   
        
    });
}
mainLoop();