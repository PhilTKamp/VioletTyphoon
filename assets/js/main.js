// TODO uniquely identify each chessboard to allow for multiple boards on a page
// TODO only apply the drag and drop to the squares with pieces on them
// TODO Refactor chesssquares drag and drop functionality into ChessboardGUI class
// Convert row/col to x/y
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
        this.dropPieceBound = this.dropPiece.bind(this);
        this.startPieceMoveBound = this.startPieceMove.bind(this);
        this.endPieceMoveBound = this.endPieceMove.bind(this);
        
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
                    this.getSquare(col, row).innerHTML = "<p>" + displayValues.get(displayKey) + "</p>";
                    this.setDraggable(col, row, true);
                }
            }
        }
    }

    setDroppable(x, y, canDrop) {
        if(canDrop) {
            this.getSquare(x, y).addListener("drop", this.dropPieceBound);
        }
        else {
            this.getSquare(x, y).removeListener("drop", this.dropPieceBound);

        }
    }

    setDraggable(x, y, canDrag)
    {
        let thisSquare = this.getSquare(x, y);
        if(canDrag) {
            thisSquare.addListener("dragstart", this.startPieceMoveBound);
            thisSquare.addListener("dragend", this.endPieceMoveBound);
            thisSquare.draggable = true;
        }
        else {
            thisSquare.removeListener("dragstart", this.startPieceMoveBound);
            thisSquare.removeListener("dragend", this.endPieceMoveBound);
            thisSquare.draggable = false;            
        }
    }

    startPieceMove(e) {
        // Get the potential moves and highlight them
        e.dataTransfer.setData("text/plain", e.srcElement.innerHTML);
        this.lastMove.srcX = parseInt(e.target.dataset.x);
        this.lastMove.srcY = parseInt(e.target.dataset.y);
        this.lastMove.destX = this.lastMove.srcX;
        this.lastMove.destY = this.lastMove.destY;

        let potentialMoves = this.gameboard.getValidMoves(this.lastMove.srcX, this.lastMove.srcY);
        potentialMoves.forEach(move => {
            this.getSquare(move.x, move.y).addClass("highlighted");
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
        // Breakout
        let potentialMoves = this.gameboard.getValidMoves(srcX, srcY);
        potentialMoves.forEach(move => {
            this.getSquare(move.x, move.y).removeClass("highlighted");
            this.setDroppable(move.x, move.y, false);
        });
        
        // CODE REVIEW: isMovingToPotentialSpot, ifHasMoved
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

    addClass(cssClass) {
        this.htmlElement.classList.add(cssClass);
    }

    removeClass(cssClass) {
        this.htmlElement.classList.remove(cssClass);
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
        this.addClass("focused");
    }

    unfocusSquare() {
        this.removeClass("focused");
    }

    stopDrag(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}

var board = new ChessboardGUI(document.getElementsByTagName("chessboard")[0]);
board.resetBoard();