import Space from "./Space.jsx";
import {React,useState,useEffect} from "react";


function Board(props){
    const[isPieceClicked,setIsPieceClicked]=useState(false);
    const[pieceClicked,setPieceClicked]=useState(null);
    const[board,setBoard]=useState([[]]);
    const[moves,setMoves]=useState([[]]);
    const[turn,setTurn]=useState(true);
    const[castles,setCastles]=useState([[true,true],[true,true]]);
    useEffect(()=>{
        startBoard();
    },[]);
    //init functions---------------------------------------------------------------
    function startBoard(){
        let res=[]
        for(let i=0;i<8;i++){
            let row=[]
            for(let j=0;j<8;j++){
                let s=new SpaceData(j,i,(i+j)%2===1 ? "black":"white")
                row.push(s)
            }
            res.push(row)
        }
        res=spawnPieces(res);
        setBoard(res);
    }
    function spawnPieces(bord){
            for(let j=0;j<2;j++){
            bord[(j+7)%8][4].piece="K";
            bord[(j+7)%8][3].piece="Q";
            for(let i=0;i<8;i++){
                bord[1][i].piece="p";
                bord[6][i].piece="p";
                
                bord[j][i].pieceColor="black";
                bord[7-j][i].pieceColor="white";
            }
            for(let k=0;k<2;k++){
                bord[(j+7)%8][(k+7)%8].piece="R";
                bord[(j+7)%8][1+(5*k)].piece="N";
                bord[(j+7)%8][2+(3*k)].piece="B";
            }
        }
        return bord
    }
    //on click functions-------------------------------------------------------
    function getMoves(sd){
        if((sd.pieceColor==="white")===turn){
            let result=sortMove(sd);
            if(sd.piece==="K"){
                result.forEach((m,ind)=>{
                    if(isInCheck(m,sd.pieceColor,board)){
                        result.splice(ind,1);
                    }
                })
            }
            
            if(result.length>0){
                hlMoves(board,result);
                setIsPieceClicked(true);
                setPieceClicked(sd);
            } 
        }
        
    }
    function sortMove(sd){
        let result=[]
        switch(sd.piece){
            case "p": 
                result=getPawnMoves(sd);
                break;
            case "N":
                result=getKnightMoves(sd);
                break;
            case "B":
                result=getBishopMoves(sd);
                break;
            case "R":
                result=getRookMoves(sd);
                break;
            case "Q" :
                result=getBishopMoves(sd);
                result=result.concat(getRookMoves(sd));
                break;
            case "K" :
                result=getKingMoves(sd);                
                break;
        }
        return result;
    }
    function move(sd){
        let bord=board
        moves.forEach(m=>{
            if(pieceClicked.piece==="K"&&(m[0]===sd.y)&&(m[1]===sd.x)){
                let casCol=0
                if(pieceClicked.pieceColor==="black"){
                    casCol=1
                }
                if(m[1]-pieceClicked.x===2&&castles[casCol][0]){
                    bord[m[0]][m[1]-1].piece="R";
                    bord[m[0]][m[1]-1].pieceColor=pieceClicked.pieceColor
                    bord[m[0]][7].piece="None"
                    let temp=castles;
                    temp[casCol]=[false,false]
                    setCastles(temp)
                    setTurn(!turn);
                }
                else if(m[1]-pieceClicked.x===-2&& castles[casCol][1]){
                    bord[m[0]][m[1]+1].piece="R";
                    bord[m[0]][m[1]+1].pieceColor=pieceClicked.pieceColor
                    bord[m[0]][0].piece="None"
                    let temp=castles;
                    temp[casCol]=[false,false]
                    setCastles(temp)
                    setTurn(!turn);
                }
            }
            if((m[0]===sd.y)&&(m[1]===sd.x)){
                bord[m[0]][m[1]].piece=pieceClicked.piece
                bord[m[0]][m[1]].pieceColor=pieceClicked.pieceColor
                bord[pieceClicked.y][pieceClicked.x].piece="None"
                setTurn(!turn)
            }
        })
        bord=clearMoves(bord)    
        setBoard(bord)
        setIsPieceClicked(false)
        setPieceClicked(null)
        //check checkmate here
    }
    //moves per peice----------------------------------------------------------
    function getPawnMoves(sd){
        let res=[]
        let mult=1;
        if(sd.pieceColor==="white"){
            mult=-1
        }
        if(board[sd.y+mult][sd.x].piece==="None"){
            res.push([sd.y+mult,sd.x]);
            if(sd.y+mult===0||sd.y+mult===7){
                //promote here
            }
        }
        if((sd.y===(7+mult)%7)&&board[sd.y+(2*mult)][sd.x].piece==="None"&&board[sd.y+mult][sd.x].piece==="None"){
            res.push([sd.y+(2*mult),sd.x])
        }
        for(let i=-1;i<2;i+=2){
            if(sd.x+i>0&&sd.x+i<8&&board[sd.y+mult][sd.x+i].piece!="None"&&board[sd.y+mult][sd.x+i].pieceColor!=sd.pieceColor){
                res.push([sd.y+mult,sd.x+i])
            }
        }
        return res
    }
    function getKnightMoves(sd){
        let res=[]
        for(let i=-2;i<=2;i++){
            for(let j=-2;j<=2;j++){
                if(sd.x+i<=7&&sd.x+i>=0&&sd.y+j<=7&&sd.y+j>=0&&i!=j&&i!=-j&&i!=0&&j!=0){
                    if(board[sd.y+j][sd.x+i].piece==="None"||board[sd.y+j][sd.x+i].pieceColor!=sd.pieceColor){
                        res.push([sd.y+j,sd.x+i])
                    }
                }
            }
        }
        return res
    }
    function getBishopMoves(sd){
        let res=[]
        for(let i=-1;i<=1;i+=2){
            for(let j=-1;j<=1;j+=2){
                if(j===i||j===-i){
                    let run=1
                    let blocked=false
                    while(!blocked&&sd.y+(run*j)>=0&&sd.y+(run*j)<8&&sd.x+(run*i)>=0&&sd.x+(run*i)<8){
                        if(board[sd.y+(run*j)][sd.x+(run*i)].piece==="None"){
                            res.push([sd.y+(run*j),sd.x+(run*i)])
                        }
                        else{
                            if(board[sd.y+(run*j)][sd.x+(run*i)].pieceColor!=sd.pieceColor){
                                res.push([sd.y+(run*j),sd.x+(run*i)])
                            }
                            blocked=true
                        }
                        run++
                    }
                }
            }
        }
        return res;
    }
    function getRookMoves(sd){
        let res=[]
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if(j===0||i===0){
                    let run=1
                    let blocked=false
                    while(!blocked&&sd.y+(run*j)>=0&&sd.y+(run*j)<8&&sd.x+(run*i)>=0&&sd.x+(run*i)<8){
                        if(board[sd.y+(run*j)][sd.x+(run*i)].piece==="None"){
                            res.push([sd.y+(run*j),sd.x+(run*i)])
                        }
                        else{
                            if(board[sd.y+(run*j)][sd.x+(run*i)].pieceColor!=sd.pieceColor){
                                res.push([sd.y+(run*j),sd.x+(run*i)])
                            }
                            blocked=true
                        }
                        run++
                    }
                }
            }
        }
        return res
    }
    function getKingMoves(sd){
        let res=[]
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if(sd.x+i<8&&sd.x+i>=0&&sd.y+j<8&&sd.y+j>=0&&
                    (board[sd.y+j][sd.x+i].piece==="None"||board[sd.y+j][sd.x+i].pieceColor!=sd.pieceColor)&&
                    (j!=sd.y||i!=sd.x))
                        {
                            res.push([sd.y+j,sd.x+i])
                        }
            }
        }
        let castColor=0;
        if(sd.pieceColor==="black"){
            castColor=1;
        }
        if(castles[castColor][0]&&board[sd.y][sd.x+1].piece==="None"&&board[sd.y][sd.x+2].piece==="None"){
            res.push([sd.y,sd.x+2])
        }
        if(castles[castColor][1]&&board[sd.y][sd.x-1].piece==="None"&&board[sd.y][sd.x-2].piece==="None"&&board[sd.y][sd.x-3].piece==="None"){
            res.push([sd.y,sd.x-2])
        }
        return res
    }
    //check/checkmate-----------------------------------------------------------
    function isInCheck(space,pcol,bord){
        let res=false
        bord.forEach(r=>{
            r.forEach(s=>{
                if(s.piece!=="None"&&s.pieceColor!==pcol){
                    let movs=sortMove(s)
                    movs.forEach((m)=>{
                        if(m[0]===space[0]&&m[1]===space[1]){
                            res=true;
                        }
                    })
                }
            })            
        })
        return res
    }
    //utility/visual changes//-------------------------------------------------
    function hlMoves(bord, movs){
        movs.forEach(m=>{
            bord[m[0]][m[1]].isOption=true
        })
        setMoves(movs);
        setBoard(bord);
    }
    function clearMoves(bord){
        moves.forEach(m=>{
            bord[m[0]][m[1]].isOption=false;
        })
        setMoves([]);
        return bord;
    }
    return(
        <div className="board">
            <table>
                <tbody>
                    {board.map((val,key)=>(
                        <tr key={key}>
                            {val.map((val2,key2)=>(
                                <td onClick={isPieceClicked? ()=>move(val2):()=>getMoves(val2)} key={key2}>
                                    <Space 
                                        key={key+key2}
                                        color={val2.color} 
                                        piece={val2.piece} 
                                        pieceColor={val2.pieceColor}
                                        isOption={val2.isOption}
                                    />
                                </td>
                                
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
}


class SpaceData{
    constructor(x,y,c,pCol="black"){
        this.pieceColor=pCol;
        this.x=x;
        this.y=y;
        this.piece="None";//none,p,n,b,r,q,k
        this.color=c;
        this.isOption=false
    }
}
export default Board