import React from "react";
import Style from "./UserDetails.module.css"
export default function UserDetails(){
    function handleimageClick(){

    }
    return(
        <>
        <div className={Style.Box}>
        <div onClick={ handleimageClick}>
        <img className={Style.img} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcCPPVjCBxBNdDx-2xGgW-L5uDPBLbJui-tRFJTdDnQ&s" className={Style.img} />
        </div> 
        <div>
        <p className={Style.name}>Harshit Mishra</p>
        <p className={Style.name}>mishraharshit430@gmail.com</p>
        <p className={Style.name}>Kanpur India</p>
        
        </div>
        </div>
        </>
    )
}