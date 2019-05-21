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
        this.pieces = new Array(0);
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
    getBasePieces(color, displays) {
        let pieces = new Array(0);
        pieces.push( new Rook(0, color, displays[0]) );
        pieces.push( new Knight(1, color, displays[1]) );
        pieces.push( new Bishop(2, color, displays[2]) );
        pieces.push( new King(3, color, displays[3]) );
        pieces.push( new Queen(4, color, displays[4]) );
        pieces.push( new Bishop(5, color, displays[5]) );
        pieces.push( new Knight(6, color, displays[6]) );
        pieces.push( new Rook(7, color, displays[7]) );

        for(let i = 0; i < 8; i++)
            pieces.push( new Pawn(8 + i, color, displays[8]) );

        return pieces;
    }

    resetBoard() {
        this.clearBoard();
        const blackDisplays = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜", "♟" ];
        const whiteDisplays = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖", "♙" ];

        let blackPieces = getBasePieces(colors.BLACK, blackDisplays);

        blackPieces.forEach((piece, index) => {
            this.setPiece(index / 8, index % 8, piece);
        });

        let whitePieces = getBasePieces(colors.WHITE, whiteDisplays);

        whitePieces.forEach((piece, index) => {
            this.setPiece(6 + index / 8, index % 8, piece);
        });
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