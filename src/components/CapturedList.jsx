import {React,useState,useEffect} from "react";
import "./CapturedList.css";
import Icons from "./Icons.jsx"


function CapturedList(props){
    useEffect(()=>{
        setWCap(props.wCap);
    },[props.wCap]);
    useEffect(()=>{
        setBCap(props.bCap);
    },[props.bCap])
    
    const[wCap,setWCap]=useState([]);
    const[bCap,setBCap]=useState([]);
    
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
export default CapturedList;