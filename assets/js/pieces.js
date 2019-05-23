/**
 * All classes of ChessPiece use an (x,y) coordinate system based at the 
 * black queenside rook to simplify calculations, this is instead of the 
 * standard algebraic notation. Additionally pieces use the standard 
 * abbreviations for chess pieces: K = King, Q = Queen, B = Bishop, N = Knight,
 * R = Rook, P = Pawn
 */

//  TODO: Extract if statement function from Pawn, King and Knight Potential Moves

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
    constructor(id, color, name, x = -1, y = -1) {
        this.id = id;
        this.color = color;
        this.name = name;
        this.x = x;
        this.y = y;
    }

    /** 
     * @param {in} x 
     * @param {in} y 
     * @param {in} board 
     * 
     * @returns Object array of each potential coodinate for a move form [{ x: val, y: val}]
     */
    getPotentialMoves(board) {
        console.log("getPossibleMoves not implemented");
        return new Array(0);
    }
}

class Bishop extends ChessPiece {
    constructor(id, color, x, y) {
        super(id, color, "B", x, y);
    }
    
    getPotentialMoves(board) {
        let moves = [];
        
        moves.push(...getDiagonals(this.x, this.y, board));
        
        return moves;
    }
}

// Todo: add castling logic, prevent from moving into check
class King extends ChessPiece {
    constructor(id, color, x, y) {
        super(id, color, "K", x, y);
    }

    getPotentialMoves(board) {
        let moves = [];

        for(let col = this.x - 1; col <= this.x + 1; col++) {
            for( let row = this.y - 1; row <= this.y + 1; row++) {
                moves.push({
                    x : col,
                    y : row 
                });
            }
        }

        return moves.filter(inBounds).filter((coord) => {
            return (board.hasPiece(coord.x, coord.y) ? !alliedPieces(this.x, this.y, coord.x, coord.y, board) : true);
        });
    }
}

class Knight extends ChessPiece {
    constructor(id, color, x, y) {
        super(id, color, "N");
    }

    getPotentialMoves(board) {
        const knightDeltas = [ [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2] ];

        let moves = knightDeltas.map((move) => {
            return {
                x : this.x + move[0],
                y : this.y + move[1]
            };
        }).filter(inBounds).filter((coord) => {
            return (board.hasPiece(coord.x, coord.y) ? !alliedPieces(this.x, this.y, coord.x, coord.y, board) : true);
        });

        return moves;
    }
}

class Queen extends ChessPiece {
    constructor(id, color, x, y) {
        super(id, color, "Q", x, y);
    }
    
    getPotentialMoves(board) {
        let moves = [];

        moves.push(...getDiagonals(this.x, this.y, board));
        moves.push(...getHorizontals(this.x, this.y, board));
        
        return moves;
    }
}

class Rook extends ChessPiece {
    constructor(id, color, x, y) {
        super(id, color, "R", x, y);
    }

    getPotentialMoves(board) {
        let moves = [];
        moves.push(...getHorizontals(this.x, this.y, board));
        return moves;
    }
}

// Todo: Add en passant capture
class Pawn extends ChessPiece {
    
    constructor(id, color, x, y) {
        super(id, color, "P", x, y);
    }
    
    getPotentialMoves(board) {
        let moves = [];
        
        if(this.color == colors.WHITE) {
            if(!board.hasPiece(this.x, this.y-1)) {
                moves.push({
                    x : this.x,
                    y : this.y - 1 
                });

                // if(this.y == 6) {
                //     moves.push({ 
                //         x : this.x,
                //         y : this.y - 2 
                //     });
                // }
            }

            if(board.hasPiece(this.x-1, this.y-1)) {
                moves.push({
                    x : this.x - 1,
                    y : this.y - 1
                });
            }

            if(board.hasPiece(this.x+1, this.y-1)) {
                moves.push({
                    x : this.x + 1,
                    y : this.y - 1
                });
            }
        }
        else {
            if(!board.hasPiece(this.x, this.y+1)) {
                moves.push({
                    x : this.x,
                    y : this.y + 1
                });
                
                // if(this.y == 1) {
                //     moves.push({
                //         x : this.x,
                //         y : this.y + 2
                //     });
                // }
            }
            
            if(board.hasPiece(this.x-1, this.y+1)) {
                moves.push({
                    x : this.x - 1,
                    y : this.y + 1
                });
            }

            if(board.hasPiece(this.x+1, this.y+1)) {
                moves.push({
                    x : this.x + 1,
                    y : this.y + 1
                });
            }
                
        }
        
        return moves.filter(inBounds).filter((coord) => {
            return (board.hasPiece(coord.x, coord.y) ? !alliedPieces(this.x, this.y, coord.x, coord.y, board) : true);
        });;
    }
}

