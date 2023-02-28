import React, { useState } from "react";
import Style from "./ComponentNavBar.module.css"
import { TiLocation } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import CustomInput from "../CustomInput";
import { useNavigate } from "react-router-dom";
import { SlLocationPin } from 'react-icons/sl';
export default function ComponentNavBar() {

  const [places, setPlaces] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [value, setValue] = useState("");
  const [food, setFood] = useState("");
  const [cityName, setCityName] = useState("Kanpur")

  const navigate = useNavigate()
  async function PlaceFetch(e) {
    // console.log(value,"come from  modal")
    setValue(e.target.value)
    const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${e.target.value}&types=`);
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
    localStorage.setItem("latitude", JSON.stringify(latitude))
    localStorage.setItem("longitude", JSON.stringify(longitude))
    console.log(latitude, "geo")
    const response = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&page_type=DESKTOP_WEB_LISTING`)  // hotel details   // 
    const fetchData = await response.json()
    console.log(fetchData.data.cards[2].data.data.cards, "restaurant data")
    localStorage.setItem("allHotel", JSON.stringify(fetchData.data.cards[2].data.data.cards))
    navigate("/hotel")
  }

  async function handleSearch(e) {
    setFood(e.target.value)

    const res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=17.385044&lng=78.486671&str=${e.target.value}&trackingId=undefined`
    );
    const data = await res.json();
    console.log(data, "foods prediced")
    setFoodList(data?.data?.suggestions);



  }
  return (
    <>
      <div className={Style.inputBoxStyle}>
        <TiLocation className={Style.location} />
        <CustomInput value={value} onChange={PlaceFetch} placeholder="Swaroop Nagar" className={Style.input1} />
        <CiSearch className={Style.search} />
        <CustomInput onChange={handleSearch} placeholder="Search for restaurant, cuisine or a dish" className={Style.input2} />
      </div>
      <div className={Style.popOver}>
        {
          places?.map((place) =>
            <>
              <span className={Style.places} onClick={() => handleClick(place)} ><SlLocationPin /> {place?.description}</span>
            </>
          )
        }
      </div>

      <div className={Style.prediction}>
        {foodList?.map((x, i) => (
          <>
            <div className={Style.foodList} key={i}>
              <img
                className={Style.imagesSeacrh}
                width="65px"
                height="65px"
                src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${x.cloudinaryId}`}
                alt="dishes"
              />
              <div>
                <p className={Style.imagesSeacrhText}>{x.text}</p>
                <p className={Style.imagesSeacrhSubCategory}>{x.subCategory}</p>
              </div>
            </div>
          </>
        ))}
      </div>


    </>
  )
}