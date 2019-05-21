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
    let stopQuadIII = false;
    let stopQuadIV = false;
    let moves = [];

    while( i < 8 ) {
        if(!stopQuadI) {
            moves.push({
                x : x + i,
                y : y + i
            });

            if(board.hasPiece(x + i, y + i)) 
            {
                stopQuadI = true;
                if( alliedPieces(x, y, x + i, y + i, board) )
                    moves.pop();
            }
        }

        if(!stopQuadII) {
            moves.push({
                x : x - i,
                y : y + i
            });
            
            if(board.hasPiece(x - i, y + i))
            {
                stopQuadII = true;
                if(alliedPieces(x, y, x - i, y + i, board))
                    moves.pop();
            }
        }

        if(!stopQuadIII) {
            moves.push({
                x : x - i,
                y : y - i
            });
            

            if(board.hasPiece(x - i, y - i))
            {
                stopQuadIII = true;
                if( alliedPieces(x, y, x - i, y - i, board) )
                    moves.pop();
            }
        }

        if(!stopQuadIV) {
            moves.push({
                x : x + i,
                y : y - i
            });
            
            if(board.hasPiece(x + i, y - i))
            {
                stopQuadIV = true;
                if( alliedPieces(x, y, x + i, y - i, board) )
                moves.pop();
            }
        }

        i++;
    }

    return moves.filter(inBounds);
}

function getHorizontals(x, y, board) {
    let moves = [];
    let stopPosX = false;
    let stopPosY = false;
    let stopNegX = false;
    let stopNegY = false;

    for(let i = 1; i < 8; i++)
    {
        if(!stopPosX) {
            moves.push({
                x : x + i,
                y : y
            });
    
            if(board.hasPiece(x + i, y))
            {
                stopPosX = true;
                if(alliedPieces(x, y, x + i, y, board))
                    moves.pop();
            }
        }
        
        if(!stopPosY) {
            moves.push({
                x : x,
                y : y + i
            });
    
            if(board.hasPiece(x, y + i))
            {
                stopPosY = true;
                if(alliedPieces(x, y, x, y + i, board))
                    moves.pop();
            }
        }

        if(!stopNegX) {
            moves.push({
                x : x - i,
                y : y
            });
    
            if(board.hasPiece(x - i, y))
            {
                stopNegX = true;
                if(alliedPieces(x, y, x - i, y, board))
                    moves.pop();
            }
        }

        if(!stopNegY) {
            moves.push({
                x : x,
                y : y - i
            });
    
            if(board.hasPiece(x, y - i))
            {
                stopNegY = true;
                if(alliedPieces(x, y, x, y - i, board))
                    moves.pop();
            }
        }
    }

    return moves.filter(inBounds);
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

        return moves.filter(inBounds).filter((coord) => {
            return (board.hasPiece(coord.x, coord.y) ? !alliedPieces(x, y, coord.x, coord.y, board) : true);
        });
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
            return (board.hasPiece(coord.x, coord.y) ? !alliedPieces(x, y, coord.x, coord.y, board) : true);
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
