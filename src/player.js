import Grid from './grid.js';
/**
 * 
 * class Player
 * @Author: Yushae Raza
 * @Description: player class
 * 
 */
class Player{
    #_ships; 
    #_shipCount;

    #_status;
    #_grid;
    #_ship;
   
   /**
    * player constructor
    * 
    */
   
    constructor(){
        this.#_ships=[];
        this.#_shipCount=0;
        this.#_grid = new Grid(8);
        this.grid.init();
    }
    /**
     *  returns the ship object
     * @param {Array<Number>} cordinates 
     * @param {Number} lenght 
     * @param {Ship} direction 
     */
    #ship(cordinates,lenght,direction){
        this.cordinates = cordinates;
        this.lenght = lenght;
        this.direction = direction;
        this.destroyed = false;

    }
/**
 * reduces the ship length by 1 and if the ship count is 0 then the player has lost
 * @param {index} ship_idx 
 */

    damage(ship_idx ) {
     
        if(this.#_ship.length-1>0){
            this.#_ship.length-=1;
        }
        else{
            this.#_ship.destroyed = true;

            this.status='lost';

        }

    }

/**
 * 
 *  places the ships on the grid
 * @param {Array} cordinates - cordinates of the ship 
 * @param {Array} endcordinates - end cordinates of the ship
 * @param {Number} length - length of the ship
 * @param {String} direction - direction of the ship
 * @returns error message if the ship is not placed
 *  
 */    
  placeShip(cordinates,endcordinates,length,direction){  

        this.#_shipCount+=1;
        const start_row_index =  cordinates[0]-1;
        const start_col_index =  this.grid.getColIndex(cordinates[1]);
      
        const end_row_index =  endcordinates[0]-1;
        const end_col_index =  this.grid.getColIndex(endcordinates[1]);
        var cordinates=[];
       
        if(direction == "H"){
            if(Math.abs(start_col_index-end_col_index)>length-1 || Math.abs(start_col_index-end_col_index)<length-1){
               console.log("Cordinates are not valid of valid length");
               return "error";
            }
            if(start_row_index == end_row_index){//same row
                if(start_col_index<end_col_index){//placing ship to the right
                    for(let i=start_col_index;i<=end_col_index;i++){
                        this.grid.setCell(start_row_index,i,"S");
                        cordinates.push([start_row_index,i]);
                    }
                
                }
                else{
                    for(let i=end_col_index;i<=start_col_index;i++){//placing ship to the left
                        this.grid.setCell(start_row_index,i,"S");
                        cordinates.push([start_row_index,i]);
                    }

                }
            }
            else{
                console.log("invalid cordinates");
                return "error";

            }
        }
        else{
            if(Math.abs(start_row_index-end_row_index)>length-1 || Math.abs(start_row_index-end_row_index)<length-1){
               console.log("Cordinates are not valid of valid length");
               return "error";
            }
            if(start_col_index == end_col_index){//same column or vertical ship
                if(start_row_index<end_row_index){//placing ship to the bottom
                    for(let i=start_row_index;i<=end_row_index;i++){
                        this.grid.setCell(i,start_col_index,"S");
                        cordinates.push([i,start_col_index]);
                    }
                }
                else{
                    for(let i=end_row_index;i<=start_row_index;i++){    //placing ship to the top
                        this.grid.setCell(i,start_col_index,"S");
                        cordinates.push([i,start_col_index]);
                    }
                }
            }
            else{
                console.log("invalid cordinates");
                return "error";
                
            }
        }
    
        this.#_ship={
            cordinates:[[start_row_index,start_col_index],[end_row_index,end_col_index]],
            length:length,
            direction:direction,

        }
  
   
        this.#_ships.push(this.#_ship);
    }
      arraysEqual(a, b) {
        a = Array.isArray(a) ? a : [];
        b = Array.isArray(b) ? b : [];
        return a.length === b.length && a.every((el, ix) => el === b[ix]);
      }
      /**
       * function that fires on the enemy grid and checks if the player has hit a ship
       * @param {Array} cordinates - cordinates of the ship
       * @param {Player} enemy - enemy player
       */
    fire(cordinates,enemy){
        const col_index = this.grid.getColIndex( cordinates[1]);//get the column index
        if(enemy.grid.getCell(cordinates[0]-1,col_index) == "S"){//if the cell is a ship
        

            enemy.grid.setCell(cordinates[0]-1,col_index,"X");//set the enemy grid cell to X indicating hit
          console.log("hit");
         
            enemy.damage(enemy.getShipIndex(cordinates));//damage the ship
            if(enemy.status == 'lost'){//if the enemy has lost
                this.status = 'won';//set the player status to won
              
            }
             
        }
        else{
            enemy.grid.setCell(cordinates[0]-1,col_index,"O");
            console.log("miss");
            
        }
       
    }
    /**
     *  
     * @returns {Array} ships
     */
    get ships(){
        return this.#_ships;
    }
    /**
     * returns the player status
     * @returns {String} status
     */
    get status(){
        return this.#_status;
    }
    /**
     * sets the player status
     * @param {String} status- status of the player
     * 
     */
    set status(status){
        this.#_status = status;
    }
    /**
     * sets the player grid
     * @param {Grid} grid - grid of the player
     */
    set grid(grid){
        this.#_grid = grid;
    }
    /**
     * returns the player grid
     * @returns {Grid} grid
     */
    get grid(){
        return this.#_grid;
    }
    /**
     * gets the ship index from the ships array based on the cordinates
     * @param {array} cordinates - cordinates of the ship
     * @returns ship index
     */
    getShipIndex(cordinates){
        for(let i=0;i<this.#_ships.length;i++){
            for(const element of this.#_ships[i].cordinates){
                if( this.arraysEqual(element,cordinates)){
                    return i;
                }
            }

            
        }
        return -1;
    }


}
export default Player