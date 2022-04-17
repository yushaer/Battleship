/**
 * @author: Yushae raza
 * @description: class to create grid
 */
class Grid {
    #_gridSize;
     
    #_cells;

    #letters=[ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    
     /**
      *constructor for the grid
      * @param {Number} gridSize - size of the grid
      */
    constructor(gridSize) {
        this.#_gridSize = gridSize;
  
        this.#_cells = [this.#_gridSize, this.#_gridSize];
        this.init();
    }
    /**
     * returns the grid size
     */
    get gridSize() {
         return this.#_gridSize;
    }
    /**
     * sets the grid size
     * @param {Number} gridSize- size of the grid
     */
    set gridSize(gridSize) {
            this.#_gridSize = gridSize;
    }
    set cells(cells) {
        this.#_cells = cells;
    }
    get cells() {
        return this.#_cells;
    }

   /**
    * sets the grid cell
    * @param {Number} row - row index
    * @param {Number} col - column index
    * @param {Number} value - value to be set
    */
    setCell(row, col, value) {
        this.#_cells[row][col] = value;
    }
    /**
     * 
     * @param {Number} row - row index
     * @param {Number} col - column index
     * @returns cell -  
     */
    getCell(row, col) {
        return this.#_cells[row][col];
    }
   
/**
 * 
 * @param {Char} letter - letter to be converted to index 
 * @returns {Number} - index of the letter
 */
    getColIndex(letter){
        return this.#letters.indexOf(letter);
    }
    /**
     * initializes the grid
     */
    
    init() {
        for (var row = 0; row < this.gridSize; row++) {
            this.cells[row] = [];
            for (var col = 0; col <this.gridSize; col++) {
                this.cells[row][col] = "~";
            }
        }
    }
    
  /**
   * prints the grid
   */
    display() {
        process.stdout.write("  ");
        for(let i=0; i<this.gridSize; i++){//printing the letters
            process.stdout.write(`${this.#letters[i]} `);
        }
        process.stdout.write("\n");
        var count = 1;
        for (let x = 0; x < this.gridSize; x++) {//printing the numbers

            process.stdout.write(`${count} `);
            for (let y = 0; y < this.gridSize; y++) {//printing the grid
                process.stdout.write(`${this.cells[x][y]} `);
            }
            count+=1;
            process.stdout.write("\n");
        }

    }

    
}
export default Grid;