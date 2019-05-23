/**
 * An ADT Simulating a Chessboard
 * 
 * Internally we are ditching the standard chess notation for rows and columns
 * in favor of an x,y coordinate system based on the black queenside rook to simplify
 * calculations. All requests requiring serialization of the data should convert all
 * coordinates to the appropriate chess notation.
*/

// Todo: Check for checkmate and end game

const colors = {
    WHITE: "white",
    BLACK: "black"
}

class Chessboard {
    constructor(pieces = [], emptyBoard = []) {
        this._gameboard = emptyBoard;
        this.pieces = pieces;
        this.height = 8;
        this.width = 8;
        this.turn = colors.WHITE
    }

    getTurn()
    {
        return this.turn;
    }

    getColor(x, y) {
        return this.getPiece(x, y).color;
    }

    getPieceName(x, y) {
        return this.getPiece(x, y).name;
    }
    
    getCoordinates(piece) {
        return {x : piece.x, y : piece.y};
    }

    getPiece(x, y) {
        return this._gameboard[this.width * y + x];
    }

    setPiece(x, y, piece) {
        if(piece) {
            piece.x = x;
            piece.y = y;
        }

        this._gameboard[y * this.width + x] = piece;
    }

    hasPiece(x, y) {
        return ( this.getPiece(x, y) ? true : false );
    }

    getValidMoves(x, y) {
        let piece = this.getPiece(x, y);
        if(this.getTurn() == piece.color) {
            let moves = piece.getPotentialMoves(this);
            return moves.filter((move)=> {return !this.moveCausesCheck(piece, move);});
        }
        else {
            return [];
        }
    }

    movePiece(srcX, srcY, destX, destY) {
        if(this.hasPiece(destX, destY)) {
            delete this.pieces[this.getPiece(destX, destY).id];
        }  

        this.setPiece(destX, destY, this.getPiece(srcX, srcY));
        this.setPiece(srcX, srcY, undefined);

        this.turn = (this.turn == colors.WHITE ? colors.BLACK : colors.WHITE);
    }

    moveCausesCheck(piece, move) {
        let originalPosition = { x: piece.x, y: piece.y };
        let preservedPiece;

        if(this.hasPiece(move.x, move.y))
            preservedPiece = this.getPiece(move.x, move.y);

        this.movePiece(piece.x, piece.y, move.x, move.y);

        let isInCheck = this.isKingInCheck(piece.color);

        this.movePiece(piece.x, piece.y, originalPosition.x, originalPosition.y);

        if(preservedPiece)
            this.setPiece(move.x, move.y, preservedPiece);

        return isInCheck;
    }

    isKingInCheck(color) {
        let king = this.pieces.find((p) => {return p && p.color == color && p.name == "K"});

        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                if( this.hasPiece(x, y) ) {
                    if(this.canCapture(this.getPiece(x, y), king))
                        return true;
                }
            }
        }

        return false;
    }

    canCapture(attacker, victim) {
        let potentialMoves = attacker.getPotentialMoves(this);
        let moveToCapture = potentialMoves.find((move)=>{return move.x == victim.x && move.y == victim.y});
        if(moveToCapture)
            return true;
        else
            return false;
    }

    getStandardStartingPieces(color, initID) {
        let pieces = new Array();
        pieces.push( new Rook(initID, color) );
        pieces.push( new Knight(initID + 1, color) );
        pieces.push( new Bishop(initID + 2, color) );
        pieces.push( new Queen(initID + 3, color) );
        pieces.push( new King(initID + 4, color) );
        pieces.push( new Bishop(initID + 5, color) );
        pieces.push( new Knight(initID + 6, color) );
        pieces.push( new Rook(initID + 7, color) );

        for(let i = 0; i < 8; i++)
            pieces.push( new Pawn(initID + 8 + i, color) );

        return pieces;
    }

    resetBoard() {
        this.clearBoard();
        this.initializeBoard();
    }
    
    indexToCoordinates(index)
    {
        let x = index % this.width;
        let y = Math.floor(index / this.width);
        return {x, y};
    }

    initializeBoard() {
        let blackPieces = this.getStandardStartingPieces(colors.BLACK, 0);
        let whitePieces = this.getStandardStartingPieces(colors.WHITE, 16);
        
        blackPieces.forEach((piece, index) => {
            let {x, y} = this.indexToCoordinates(index);
            this.setPiece(x, y, piece);
        });
        
        whitePieces.forEach((piece, index) => {
            let {x, y} = this.indexToCoordinates(index);
            this.setPiece(x, 7 - y, piece);
        });

        this.pieces = blackPieces.concat(whitePieces);
    }

    clearBoard() {
        this._gameboard.length = 0;
        this.pieces.length = 0;
    }

    printBoard() {
        for(let row = 0; row < this.height; row++)
        {
            console.log(this._gameboard.slice(row * this.width, row * this.width + this.width));
        }
    }
}