import {React,useState,useEffect} from "react";
import "./CapturedList.css";
import Icons from "./Icons.jsx"


function CapturedList(props){
    const[wCap,setWCap]=useState([]);
    const[bCap,setBCap]=useState([]);
    function addCap(p,col){
        let v=0;
        switch(p){
            case "P": v=1;
            case "N":v=3;
            case "B":v=3;
            case "R":v=5;
            case "Q":v=9;
        }
        let cd=new capData(p,col,v);
        if(col==="white"){
            wCap.push(cd);
        }
        else{
            bCap.push(cd);
        }
    }
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
class capData{
    constructor(p,col,val){

    }
}
export default CapturedList;