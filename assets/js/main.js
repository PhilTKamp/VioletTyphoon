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
        this.chessSquares = new Array();
        this.gameboard = new Chessboard();
        this.createBlankBoard();
    }

    createBlankBoard() {
        for(let row = 0; row < 8; row++) {
            for( let col = 0; col < 8; col++) {
                this.chessSquares.push(new ChessSquare(row, col));
                this.guiBoard.appendChild(this.getSquare(col, row).element);
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
                    console.log(this.gameboard.getColor(col, row) + this.gameboard.getPieceName(col, row));
                    this.getSquare(col, row).innerHTML = displayValues.get(displayKey);
                    this.getSquare(col, row).draggable = true;
                }
            }
        }
    }

    movePiece(source, dest) {
        dest.setInnerHTML( source.getInnerHTML());
        source.setInnerHTML("");
    }
}

class ChessSquare {
    constructor(row, col) {
        this.htmlElement = document.createElement("chesssquare");
        this.htmlElement.dataset.x = col;
        this.htmlElement.dataset.y = row;
        this.htmlElement.classList.add(( row % 2 == col % 2 ? "light" : "dark"));
        this.copyPiece.bind(this);
        
        // CODE REVIEW: Break these to new function?
        this.htmlElement.addEventListener("dragover", (e)=>{e.preventDefault();});
        this.htmlElement.addEventListener("dragenter", this.focusSquare.bind(this));
        this.htmlElement.addEventListener("dragleave", this.unfocusSquare.bind(this));
        this.htmlElement.addEventListener("drop", this.pastePiece.bind(this));
        this.htmlElement.addEventListener("dragstart", this.stopDrag)
        this.htmlElement.addEventListener("dragend", this.clearPiece.bind(this));
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

    set draggable(value) {
        if(value) {
            this.htmlElement.removeEventListener("dragstart", this.stopDrag);
            this.htmlElement.addEventListener("dragstart", this.copyPiece);
        }
        else
        {
            this.htmlElement.removeEventListener("dragstart", this.copyPiece);
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

    // CODE REVIEW: Function name
    pastePiece(e) {
        e.preventDefault();
        this.unfocusSquare();

        e.dataTransfer.setData("destX", this.x)
        e.dataTransfer.setData("destY", this.y)
        let html = e.dataTransfer.getData("innerHTML");
        this.innerHTML = html;
        this.draggable = true;
    }
    
    // CODE REVIEW: Function name
    copyPiece(e) {
        e.dataTransfer.setData("innerHTML", this.innerHTML);
        e.dataTransfer.setData("srcX", this.x)
        e.dataTransfer.setData("srcY", this.y)
    }
    
    // CODE REVIEW: Function name
    clearPiece(e) {
        if(this.x == e.dataTransfer.getData("destX") && this.y == e.dataTransfer.getData("destY") ) {
            this.innerHTML = "";
            this.draggable = false;
        }
    }

    stopDrag(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}

var board = new ChessboardGUI(document.getElementsByTagName("chessboard")[0]);
board.resetBoard();