/**
 * All classes of ChessPiece use an (x,y) coordinate system based at the 
 * black queenside rook to simplify calculations, this is instead of the 
 * standard algebraic notation. Additionally pieces use the standard 
 * abbreviations for chess pieces: K = King, Q = Queen, B = Bishop, N = Knight,
 * R = Rook, P = Pawn
 */

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
     * @returns Oject array of each potential coodinate for a move form [{ "x": val, "y": val}]
     */
    getPotentialMoves(x, y, board) {
        console.log("getPossibleMoves not implemented");
        return new Array(0);
    }
}

//Copy Paste Template for the derived classes
class XYZ extends ChessPiece {
    constructor(isWhite, display) {
        super(isWhite, display, "X");
    }

    getPotentialMoves(x, y, board) {
        let moves = [];

        return moves;
    }
}

class Bishop extends ChessPiece {
    constructor(isWhite, display) {
        super(isWhite, display, "B");
    }

    getPotentialMoves(x, y, board) {
        let moves = [];
        let i = 1;

        //Iterate through each coordinate quadrant, centered on piece stopping
        let stop = false;

        // Quadrant I
        while(x + i < 8 && y + i < 8 && !stop)
        {
            if(board[x + i][y + i])
            {
                stop = true;
            }

            moves.push({
                "x" : x + i,
                "y" : y + i
            });
        }

        i = 1;
        stop = false;

        // Quadrant II
        while(x - i >= 0 && y + i < 8 && !stop)
        {
            if(board[x - i][y + i])
            {
                stop = true;
            }

            moves.push({
                "x" : x - i,
                "y" : y + i
            });
        }

        i = 1;
        stop = false;

        // Quadrant III
        while(x - i >= 0 && y - i >= 0 && !stop)
        {
            if(board[x - i][y - i])
            {
                stop = true;
            }

            moves.push({
                "x" : x - i,
                "y" : y - i
            });
        }


        i = 1;
        stop = false;

        // Quadrant IV
        while(x + i < 8 && y - i >= 0 && !stop)
        {
            if(board[x + i][y - i])
            {
                stop = true;
            }

            moves.push({
                "x" : x + i,
                "y" : y - i
            });
        }

        return moves;
    }
}

class Pawn extends ChessPiece {
    constructor(isWhite, display) {
        super(isWhite, display, "P");
    }

    getPotentialMoves(x, y, board) {
        let moves = [];

        if(this.isWhite) {
            moves.push({
                "x" : x,
                "y" : y - 1 
            });

            if(y == 6 && !board[x][5]) {
                moves.push({ 
                    "x" : x,
                    "y" : y - 2 
                });
            }
        }
        else {
            moves.push({
                "x" : x,
                "y" : y + 1
            });

            if(y == 1 && !board[x][2]) {
                moves.push({
                    "x" : x,
                    "y" : y + 2
                });
            }
        }

        return moves;
    }
}