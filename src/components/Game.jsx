import {React,useState,useEffect} from "react";
import Board from './Board.jsx';
import CapturedList from "./CapturedList.jsx";


function Game(){
    const[bCap,setBCap]=useState([]);
    const[wCap,setWCap]=useState([]);
    function addCap(p,col){
        let v=0;
        switch(p){
            case "p": 
                v=1;
                break;
            case "N":
                v=3;
                break;
            case "B":
                v=3;
                break;
            case "R":
                v=5;
                break;
            case "Q":
                v=9;
                break;
            default:
                v=0;
                break;
        }
        let cd=new capData(p,col,v);
        if(col==="white"){
            let t=wCap.slice()
            t.push(cd)
            setWCap(t);
        }
        else{
            let t=bCap.slice()
            t.push(cd)
            setBCap(t);
        }            
    }
    return(
        <div>
            <Board addCap={addCap}/>
            {<CapturedList wCap={wCap} bCap={bCap}/>}
        </div>
    )
}

class capData{
    constructor(p,col,val){
        this.value=val;
        this.piece=p;
        this.color=col;
    }
}
export default Game;