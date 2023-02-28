import React, { useState } from "react";
import Style from "./NavBar.module.css"
import { FaUserCircle } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import CustomInput from "../../Atom/CustomInput";
import { SlLocationPin } from 'react-icons/sl';
import { useNavigate } from "react-router-dom";
import UserDetails from "../../Atom/UserDetails/UserDetails";
import ComponentNavBar from "../../Atom/ComponentNavBar/ComponentNavBar";
export default function NavBar() {

    const navigate = useNavigate()
    const [show,setShow] = useState(false)
    const [places, setPlaces] = useState([]);
    const [cityName, setCityName] = useState("Kanpur")
    const [value, setValue] = useState("");


    async function PlaceFetch(e) {
        // console.log(value,"come from  modal")
        setValue(e.target.value)
        const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${e.target.value}&types=`); // place name  // 
        const data = await res.json()
        setPlaces(data.data)
        console.log(data)

    }
    async function handleClick(place) {
        console.log(place.description, "i m selectd place line27")
        setCityName(place.description)
        const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${place.place_id}`) // Place id  //
        const data = await res.json()  //{}
        const latitude = data.data[0].geometry.location.lat
        const longitude = data.data[0].geometry.location.lng
        console.log(latitude, "geo")
        const response = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&page_type=DESKTOP_WEB_LISTING`)  // hotel details   // 
        const fetchData = await response.json()
        console.log(fetchData.data.cards[2].data.data.cards, "restaurant data")
        localStorage.setItem("allHotel", JSON.stringify(fetchData.data.cards[2].data.data.cards))
        navigate("/hotel")
    }

    // function handleKeyPress(place) {
    //     console.log(place.key)
    //   if (place.key === 'Enter') {
    //      PlaceFetch()
    //      handleClick()
    //   }
    // }

    return (
        <>
            <div className={Style.mainbox}>
                <div>
                    {!show ?
                    <FaBars className={Style.Bar} onClick={()=>setShow(true)} /> : <><div className={Style.details}><RxCross2 className={Style.cross} onClick={()=>setShow(false)} /><UserDetails className={Style.mainDetail} /></div> </>
                           }
                            
                </div>
                <div className={Style.Box}>

                    <div className={Style.logo} >
                        <img className={Style.iconimg} src="https://imgur.com/rt5JDla.png"/>
                    </div>
                    <div className={Style.Box2}>
                        <span className={Style.navbarText}>Invertor Relations</span>
                        <span className={Style.navbarText}>Add restaurant</span>
                        <span className={Style.navbarText}><FaUserCircle /><span>Harshit</span></span>
                    </div>
                </div>
                <div className={Style.Content} >
                    <span className={Style.iconname}>Foodtopia</span>
                    <span className={Style.text} >Discover the best food & drinks in {cityName}</span>
                    <ComponentNavBar/>
                  </div>
                  
            </div>
        </>
    );
}