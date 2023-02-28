import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdOutlineDirectionsBike, MdCategory } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { BiTimeFive } from "react-icons/bi";
import CustomButton from "../../Atom/CustomButton";
import { useRecoilState } from "recoil"; 
import {data} from '../../Storage/addtoCart'

import Style from "./MenuCard.module.css";
import ComponentNavBar from "../../Atom/ComponentNavBar/ComponentNavBar";
export default function SingleRestroPage() {
  const [recoilData,setRecoilData] = useRecoilState(data) //recoil
  const [name, setName] = useState("Foodtopia");
  const [city, setCity] = useState("");
  const [img, setImg] = useState("");
  const [rating, setRating] = useState("");
  const [starRating, setStarRating] = useState("");
  const [area, setArea] = useState("");
  const [costTwo, setCostTwo] = useState("");
  const [deleveryTime, setDeliveryTime] = useState("");
  const [discount, setDiscount] = useState([]);
  const [all, setAll] = useState([]);
  //==========================================
  const cartLength = JSON.parse(localStorage.getItem("forCart"))
  const [count, setCount] = useState(cartLength)
  //========================================
     const [cartItem, setCartItem] = useState([])
  //==========================================
  const clickRestro = JSON.parse(localStorage.getItem("hotelData"));
  const latitude = JSON.parse(localStorage.getItem("latitude"));
  const longitude = JSON.parse(localStorage.getItem("longitude"));
  //============================================
  const navi = useNavigate()
  //============================================
  console.log(clickRestro.data.id, "singleRestro");
  const restaurantId = clickRestro.data.id;

  async function fetchClickRestro() {
    const res = await fetch(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${restaurantId}&submitAction=ENTER`
    );
    const data = await res.json();
    console.log(data, "sigle hotem all menu"); //
    console.log(data.data.cards[0].card.card.info, "info"); //info of restro
    setName(data.data.cards[0].card.card.info.name);
    setImg(data.data.cards[0].card.card.info.cloudinaryImageId);
    setCity(data.data.cards[0].card.card.info.city);
    setArea(data.data.cards[0].card.card.info.areaName);
    setRating(data.data.cards[0].card.card.info.totalRatingsString);
    setDiscount(
      data.data.cards[0].card.card.info.aggregatedDiscountInfo.descriptionList
    );
    setStarRating(data.data.cards[0].card.card.info.avgRating);
    setCostTwo(data.data.cards[0].card.card.info.costForTwoMessage);
    setDeliveryTime(data.data.cards[0].card.card.info.sla.deliveryTime);
    console.log(
      data.data.cards[3].groupedCard.cardGroupMap.REGULAR.cards,
      "mapping",
      "food original"
    );
    setAll(data.data.cards[3].groupedCard.cardGroupMap.REGULAR.cards); // try for all card
  }
  useEffect(() => {
    fetchClickRestro();
  }, []);
  function handleAddItem(x) {

     setRecoilData([x,...recoilData])
  }
  console.log(recoilData,"recoil data")
  function goingToCard() {
    navi("/hotel/menucard/cart")
  }

  return (
    <>

      <div className={Style.navBarbox}><div className={Style.companyName}>Foodtopia</div><span className={Style.navbarsearch} ><ComponentNavBar /></span><div></div><div className={Style.count}><span className={Style.cout}>{recoilData?.length}</span><span><CiShoppingCart onClick={goingToCard} className={Style.cart} /></span></div></div>
      <div className={Style.mainbox}>

        <div className={Style.box}>
          <div className={Style.hotelDetails}>
            <p className={Style.hotelName} >{name}</p>
            <p className={Style.hotelAdd}>{area},{city}</p>

            <p className={Style.hotelTiming} >Open now -
              12midnight – 4am, 10am – 12midnight (Today)
            </p>
            <p className={Style.hotelCostOfTwo} >{costTwo}</p>
            <div className={Style.hotelButton} ><div className={Style.hotelBtn}><MdOutlineDirectionsBike className={Style.hotelIcon} /> Dirextion</div><div className={Style.hotelBtn} ><BsFillBookmarkFill className={Style.hotelIcon} /> Bookmark</div><div className={Style.hotelBtn}><IoIosShareAlt className={Style.hotelIcon} /> Share</div></div>
          </div>
          <div>
            <div>
              <img
                className={Style.hotelImg}
                width=""
                src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${img}`}
                alt="hotel pic"
              />
              <div className={Style.hotelRating} >
                <div className={Style.Ratingfull} ><p className={Style.Rating}  >{starRating}<AiFillStar /></p><p className={Style.RatingYear}><p>2011, </p><p> Dining Reviews</p></p> </div>
                <div className={Style.Ratingfull}><p className={Style.discount} >{rating}</p><p className={Style.RatingYear}>Delivery Reviews</p> </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={Style.Order}>
            <p className={Style.OrderName}>Order Online</p>
            <p className={Style.OrderLive}><span>Live track your order</span>  | <span><sub><  BiTimeFive style={{ fontSize: "1.4rem" }} /></sub> {deleveryTime} min</span>  </p>
            <p className={Style.OrderCart} > <p className={Style.OrderOffer}>{discount.map((x) => (<p>{x.meta}</p>))}</p><p></p>  </p>
          </div>
          <div className={Style.Order}>
            <p className={Style.OrderName}>Today's Exclusive Dishes</p>
            {all?.map((x) => (
              <div className={Style.main}>
                {x.card.card.itemCards?.map((x) => (
                  <div className={Style.card}>
                    {x.card.info.imageId ? (
                      <img
                        className={Style.img}
                        src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${x.card.info.imageId}`}
                        alt="dishes"
                      />
                    ) : (
                      <img
                        className={Style.img}
                        width="208px"
                        src="https://static.vecteezy.com/system/resources/previews/000/428/795/original/fast-food-icon-vector.jpg"
                        alt="dummyImage"
                      />
                    )}
                    <div className={Style.card1} >
                      <p className={Style.head}>{x.card.info.name}</p>
                      <p className={Style.head}>
                        &#x20B9;<span>{Number(x.card.info.price) / 100}</span>
                      </p>
                      <p className={Style.green}>
                        <AiFillStar />
                        {x.card.info.ribbon.text} {console.log(x.card.info.ribbon.text, "start")}
                      </p>
                      <p className={Style.bot}>
                        <MdCategory />
                        {x.card.info.category}
                      </p>
                      <p className={Style.quant}>
                        {x.card.info.itemAttribute?.portionSize}
                      </p>
                      <CustomButton className={Style.ButtonStyle} onClick={() => handleAddItem(x)}

                        buttonText={x.isAdd ? "Remove" : "Add Item"} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


{/* <img
          className={style.restroImg}
          width=""
          src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${img}`}
          alt="hotel pic"
        /> */}