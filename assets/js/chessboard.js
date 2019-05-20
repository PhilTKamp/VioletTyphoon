/**  
 * Internally we are ditching the standard chess notation for rows and columns
 * in favor of an x,y coordinate system based on the black queenside rook to simplify
 * calculations. All requests requiring serialization of the data should convert all
 * coordinates to the appropriate chess notation.
*/

// Todo: add logic to determine if a square puts a king in check
// Todo: add logic for if a king is in check
// Todo: Check for checkmate and end game
class Chessboard {
    constructor()
    {
        this._gameboard = new Array(8);
        for(let row = 0; row < 8; row++)
        {
            this._gameboard[row] = new Array(8);
        }

        this.clearBoard();
    }

    getPiece(x, y) 
    {
        if( this._gameboard[x][y] )
            return this._gameboard[x][y].display;
        else
            return "";
    }

    setPiece(x, y, piece)
    {
        this._gameboard[x][y] = piece;
    }

    movePiece(srcX, srcY, destX, destY)
    {
        this.setPiece(destX, destY, this._gameboard[srcX][srcY]);
        this.setPiece(srcX, srcY, null);
    }

    getWhitePieces()
    {
        let pieces = new Map(6);
        pieces["K"] = new King(true, "♚")
        pieces["Q"] = new Queen(true, "♛")
        pieces["R"] = new Rook(true, "♜")
        pieces["B"] = new Bishop(true, "♝")
        pieces["N"] = new Knight(true, "♞")
        pieces["P"] = new Pawn(true, "♟")
        return pieces;
    }

    getBlackPieces()
    {
        let pieces = new Map(6);
        pieces["K"] = new King(false, "♔")
        pieces["Q"] = new Queen(false, "♕")
        pieces["R"] = new Rook(false, "♖")
        pieces["B"] = new Bishop(false, "♗")
        pieces["N"] = new Knight(false, "♘")
        pieces["P"] = new Pawn(false, "♙")
        return pieces;
    }

    resetBoard()
    {
        this.clearBoard();

        this.setPiece(0, 0, new Rook(false, "♜"));
        this.setPiece(0, 1, new Knight(false, "♞"));
        this.setPiece(0, 2, new Bishop(false, "♝"));
        this.setPiece(0, 3, new Queen(false, "♛"));
        this.setPiece(0, 4, new King(false, "♚"));
        this.setPiece(0, 5, new Bishop(false, "♝"));
        this.setPiece(0, 6, new Knight(false, "♞"));
        this.setPiece(0, 7, new Rook(false, "♜"));

        this.setPiece(7, 0, new Rook(true, "♖"));
        this.setPiece(7, 1, new Knight(true, "♘"));
        this.setPiece(7, 2, new Bishop(true, "♗"));
        this.setPiece(7, 3, new Queen(true, "♕"));
        this.setPiece(7, 4, new King(true, "♔"));
        this.setPiece(7, 5, new Bishop(true, "♗"));
        this.setPiece(7, 6, new Knight(true, "♘"));
        this.setPiece(7, 7, new Rook(true, "♖"));

        for(let i = 0; i < 8; i++)
            this.setPiece(6, i, new Pawn(false, "♙"))

        for(let i = 0; i < 8; i++)
            this.setPiece(1, i, new Pawn(false, "♟"))
    }

    clearBoard()
    {
        for(let row = 0; row < 8; row++)
        {
            for(let col = 0; col < 8; col++)
            {
                this.setPiece(row, col, null);
            }
        }
    }

    printBoard()
    {
        for(let row = 0; row < 8; row++)
        {
            console.log(this._gameboard[row]);
        }
    }
}