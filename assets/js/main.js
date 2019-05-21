// TODO uniquely identify each chessboard to allow for multiple boards on a page
// TODO only apply the drag and drop to the squares with pieces on them
// Rename drag and drop functions

function createGUIChessBoard(gameboard)
{
    var chessboardGUI = document.getElementsByTagName("chessboard")[0];
    for(let row = 0; row < 8; row++)
    {
        var cRow = document.createElement("chessrow");
        cRow.id = `row_${row}`;
        chessboardGUI.appendChild(cRow);

        for(let col = 0; col < 8; col++)
        {
            var cSquare = document.createElement("chesssquare");
            cSquare.id = `${col}_${row}`;
            cSquare.innerText = gameboard.getDisplay(col, row);

            // Refactor
            cSquare.draggable = true;
            cSquare.addEventListener("dragover", dragover);
            cSquare.addEventListener("dragenter", dragenter);
            cSquare.addEventListener("dragleave", dragleave);
            cSquare.addEventListener("drop", drop);
            cSquare.addEventListener("dragstart", dragstart);
            cRow.appendChild(cSquare);
        }
    }
}

function updateChessboard (gameboard)
{
    for(let row = 0; row < 8; row++)
    {
        let cRow = document.getElementById(`row_${row}`);
        for(let col = 0; col < 8; col++)
        {
            cRow.children[col].innerText = gameboard.getDisplay(col, row);
        }
    }
}

function dragenter (e)
{
    this.style.border = "3px dashed #CB8589";
}

function dragover(e)
{
    e.preventDefault();
}

function dragleave(e)
{
    this.style.border = "";
}

function drop(e)
{
    e.preventDefault();
    const parentID = e.dataTransfer.getData("ID");
    const parent = document.getElementById(parentID);
    
    let srcX, srcY, destX, destY;
    [srcX, srcY] = elementToCoordinates(parent);
    [destX, destY] = elementToCoordinates(e.target);

    let potentialMoves = gameboard.getValidMoves(srcX, srcY);
    potentialMoves.forEach(coord => {
        document.getElementById(`${coord.x}_${coord.y}`).style.backgroundColor = "";
    });

    if(e.target.id != parentID)
    {
        gameboard.movePiece(srcX, srcY, destX, destY);
        
        e.target.innerText = parent.innerText;
        parent.innerText = "";
    }
    
    gameboard.printBoard();
    this.style.border = "";
}

function dragstart(e)
{
    let potentialMoves = gameboard.getValidMoves(...elementToCoordinates(e.target));
    potentialMoves.forEach(coord => {
        document.getElementById(`${coord.x}_${coord.y}`).style.backgroundColor = "red";
    });
    
    e.dataTransfer.setData("ID", e.target.id);
        
    console.log(gameboard.getValidMoves(...elementToCoordinates(e.target)));
}

function elementToCoordinates(element)
{
    return element.id.split("_").map((val) => {return parseInt(val);});
}

let gameboard = new Chessboard();
gameboard.resetBoard();
createGUIChessBoard(gameboard);