import {React,useState,useEffect} from "react";
import "./chess.css"

function Space(props){
    const[Piece,setPiece]=useState(false);
    const[isOption,setIsOption]=useState(false);
    const[PieceColor,setPieceColor]=useState("");
    useEffect(()=>{
        setPiece(props.piece);
    },[props.piece]);
    useEffect(()=>{
        setPieceColor(props.pieceColor);
    },[props.pieceColor]);
    useEffect(()=>{
        setIsOption(props.isOption);
    },[props.isOption]);
    return(
        <div className={(isOption? "option":props.color) + " p"+PieceColor+" space"}>
            {(Piece!="None")&&Piece}
        </div>
    )
}
export default Space;