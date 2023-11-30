import {React,useState,useEffect} from "react";
import "./CapturedList.css";
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


function CapturedList(props){
    const[Piece,setPiece]=useState("");
    const[isOption,setIsOption]=useState(false);
    const[PieceColor,setPieceColor]=useState("none");
    useEffect(()=>{
        setPiece(props.piece);
    },[props.piece]);
    return(
        <div className="mainCL">
            <div className="w CL">
                White:
            </div>
            <div className="b CL">
                Black:
            </div>
        </div>
    )
}
export default CapturedList;