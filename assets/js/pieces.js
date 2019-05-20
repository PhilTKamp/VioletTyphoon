/**
 * All classes of ChessPiece use an (x,y) coordinate system based at the 
 * black queenside rook to simplify calculations, this is instead of the 
 * standard algebraic notation. Additionally pieces use the standard 
 * abbreviations for chess pieces: K = King, Q = Queen, B = Bishop, N = Knight,
 * R = Rook, P = Pawn
 */

function getDiagonals(x, y, board) {
    let i = 1;
    let stop = false;

    //Iterate through each coordinate quadrant, centered on piece stopping    
    // Quadrant I
    while(x + i < 8 && y + i < 8 && !stop)
    {
        if(board[x + i][y + i]) 
            stop = true;
        
        moves.push({
            x : x + i,
            y : y + i
        });
        i++;
    }
    
    i = 1;
    stop = false;
    
    // Quadrant II
    while(x - i >= 0 && y + i < 8 && !stop)
    {
        if(board[x - i][y + i])
            stop = true;
        
        moves.push({
            x : x - i,
            y : y + i
        });
        i++;
    }
    
    i = 1;
    stop = false;
    
    // Quadrant III
    while(x - i >= 0 && y - i >= 0 && !stop)
    {
        if(board[x - i][y - i])
            stop = true;
        
        moves.push({
            x : x - i,
            y : y - i
        });
        i++;
    }
    
    
    i = 1;
    stop = false;
    
    // Quadrant IV
    while(x + i < 8 && y - i >= 0 && !stop)
    {
        if(board[x + i][y - i])
            stop = true;
        
        moves.push({
            x : x + i,
            y : y - i
        });
        i++;
    }
    
    return moves;
}

function getHorizontals(x, y, board) {
    let moves = [];

    let i = y + 1;
    //Generate the horizontal and vertical moves
    while( i < 8 && !stop)
    {
        if(board[x][i]) 
            stop = true;

        moves.push({
            x : x,
            y : i
        })
        i++;
    }

    stop = false;
    i = y - 1;
    
    while(i >= 0 && !stop)
    {
        if(board[x][i])
            stop = true;
        
        moves.push({
            x : x,
            y: i
        })
        i--;
    }

    i = x + 1
    while( i < 8 && !stop)
    {
        if(board[i][y]) 
            stop = true;

        moves.push({
            x : i,
            y : y
        })
        i++;
    }

    stop = false;
    i = y - 1;
    
    while(i >= 0 && !stop)
    {
        if(board[i][y])
            stop = true;
        
        moves.push({
            x : i,
            y: y
        })
        i--;
    }

    return moves;
}

class ChessPiece {
    constructor(isWhite, display, name) {
        this.name = name;
        this.isWhite = isWhite;
        this.display = display;
    }

    /** 
     * @param {in} x 
     * @param {in} y 
     * @param {in} board 
     * 
     * @returns Oject array of each potential coodinate for a move form [{ x: val, y: val}]
     */
    getPotentialMoves(x, y, board) {
        console.log("getPossibleMoves not implemented");
        return new Array(0);
    }
}

class Bishop extends ChessPiece {
    constructor(isWhite, display) {
        super(isWhite, display, "B");
    }
    
    getPotentialMoves(x, y, board) {
        let moves = [];

        moves.push(...getDiagonals(x, y, board));
        
        return moves;
    }
}

class King extends ChessPiece {
    constructor(isWhite, display) {
        super(isWhite, display, "K");
    }

    getPotentialMoves(x, y, board) {
        let moves = [];

        for(let col = x - 1; col <= x + 1; col++) {
            for( let row = y - 1; row <= y + 1; row++) {
                if(row >= 0 && row < 8 && col >= 0 && row < 8) {
                    moves.push({
                        x : col,
                        y : row 
                    });
                }
            }
        }

        return moves;
    }
}

// Todo: add castling logic, prevent from moving into check
class Knight extends ChessPiece {
    constructor(isWhite, display) {
        super(isWhite, display, "N");
    }

    getPotentialMoves(x, y, board) {
        const knightDeltas = [ [1, 3], [3, 1], [3, -1], [1, -3], [-1, -3], [-3, -1], [-3, 1], [3, -1] ];

        let moves = knightDeltas.map((move) => {
            return {
                x : x + move[0],
                y : y + move[1]
            };
        })

        return moves;
    }
}

class Queen extends ChessPiece {
    constructor(isWhite, display) {
        super(isWhite, display, "Q");
    }
    
    getPotentialMoves(x, y, board) {
        let moves = [];

        moves.push(...getDiagonals(x, y, board));
        moves.push(...getHorizontals(x, y, board));
        
        return moves;
    }
}

class Rook extends ChessPiece {
    constructor(isWhite, display) {
        super(isWhite, display, "R");
    }

    getPotentialMoves(x, y, board) {
        let moves = [];
        moves.push(...getHorizontals(x, y, board));
        return moves;
    }
}

// Todo: Check for capturing, and not jumping pieces
class Pawn extends ChessPiece {
    
    constructor(isWhite, display) {
        super(isWhite, display, "P");
    }
    
    getPotentialMoves(x, y, board) {
        let moves = [];
        
        if(this.isWhite) {
            moves.push({
                x : x,
                y : y - 1 
            });

            if(y == 6 && !board[x][5]) {
                moves.push({ 
                    x : x,
                    y : y - 2 
                });
            }
        }
        else {
            moves.push({
                x : x,
                y : y + 1
            });

            if(y == 1 && !board[x][2]) {
                moves.push({
                    x : x,
                    y : y + 2
                });
            }
        }

        return moves;
    }
}
