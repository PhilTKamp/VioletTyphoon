/**  
 * Internally we are ditching the standard chess notation for rows and columns
 * in favor of an x,y coordinate system based on the black queenside rook to simplify
 * calculations. All requests requiring serialization of the data should convert all
 * coordinates to the appropriate chess notation.
*/
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
        return this._gameboard[x][y];
    }

    setPiece(x, y, piece)
    {
        this._gameboard[x][y] = piece;
    }

    movePiece(srcX, srcY, destX, destY)
    {
        this.setPiece(destX, destY, this.getPiece(srcX, srcY));
        this.setPiece(srcX, srcY, "");
    }

    getWhitePieces()
    {
        let pieces = ["♚", "♛", "♝", "♞", "♜", "♟"];
        return pieces;
    }

    getBlackPieces()
    {
        let pieces = ["♔", "♕", "♗", "♘", "♖", "♙"];
        return pieces;
    }

    resetBoard()
    {
        const startingLayout = [
            ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
            ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
            ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
        ];

        for(let row = 0; row < 8; row++)
        {
            for(let col = 0; col < 8; col++)
            {
                this.setPiece(row, col, startingLayout[row][col]);
            }
        }
    }

    clearBoard()
    {
        for(let row = 0; row < 8; row++)
        {
            for(let col = 0; col < 8; col++)
            {
                this.setPiece(row, col, "");
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