import React from "react";
import { useNavigate } from "react-router-dom";
import Style from './CardSection1.module.css'
export default function CardSection1() {
  const navi =useNavigate()
  return (
    <>
    <div className={Style.mybox}> 
      <div onClick={()=>navi('/hotel')} className={Style.box}>
        <div className={Style.card} >
          <img className={Style.img} src="https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg?output-format=webp&fit=around|402:360&crop=402:360;*,*" />
            <div className={Style.content}> 
            <p className={Style.heading}>Order Online</p>
            <p>Stay home and order to your doorstep</p>
             </div>
          </div>

          <div className={Style.card}>
            <img className={Style.img} src="https://b.zmtcdn.com/webFrontend/d026b357feb0d63c997549f6398da8cc1647364915.jpeg?output-format=webp&fit=around|402:360&crop=402:360;*,*" />
             <div className={Style.content}> 
              <p className={Style.heading}>Dining</p>
              <p>View the city's favourite dining venues</p>
            </div> 
          </div>
          <div className={Style.card} >
            <img className={Style.img} src="https://b.zmtcdn.com/webFrontend/d9d80ef91cb552e3fdfadb3d4f4379761647365057.jpeg?output-format=webp&fit=around|402:360&crop=402:360;*,*" />
             <div className={Style.content}>
              <p className={Style.heading}>NightLife and clubs</p>
              <p>Explore the city’s top nightlife outlets</p>
             </div> 
          </div>
        </div>
        </div>
       
    </>
  )
}