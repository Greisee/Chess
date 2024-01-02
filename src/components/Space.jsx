import {React,useState,useEffect} from "react";
import "./chess.css";
import Icons from "./Icons.jsx";
import {isMobile} from "./Mobile.jsx";

function Space(props){
    const mobile=isMobile();
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
        <div className={(isOption? "option":props.color) + 
            " p"+PieceColor+" space "+(mobile? "":"mobile")}>
                <img src={Icons.empty} width={"0px"}/>
                {(Piece!=="None")&&
                    <img src={eval("Icons."+ (PieceColor==="white"? "w":"b")+Piece)} alt={Piece}/>
                }
        </div>
    )
}
export default Space;