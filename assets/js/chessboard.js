/**
 * An ADT Simulating a Chessboard
 * 
 * Internally we are ditching the standard chess notation for rows and columns
 * in favor of an x,y coordinate system based on the black queenside rook to simplify
 * calculations. All requests requiring serialization of the data should convert all
 * coordinates to the appropriate chess notation.
*/

// Todo: add logic to determine if a square puts a king in check
// Todo: add logic for if a king is in check
// Todo: Check for checkmate and end game
class Chessboard {
    constructor() {
        this._gameboard = new Array(64);
        this.height = 8;
        this.width = 8;
        this.clearBoard();
    }

    getDisplay(x, y) {
        if( this.getPiece(x, y) )
            return this.getPiece(x, y).display;
        else
            return "";
    }

    getPiece(x, y) {
        return this._gameboard[this.width * y + x];
    }

    setPiece(x, y, piece) {
        this._gameboard[y * this.width + x] = piece;
    }

    movePiece(srcX, srcY, destX, destY) {
        this.setPiece(destX, destY, this.getPiece(srcX, srcY));
        this.setPiece(srcX, srcY, null);
    }

    getWhitePieces() {
        let pieces = new Map(6);
        pieces["K"] = new King(true, "♚")
        pieces["Q"] = new Queen(true, "♛")
        pieces["R"] = new Rook(true, "♜")
        pieces["B"] = new Bishop(true, "♝")
        pieces["N"] = new Knight(true, "♞")
        pieces["P"] = new Pawn(true, "♟")
        return pieces;
    }

    getBlackPieces() {
        let pieces = new Map(6);
        pieces["K"] = new King(false, "♔")
        pieces["Q"] = new Queen(false, "♕")
        pieces["R"] = new Rook(false, "♖")
        pieces["B"] = new Bishop(false, "♗")
        pieces["N"] = new Knight(false, "♘")
        pieces["P"] = new Pawn(false, "♙")
        return pieces;
    }

    resetBoard() {
        this.clearBoard();

        this.setPiece(0, 0, new Rook(false, "♜"));
        this.setPiece(1, 0, new Knight(false, "♞"));
        this.setPiece(2, 0, new Bishop(false, "♝"));
        this.setPiece(3, 0, new Queen(false, "♛"));
        this.setPiece(4, 0, new King(false, "♚"));
        this.setPiece(5, 0, new Bishop(false, "♝"));
        this.setPiece(6, 0, new Knight(false, "♞"));
        this.setPiece(7, 0, new Rook(false, "♜"));
        
        for(let i = 0; i < 8; i++)
            this.setPiece(i, 1, new Pawn(false, "♟"))

        this.setPiece(0, 7, new Rook(true, "♖"));
        this.setPiece(1, 7, new Knight(true, "♘"));
        this.setPiece(2, 7, new Bishop(true, "♗"));
        this.setPiece(3, 7, new Queen(true, "♕"));
        this.setPiece(4, 7, new King(true, "♔"));
        this.setPiece(5, 7, new Bishop(true, "♗"));
        this.setPiece(6, 7, new Knight(true, "♘"));
        this.setPiece(7, 7, new Rook(true, "♖"));

        for(let i = 0; i < 8; i++)
            this.setPiece(i, 6, new Pawn(true, "♙"))
    }    

    clearBoard() {
        for(let row = 0; row < 8; row++)
        {
            for(let col = 0; col < 8; col++)
            {
                this.setPiece(row, col, null);
            }
        }
    }

    printBoard() {
        for(let row = 0; row < this.height; row++)
        {
            console.log(this._gameboard.slice(row * this.width, row * this.width + this.width));
        }
    }
}