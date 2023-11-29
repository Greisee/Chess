import {React,useState,useEffect} from "react";
import "./chess.css";
import wK from "./images/wK.png"
import wQ from "./images/wQ.png"
import wR from "./images/wR.png"
import wB from "./images/wB.png"
import wN from "./images/wN.png"
import wp from "./images/wp.png"

import bK from "./images/bK.png"
import bQ from "./images/bQ.png"
import bR from "./images/bR.png"
import bB from "./images/bB.png"
import bN from "./images/bN.png"
import bp from "./images/bp.png"


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