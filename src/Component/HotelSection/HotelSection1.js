import React, { useState, useEffect } from "react";
import Style from "./ItemSection1.module.css"
import { cards } from "./item"
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import CustomButton from "../../Atom/CustomButton";
import ComponentNavBar from "../../Atom/ComponentNavBar/ComponentNavBar";
// {console.log(item,"iam from item")}
export default function HotelSection1() {
    const navi = useNavigate()
    const [data, setData] = useState([])
    console.log(data, "data aarha")
    const navigate = useNavigate()
    useEffect(() => {
        let hotelData = JSON.parse(localStorage.getItem("allHotel"))
        setData(hotelData)
    }, [])

    function handleClick(x) {
        console.log(x)
        localStorage.setItem("hotelData", JSON.stringify(x))
        navigate("/hotel/menucard")
    }
    function handleRating() {
        const ratingHotelList = JSON.parse(localStorage.getItem("allHotel")).filter(x=> x.data.avgRating >= 3)
        setData([...ratingHotelList])
      }
      function handleVeg() {
        const vegHotel = JSON.parse(localStorage.getItem("allHotel")).filter(x=>x.data.veg === true)
        setData([...vegHotel])
      }
      function handleNonVeg() {
        const vegHotel = JSON.parse(localStorage.getItem("allHotel")).filter(x=>x.data.veg === false)
        setData([...vegHotel])
      }
      function handleAll() {
      
        setData(JSON.parse(localStorage.getItem("allHotel")))
      }
      function handlePrice(){
        const cheapPrice = JSON.parse(localStorage.getItem("allHotel")).filter(x=>x.data.costForTwo < 20000 )
        setData(cheapPrice)
      }

    return (
        <>  
          
            <div className={Style.navBarbox}><div className={Style.companyName} onClick={()=>navi("/")} >Foodtopia</div><span className={Style.Searchboxcss} ><ComponentNavBar/></span><div className={Style.username}>User</div></div>
             <div>
                <div className={Style.filterBox} >
                   <CustomButton onClick={handleRating} className={Style.hotelIcon} buttonText='Rating: 3.0+' /> <CustomButton onClick={handleVeg} className={Style.hotelIcon} buttonText="Pure Veg" /> <CustomButton  onClick={handlePrice} className={Style.hotelIcon} buttonText='Price' />
                   <CustomButton onClick={handleAll} className={Style.hotelIcon} buttonText="All Hotel" />
                </div>
                <div className={Style.mainbox2}  >

                    <div className={Style.mainbox} >
                        {
                            data.map((x) =>
                                <> <div key={x.data.id} className={Style.box} onClick={() => handleClick(x)} >
                                    {console.log(x.data, "map")}
                                    <img className={Style.boxImg} src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${x.data.cloudinaryImageId}`} alt="hotel_picture" />
                                    <div className={Style.discountTime} >
                                        <p className={Style.discount}>{x.data.aggregatedDiscountInfo.header}</p>
                                        <p className={Style.time}>{x.data.slaString}</p>
                                    </div>

                                    <div className={Style.HotelNameRating}  >
                                        <p>{x.data.name.split("  ").slice(0, 4).join("  ")}</p>
                                        <p className={Style.Rating} ><span className={Style.Hotel}>{x.data.avgRating}</span><span><AiFillStar /></span></p>
                                    </div>
                                    <div >
                                        <div className={Style.typeRs}>
                                            <p>{x.data.cuisines[0]} , {x.data.cuisines[0]}</p>
                                            <p>{x.data.costForTwoString}</p>
                                        </div>
                                        <div className={Style.recent} ><img className={Style.growthImg} src="https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp" /><p> {Math.floor(Math.random() * 1000)}+ ordere placed from hear recentry </p><img className={Style.imgSefty} src="https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp" /></div>
                                    </div>
                                </div>
                                </>)
                        }
                    </div>
                </div>
            </div> 
        </>
    )
}