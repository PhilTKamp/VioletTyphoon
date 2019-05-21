/**
 * All classes of ChessPiece use an (x,y) coordinate system based at the 
 * black queenside rook to simplify calculations, this is instead of the 
 * standard algebraic notation. Additionally pieces use the standard 
 * abbreviations for chess pieces: K = King, Q = Queen, B = Bishop, N = Knight,
 * R = Rook, P = Pawn
 */

function alliedPieces(x1, y1, x2, y2, board)
{
    return board.getPiece(x1, y1).color === board.getPiece(x2, y2).color;
}

function getDiagonals(x, y, board) {
    let i = 1;
    let stopQuadI = false;
    let stopQuadII = false;
    let stopQuadIIII = false;
    let stopQuadIV = false;
    let moves = [];

    while( i < 7 )
    {
        moves.push({
            x : x + i,
            y : y + i
        });

        if(board.hasPiece(x + i, y + i)) 
        {
            stop = true;
            if( alliedPieces(x, y, x + i, y + i, board) )
                moves.pop();
        }
        
        moves.push({
            x : x - i,
            y : y + i
        });
        
        if(board.hasPiece(x - i, y + i))
        {
            stop = true;
            if(alliedPieces(x, y, x - i, y + i, board))
                moves.pop();
        }

        moves.push({
            x : x - i,
            y : y - i
        });
        
        if(board.hasPiece(x - i, y - i))
        {
            stop = true;
            if( alliedPieces(x, y, x - i, y - i, board) )
                moves.pop();
        }

        moves.push({
            x : x + i,
            y : y - i
        });
        
        if(board.hasPiece(x + i, y - i))
        {
            stop = true;
            if( alliedPieces(x, y, x + i, y - i, board) )
            moves.pop();
        }

        i++;

    }        
    return moves.filter(inBounds);
}

function getHorizontals(x, y, board) {
    let moves = [];

    let i = y + 1;
    //Generate the horizontal and vertical moves
    while( i < 8 && !stop)
    {
        moves.push({
            x : x,
            y : i
        });

        if(board.getPiece(x, i))
        {
            stop = true;
            if(board.getPiece(x, y).isWhite == board.getPiece(x, i).isWhite)
                moves.pop();
        }

        i++;
    }

    stop = false;
    i = y - 1;
    
    while(i >= 0 && !stop)
    {
        moves.push({
            x : x,
            y: i
        });

        if(board.getPiece(x, i))
        {
            stop = true;
            if(board.getPiece(x, y).isWhite == board.getPiece(x, i).isWhite)
                moves.pop();
        }
        
        i--;
    }

    i = x + 1
    while( i < 8 && !stop)
    {
        moves.push({
            x : i,
            y : y
        });

        if(board.getPiece(i, y)) 
        {
            stop = true;
            if(board.getPiece(x, y).isWhite == board.getPiece(i, y).isWhite)
                moves.pop();
        }

        i++;
    }

    stop = false;
    i = y - 1;
    
    while(i >= 0 && !stop)
    {
        moves.push({
            x : i,
            y: y
        });

        if(board.getPiece(i, y))
        {
            stop = true;
            if(board.getPiece(x, y).isWhite == board.getPiece(i, y).isWhite)
                moves.pop();
        }
        
        i--;
    }

    return moves;
}

function inBounds(coord) {
    if(coord.x >= 0 && coord.x < 8 && coord.y >= 0 && coord.y < 8)
        return true;
    else
        return false;
}

// TODO Limit Piece moves based on check
class ChessPiece {
    constructor(id, color, display, name) {
        this.name = name;
        this.color = color;
        this.display = display;
        this.id = id;
    }

    /** 
     * @param {in} x 
     * @param {in} y 
     * @param {in} board 
     * 
     * @returns Object array of each potential coodinate for a move form [{ x: val, y: val}]
     */
    getPotentialMoves(x, y, board) {
        console.log("getPossibleMoves not implemented");
        return new Array(0);
    }
}

class Bishop extends ChessPiece {
    constructor(id, color, display) {
        super(id, color, display, "B");
    }
    
    getPotentialMoves(x, y, board) {
        let moves = [];
        
        moves.push(...getDiagonals(x, y, board));
        
        return moves;
    }
}

// Todo: add castling logic, prevent from moving into check
class King extends ChessPiece {
    constructor(id, color, display) {
        super(id, color, display, "K");
    }

    getPotentialMoves(x, y, board) {
        let moves = [];

        for(let col = x - 1; col <= x + 1; col++) {
            for( let row = y - 1; row <= y + 1; row++) {
                moves.push({
                    x : col,
                    y : row 
                });
            }
        }

        return moves.filter(inBounds);
    }
}

class Knight extends ChessPiece {
    constructor(id, color, display) {
        super(id, color, display, "N");
    }

    getPotentialMoves(x, y, board) {
        const knightDeltas = [ [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2] ];

        let moves = knightDeltas.map((move) => {
            return {
                x : x + move[0],
                y : y + move[1]
            };
        }).filter(inBounds).filter((coord) => {
            return (board.hasPiece(coord.x, coord.y) ? alliedPieces(x, y, coord.x, coord.y, board) : true);
        });

        return moves;
    }
}

class Queen extends ChessPiece {
    constructor(id, color, display) {
        super(id, color, display, "Q");
    }
    
    getPotentialMoves(x, y, board) {
        let moves = [];

        moves.push(...getDiagonals(x, y, board));
        moves.push(...getHorizontals(x, y, board));
        
        return moves;
    }
}

class Rook extends ChessPiece {
    constructor(id, color, display) {
        super(id, color, display, "R");
    }

    getPotentialMoves(x, y, board) {
        let moves = [];
        moves.push(...getHorizontals(x, y, board));
        return moves;
    }
}

// Todo: Check for capturing, and not jumping pieces
// Todo: Add en passant capture
class Pawn extends ChessPiece {
    
    constructor(id, color, display) {
        super(id, color, display, "P");
    }
    
    getPotentialMoves(x, y, board) {
        let moves = [];
        
        if(this.color == colors.WHITE) {
            if(!board.hasPiece(x, y-1))
            {
                moves.push({
                    x : x,
                    y : y - 1 
                });

                if(y == 6) {
                    moves.push({ 
                        x : x,
                        y : y - 2 
                    });
                }
            }
        }
        else {
            if(!board.hasPiece(x, y+1)) {
                moves.push({
                    x : x,
                    y : y + 1
                });

                if(y == 1) {
                    moves.push({
                        x : x,
                        y : y + 2
                    });
                }
            }
        }

        return moves;
    }
}
