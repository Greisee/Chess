import {React,useState,useEffect} from "react";
import "./chess.css";
import "./Images.jsx";

function Space(props){
    const[Piece,setPiece]=useState("");
    const[isOption,setIsOption]=useState(false);
    const[PieceColor,setPieceColor]=useState("none");
    useEffect(()=>{
        setPiece(props.piece);
    },[props.piece]);
    useEffect(()=>{
        setPieceColor(props.pieceColor)
    },[props.pieceColor]);
    useEffect(()=>{
        setIsOption(props.isOption);
    },[props.isOption]);
    function getIMG(){
            switch(Piece){
                case "K":
                    if(PieceColor==="white"){
                        return wK;
                    }
                    else{
                        return bK;
                    }
                case "Q":
                    if(PieceColor==="white"){
                        return wQ;
                    }
                    else{
                        return bQ;
                    }
                case "R":
                    if(PieceColor==="white"){
                        return wR;
                    }
                    else{
                        return bR;
                    }
                case "B":
                    if(PieceColor==="white"){
                        return wB;
                    }
                    else{
                        return bB;
                    }
                case "N":
                    if(PieceColor==="white"){
                        return wN;
                    }
                    else{
                        return bN;
                    }
                case "p":
                    if(PieceColor==="white"){
                        return wp;
                    }
                    else{
                        return bp;
                    }
            }
    }
    return(
        <div className={(isOption? "option":props.color) + " p"+PieceColor+" space"}>
            {(Piece!=="None")&&
                <img src={getIMG()} alt={Piece}/>
            }
        </div>
    )
}
export default Space;