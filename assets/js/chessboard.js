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

const colors = {
    WHITE: "white",
    BLACK: "black"
}

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

    hasPiece(x, y) {
        return ( board.getPiece(x + i, y + i) ? true : false );
    }
    setPiece(x, y, piece) {
        this._gameboard[y * this.width + x] = piece;
    }

    movePiece(srcX, srcY, destX, destY) {
        this.setPiece(destX, destY, this.getPiece(srcX, srcY));
        this.setPiece(srcX, srcY, null);
    }

    // Consider Refactor
    getWhitePieces() {
        let pieces = new Map(6);
        pieces["K"] = new King(colors.WHITE, "♚")
        pieces["Q"] = new Queen(colors.WHITE, "♛")
        pieces["R"] = new Rook(colors.WHITE, "♜")
        pieces["B"] = new Bishop(colors.WHITE, "♝")
        pieces["N"] = new Knight(colors.WHITE, "♞")
        pieces["P"] = new Pawn(colors.WHITE, "♟")
        return pieces;
    }

    getBlackPieces() {
        let pieces = new Map(6);
        pieces["K"] = new King(colors.BLACK, "♔")
        pieces["Q"] = new Queen(colors.BLACK, "♕")
        pieces["R"] = new Rook(colors.BLACK, "♖")
        pieces["B"] = new Bishop(colors.BLACK, "♗")
        pieces["N"] = new Knight(colors.BLACK, "♘")
        pieces["P"] = new Pawn(colors.BLACK, "♙")
        return pieces;
    }

    resetBoard() {
        this.clearBoard();

        this.setPiece(0, 0, new Rook(colors.BLACK, "♜"));
        this.setPiece(1, 0, new Knight(colors.BLACK, "♞"));
        this.setPiece(2, 0, new Bishop(colors.BLACK, "♝"));
        this.setPiece(3, 0, new Queen(colors.BLACK, "♛"));
        this.setPiece(4, 0, new King(colors.BLACK, "♚"));
        this.setPiece(5, 0, new Bishop(colors.BLACK, "♝"));
        this.setPiece(6, 0, new Knight(colors.BLACK, "♞"));
        this.setPiece(7, 0, new Rook(colors.BLACK, "♜"));
        
        for(let i = 0; i < 8; i++)
            this.setPiece(i, 1, new Pawn(colors.BLACK, "♟"))

        this.setPiece(0, 7, new Rook(colors.WHITE, "♖"));
        this.setPiece(1, 7, new Knight(colors.WHITE, "♘"));
        this.setPiece(2, 7, new Bishop(colors.WHITE, "♗"));
        this.setPiece(3, 7, new Queen(colors.WHITE, "♕"));
        this.setPiece(4, 7, new King(colors.WHITE, "♔"));
        this.setPiece(5, 7, new Bishop(colors.WHITE, "♗"));
        this.setPiece(6, 7, new Knight(colors.WHITE, "♘"));
        this.setPiece(7, 7, new Rook(colors.WHITE, "♖"));

        for(let i = 0; i < 8; i++)
            this.setPiece(i, 6, new Pawn(colors.WHITE, "♙"))
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