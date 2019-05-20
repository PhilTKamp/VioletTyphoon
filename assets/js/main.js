// TODO uniquely identify each chessboard to allow for multiple boards on a page
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
    gameboard.movePiece(srcX, srcY, destX, destY);

    if(e.target.id != parentID)
    {
        e.target.innerText = parent.innerText;
        parent.innerText = "";
    }

    this.style.border = "";
}

function dragstart(e)
{
    e.dataTransfer.setData("ID", e.target.id);
}

function elementToCoordinates(element)
{
    return element.id.split("_");
}

let gameboard = new Chessboard();
gameboard.resetBoard();
createGUIChessBoard(gameboard);