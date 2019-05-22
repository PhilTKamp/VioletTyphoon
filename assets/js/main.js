// TODO uniquely identify each chessboard to allow for multiple boards on a page
// TODO only apply the drag and drop to the squares with pieces on them
// TODO Refactor chesssquares drag and drop functionality into ChessboardGUI class

const displayValues = new Map([
    ["blackP", "♟"],
    ["blackN", "♞"],
    ["blackB", "♝"],
    ["blackR", "♜"],
    ["blackQ", "♛"],
    ["blackK", "♚"],
    ["whiteP", "♙"],
    ["whiteN", "♘"],
    ["whiteB", "♗"],
    ["whiteR", "♖"],
    ["whiteQ", "♕"],
    ["whiteK", "♔"]
])

class ChessboardGUI {
    constructor(parentElement) {
        this.guiBoard = parentElement;
        // Try overwriting the function with a bound reference
        this.dropPieceCB = this.dropPiece.bind(this);
        this.startPieceMoveCB = this.startPieceMove.bind(this);
        this.endPieceMoveCB = this.endPieceMove.bind(this);
        this.chessSquares = new Array();
        this.gameboard = new Chessboard();
        this.lastMove = { srcX : -1, srcY : -1, destX : -1, destY : -1};
        this.createBlankBoard();
    }

    createBlankBoard() {
        for(let row = 0; row < 8; row++) {
            for( let col = 0; col < 8; col++) {
                this.chessSquares.push(new ChessSquare(row, col));
                this.guiBoard.appendChild(this.getSquare(col, row).element);
                this.setDraggable(col, row, false);
                this.setDroppable(col, row, false);
            }
        }
    }

    getSquare(x, y) {
        return this.chessSquares[y * 8 + x];
    }

    resetBoard() {
        this.gameboard.resetBoard();
        this.updateChessboard();
    }

    updateChessboard() {
        for(let row = 0; row < 8; row++)
        {  
            for(let col = 0; col < 8; col++)
            {
                if(this.gameboard.hasPiece(col, row))
                {
                    let displayKey = this.gameboard.getColor(col, row) + this.gameboard.getPieceName(col, row);
                    this.getSquare(col, row).innerHTML = displayValues.get(displayKey);
                    this.setDraggable(col, row, true);
                }
            }
        }
    }

    setDroppable(x, y, canDrop) {
        if(canDrop) {
            this.getSquare(x, y).addListener("drop", this.dropPieceCB);
        }
        else {
            this.getSquare(x, y).removeListener("drop", this.dropPieceCB);

        }
    }

    setDraggable(x, y, canDrag)
    {
        let thisSquare = this.getSquare(x, y);
        if(canDrag) {
            thisSquare.addListener("dragstart", this.startPieceMoveCB);
            thisSquare.addListener("dragend", this.endPieceMoveCB);
            thisSquare.draggable = true;
        }
        else {
            thisSquare.removeListener("dragstart", this.startPieceMoveCB);
            thisSquare.removeListener("dragend", this.endPieceMoveCB);
            thisSquare.draggable = false;            
        }
    }

    startPieceMove(e) {
        // Get the potential moves and highlight them
        e.dataTransfer.setData("text/plain", e.srcElement.innerHTML);
        this.lastMove.srcX = parseInt(e.target.dataset.x);
        this.lastMove.srcY = parseInt(e.target.dataset.y);

        let potentialMoves = this.gameboard.getValidMoves(this.lastMove.srcX, this.lastMove.srcY);
        potentialMoves.forEach(move => {
            this.getSquare(move.x, move.y).backgroundColor = "red";
            this.setDroppable(move.x, move.y, true);
        });
    }
    
    dropPiece(e) {
        e.target.innerHTML = e.dataTransfer.getData("text");
        this.lastMove.destX = parseInt(e.target.dataset.x);
        this.lastMove.destY = parseInt(e.target.dataset.y);
        this.setDraggable(this.lastMove.destX, this.lastMove.destY, true);
    }
    
    endPieceMove(e) {
        let {srcX, srcY, destX, destY} = this.lastMove;
        
        let potentialMoves = this.gameboard.getValidMoves(srcX, srcY);
        potentialMoves.forEach(move => {
            this.getSquare(move.x, move.y).backgroundColor = "";
            this.setDroppable(move.x, move.y, false);
        });
        
        // CODE REVIEW: I 
        if((srcX != destX || srcY != destY) && potentialMoves.find((v)=>{return v.x == destX && v.y == destY;}))
        {
            this.gameboard.movePiece(srcX, srcY, destX, destY);
            this.getSquare(srcX, srcY).innerHTML = "";
            this.setDraggable(srcX, srcY, false);
        }
    }
}

class ChessSquare {
    constructor(row, col) {
        this.htmlElement = document.createElement("chesssquare");
        this.htmlElement.dataset.x = col;
        this.htmlElement.dataset.y = row;
        this.htmlElement.classList.add(( row % 2 == col % 2 ? "light" : "dark"));
        
        // CODE REVIEW: Break these to new function?
        this.htmlElement.addEventListener("dragover", (e)=>{e.preventDefault();});
        this.htmlElement.addEventListener("dragenter", this.focusSquare.bind(this));
        this.htmlElement.addEventListener("dragleave", this.unfocusSquare.bind(this));
        this.htmlElement.addEventListener("drop", this.unfocusSquare.bind(this));
        this.htmlElement.draggable = false;
    }

    get x() {
        return this.htmlElement.dataset.x;
    }

    get y() {
        return this.htmlElement.dataset.y;
    }

    set innerHTML(html) {
        this.htmlElement.innerHTML = html;
    }

    get innerHTML() {
        return this.htmlElement.innerHTML;
    }
    
    get element() {
        return this.htmlElement;
    }

    set backgroundColor(value) {
        this.htmlElement.style.backgroundColor = value;
    }

    addListener(event, funct) {
        this.htmlElement.addEventListener(event, funct);
    }

    removeListener(event, funct) {
        this.htmlElement.removeEventListener(event, funct);
    }

    set draggable(value) {
        if(value) {
            this.htmlElement.removeEventListener("dragstart", this.stopDrag);
        }
        else
        {
            this.htmlElement.addEventListener("dragstart", this.stopDrag);
        }

        this.htmlElement.draggable = value;
    }

    get draggable() {
        return this.htmlElement.draggable;
    }

    focusSquare() {
        this.htmlElement.style.border = "3px dashed #CB8589";
    }

    unfocusSquare() {
        this.htmlElement.style.border = "";
    }

    stopDrag(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}

var board = new ChessboardGUI(document.getElementsByTagName("chessboard")[0]);
board.resetBoard();