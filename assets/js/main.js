function createGUIChessBoard(gameboard)
{
    var chessboardGUI = document.getElementsByTagName("chessboard")[0];
    for(row = 0; row < 8; row++)
    {
        var cRow = document.createElement("chessrow");
        cRow.id = `row_${row}`;
        chessboardGUI.appendChild(cRow);
        for(col = 0; col < 8; col++)
        {
            var cSquare = document.createElement("chesssquare");
            cSquare.id = `${row}_${col}`;
            cSquare.innerText = gameboard[row][col];
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

function createNewChessBoard()
{
    return [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
    ];

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
    var parentID = e.dataTransfer.getData("ID");
    var parent = document.getElementById(parentID);

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

var gameboard = createNewChessBoard();
createGUIChessBoard(gameboard);