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
    function getScore(col){
        let run=0;
        if(col==="white"){
            bCap.forEach((c)=>{
                run+=c.value
            })
        }
        else{
            wCap.forEach((c)=>{
                run+=c.value
            })
        }
        return run;
    }
    return(
        <div className="mainCL">
            <div className="w CL">
                <h4>
                    {"White: "}
                    {getScore("white")}
                </h4>
                <div>
                    {bCap.map((val,ind)=>(
                        <img className="capIMG" src={eval("Icons.b"+val.piece)} alt={val.piece}/>
                    ))}
                </div>
            </div>
            <div className="b CL">
                <h4>
                    {"Black: "}
                    {getScore("black")}
                </h4>
                <div>
                    {wCap.map((val,ind)=>(
                        <img className="capIMG" src={eval("Icons.w"+val.piece)} alt={val.piece}/>
                    ))}
                </div>
                
            </div>
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
export default CapturedList;