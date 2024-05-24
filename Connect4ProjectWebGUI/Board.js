//Board Class
class Board{
    constructor(){
        this.rows = 6;
        this.cols = 7;
        this.board = new Array(this.rows);
        
        for(let i=0; i<this.rows; i++){
            this.board[i] = new Array(this.cols).fill(' ');
        }
    }
}

const b = new Board();

const taketurn = document.getElementById('turn');

taketurn.addEventListener('click',placeChip);

//Computer Turn
function cTurn(){
    const mode= 4;
    for(let i=(mode-1); i>1; i--){
        //Horizontal
        if(checkH(i)!==-1){
            //console.log(checkH(i));
            return checkH(i);
        }
        //Vertical
        if(checkV(i)!==-1){
            //console.log(checkV(i));
            return checkV(i);
        }
        //Diagonal
        if(checkD(i)!==-1){
            //console.log(checkD(i));
            return checkD(i);
        }
    }

    //Random
    //console.log(rTurn());
    return (rTurn());
}

//Placing Chip;
function placeChip(){
    event.preventDefault();
    column = cTurn();
    column--;
    
    for(let i=b.rows-1; i>0; i--){
        if(b.board[i][column] === ' '){
            b.board[i][column] = 'C';
            break;
        }
    }
    showBoard();
}

//Display Board
function showBoard(){
    for(let i=0; i<b.rows; i++){
        console.log(b.board[i]);
    }
}

//Random Computer Turn
function rTurn(){
    let column=0;
    let valid = false;
    
    do{
        column = Math.floor(Math.random()*7);
        if(b.board[0][column]!==' '){
            valid =false;
        }
        else{
            valid = true;
        }
    }while(valid === false);
    
    
    return column+1;
}

//Checking horizontal sequences in the board
function checkH(num){
    tracker = 1;
    rows = b.rows;
    cols = b.cols;
    
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
           //If two adjacent slots are the same and not empty
           if(j<cols-1 && b.board[i][j]===b.board[i][j+1] && b.board[i][j]!==' '){ 
               if(tracker===1){  
                   begin=j; //Tracking first chip of sequence
               }
               tracker++; //Incrementing for each identical adjacent chip
               if(tracker===num){
                   end=j+1; //Tracking last element of sequence
                   
                   //If there are open slots on either side of sequence
                   //And if there are chips directly under those slots
                   //(cannot be last row or else checking out of bounds)
                   if(i<rows-1 && b.board[i][begin-1]===' ' && b.board[i+1][begin-1]!==' '){
                       select=begin;
                       return select;
                   }
                   if(i<rows-1 && b.board[i][end+1]===' ' && b.board[i+1][end+1]!==' '){
                       select=end+2;
                       return select; 
                   }
                   
                   //If it's the last row, only check left and right sides
                   if(i===rows-1 && b.board[i][begin-1]===' '){
                       select=begin; //Left side
                       return select;
                   }
                   if(i===rows-1 && b.board[i][end+1]===' '){
                       select=end+2; //Right Side
                       return select;  
                   }
               }
           }
           //Resetting tracker when adjacent slots don't match or are empty
           else{
               tracker=1;
           }
        }
    }
    return -1;
}

function checkV(num){
   tracker=1;
   rows = b.rows;
   cols = b.cols;
   mode = 4;
   
   for(let j=0; j<cols; j++){
       for(let i=rows-1; i>0; i--){
           for(let k=1; k<4 && i-k>=0; k++){
               if(b.board[0][j]===' '){
                   //Iterating vertically through each column
                   if(b.board[i][j]!==' ' && b.board[i][j]===b.board[i-k][j] && i-k<rows){
                        tracker++;
                         //If the slot above the sequence is open
                        if(tracker===num && b.board[i-num][j]===' '){
                        return j+1;
                        }
                    }
               }

           }
           tracker=1;
       }
    }
   
   return -1;
}

function checkD(num){
    tracker=1;
    left = 0;
    right = 0;
    rows = b.rows;
    cols = b.cols;
    mode = 4;
    //Checking top-half / diagonals
    for(let i=rows-1; i>=mode; i--){
        for(let j=0; j<i; j++){
            //If next diagonal is matching and not empty
            if(b.board[i-j][j]===b.board[i-(j+1)][j+1] && b.board[i-j][j]!==' '){
                tracker++;
                //If sequence is one-from winning
                if(tracker===num){
                    //Checking right side
                    //If next column is valid
                    if(i-j-2>=0 && j+1<cols){
                        //If next in sequence is open and has chip underneath
                        if(b.board[i-j-2][j+2]===' ' && b.board[i-j-1][j+2]!==' '){
                            right=j+2;
                            return right+1;
                        }
                    }
                    
                    //Checking left side of diagonal
                    //Boundary check and not last diagonal
                    if(i-j+(num-1)<rows-1 && j-(num-1)>=0){
                        if(b.board[i-j+(num-1)][j-(num-1)]===' ' && b.board[i-j+num][j-(num-1)]!==' '){
                            left=j-(num-1);
                            return left+1;
                        }
                    }
                    //Last row doesn't need to check for chip beneath it
                    if(i-j+(num-1)===rows-1 && j-(num-1)>=0){
                        if(b.board[i-j+(num-1)][j-(num-1)]===' '){
                            left=j-(num-1);
                            return left+1;
                        }
                    }
                }
            }
            else{
                tracker=1;
            }
        }
    }
    
    //Checking bottom-half / diagonals
    for(let j=1; j<cols-1; j++){
        let i=rows-1;
        for(let k=0; j+k<cols-1; k++){
            //Checking next diagonal
            if(b.board[i-k][j+k]!==' ' && b.board[i-k][j+k]===b.board[i-(k+1)][j+k+1]){
                tracker++;
                //One from winning
                if(tracker===num){
                    //Checking right side of diagonal
                    //If within bounds
                    if(i-(k+2)>=0 && j+k+2<=cols-1){
                        //If next diagonal is empty & slot below is not empty
                        if(b.board[i-(k+2)][j+k+2]===' ' && b.board[i-(k+1)][j+k+2]!==' '){
                            right=j+k+3;
                            return right;
                        }
                    }
                 
                    //Checking left side of diagonals
                    //If above last row & within bounds
                    if(i-k+(num-1)<rows-2 && j+k-(num-1)>0){
                        //Loop stops 2 elements early, so mode-2
                        //Checking if diagonal to the bottom left is open, and underneath is filled
                        if(b.board[i+(num-1)][j-(num-1)]===' ' && b.board[i+num][j-(num-1)]!==' '){
                            left=j+k-(num-1);
                            return left+1;
                        }
                    }
                    //If last row and within bounds
                    if(i-k+(num-1)===rows-1 && j+k-(num-1)>0){
                        //If the bottom left of the sequence is open 
                        if(b.board[i-k+(num-1)][j+k-(num-1)]===' '){
                            left=j+k-(num-1); 
                            return left+1;
                        }
                    }
                }
            }
            else{
                tracker=1;
            }
        }
    }
    
    //Checking top-half \ diagonals
    for(let j=1; j<cols-1; j++){
        for(let k=0; j+k<cols-1; k++){
            //Checking one down and one right
            if(b.board[k][j+k]===b.board[k+1][j+k+1] && b.board[k][j+k]!==' '){
                tracker++;
                //One away from win
                if(tracker===num){
                    //Right side of diagonals
                    //Diagonals above last row
                    if(k+2<rows-1 && j+k+2<cols-1){
                        //If next diagonal is empty and has chip beneath
                        if(b.board[k+2][j+k+2]===' ' && b.board[k+3][j+k+2]!==' '){
                            right=j+k+2;
                            return right+1;
                        }
                    }
                    //Last row diagonal doesn't check for chip beneath
                    if(k+2===rows-1){
                        if(b.board[k+2][j+k+2]===' '){
                            right=j+k+2;
                            return right+1;      
                        }
                    }
                    //Left side of diagonals
                    if(k-(mode-2)>=0 && j+k-(mode-2)>0){
                        if(b.board[k-(num-1)][j+k-(num-1)]===' ' && b.board[k-(num-1)+1][j+k-(num-1)]!==' '){
                            left=j+k-(num-1);
                            return left+1;
                        }
                    }
                }
            }
            else{
                tracker=1;
            }
        }
    }
    
    //Checking bottom-half \ diagonals
    for(let i=0; i<rows-1; i++){
        for(let k=0; k+i<rows-1; k++){
            //One down and one right
            if(b.board[i+k][k]===b.board[i+k+1][k+1] && b.board[i+k][k]!==' '){
                tracker++;
                //One from win
                if(tracker===num){
                    //Right side of diagonals
                    //Diagonal above last row
                    if(i+k+2<rows-1 && k+2<cols-1){
                        //Checking next diagonal and slot beneath
                        if(b.board[i+k+2][k+2]===' ' && b.board[i+k+3][k+2]!==' '){
                            right=k+2;
                            return right+1;
                        }
                    }
                    //Diagonal on last row
                    if(i+k+2===rows-1 && k+2<cols-1){
                        //Only checking next diagonal on last row
                        if(b.board[i+k+2][k+2]===' '){
                            right=k+2;
                            return right+1;
                        }
                    }
                    
                    //Left side of diagonals
                    if(i+k-(num-1)>=0 && k-(num-1)>=0 && i+k-(num-1)+1<rows-1){
                        //Checking left of diagonal and if underneath has a chip
                        if(b.board[i+k-(num-1)][k-(num-1)]===' ' && b.board[i+k-(num-1)+1][k-(num-1)]!==' '){
                            left=k-(num-1);
                            return left+1;
                        }
                    }
                }
            }
            else{
                tracker=1;
            }
        }
    }
    

   return -1;
}
