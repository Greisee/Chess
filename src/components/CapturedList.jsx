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
        let wrun=0;
        let brun=0;
        bCap.forEach((c)=>{
            wrun+=c.value
        })
        wCap.forEach((c)=>{
            brun+=c.value
        })
        if(col=="white"){
            if(wrun>brun){
                return "+"+(wrun-brun);
            }
            else{
                return null
            }
            
        }
        else{
            if(brun>wrun){
                console.log(brun)
                return "-"+(brun-wrun);
            }
            else{
                return null;
            }
        }
    }
    return(
        <div className="mainCL">
            <div className="w CL">
                <h4>
                    {<img className="capIMG" src={Icons.wK}/>}
                    {"White: "}
                    {getScore("white")}
                </h4>
                <div>
                    {bCap.map((val,ind)=>(
                        <img className="capIMG" src={eval("Icons.b"+val.piece)} alt={val.piece} key={ind}/>
                    ))}
                </div>
            </div>
            <div className="b CL">
                <h4>
                    {<img className="capIMG" src={Icons.bK}/>}
                    {"Black: "}
                    {getScore("black")}
                </h4>
                <div>
                    {wCap.map((val,ind)=>(
                        <img className="capIMG" src={eval("Icons.w"+val.piece)} alt={val.piece} key={ind}/>
                    ))}
                </div>
                
            </div>
        </div>
    )
}
export default CapturedList;