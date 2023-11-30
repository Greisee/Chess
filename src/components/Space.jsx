import {React,useState,useEffect} from "react";
import "./chess.css";
import Icons from "./Icons.jsx";//this is actually used, see eval(Icon)....

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
    return(
        <div className={(isOption? "option":props.color) + " p"+PieceColor+" space"}>
            {(Piece!=="None")&&
                <img src={eval("Icons."+ (PieceColor==="white"? "w":"b")+Piece)} alt={Piece}/>
            }
        </div>
    )
}
export default Space;