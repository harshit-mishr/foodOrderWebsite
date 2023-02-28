import React, { useState, useEffect } from "react";
import Style from './CartSection.module.css'
import { AiFillStar, AiTwotoneStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { data } from "../../Storage/addtoCart";
import { CiShoppingCart } from "react-icons/ci";
  
import CustomButton from "../../Atom/CustomButton";
 
import ComponentNavBar from "../../Atom/ComponentNavBar/ComponentNavBar";
import { useRecoilState } from "recoil";
export default function Cart() {
    const navi = useNavigate()
    const [recoilData,setRecoilData] = useRecoilState(data)
    console.log(recoilData,'from recoil data')
    const [ list , setList] = useState(recoilData)
    let sum = 0
    for(let i = 0 ; i < recoilData.length ; i ++){
     sum = sum + recoilData[i].card.info.price
    }
    const [price ,setPrice] = useState(sum/100)

    // const [itemCart, setItemCart] = useState(JSON.parse(localStorage.getItem("forCart"))||[])
    //  const [dlt,setDlt] = useState([])

    const handleDltItem = (x) => {
       const newItems = list.filter(e=> e.card.info.name !== x.card.info.name)                       
       setList([...newItems])
       setRecoilData([...newItems])
       setPrice((price - x.card.info.price/100))
        // localStorage.setItem("forCart", JSON.stringify(itemCart))
    }


    return (
        <><div className={Style.navBarbox}><div className={Style.companyName} onClick={()=>navi("/")} >Foodtopia</div><span className={Style.navbarsearch} ><ComponentNavBar/></span><div></div></div>
        <div className={Style.mainCart} >  
        <div>
           {list?.map((x, idx) => (
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
                <div>
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
                    <CustomButton className={Style.ButtonStyle} onClick={() => handleDltItem(x)} buttonText="Delete Item" />
                </div>
            </div>
        ))}
        </div>
        <div className={Style.AddToCart} >
        <div className={Style.count}><span className={Style.cout}>{recoilData.length}</span><span><CiShoppingCart  className={Style.cart} /></span></div>
        <span className={Style.price} >Total : {price}</span>
        <CustomButton onClick={()=>navi("/hotel/menucard/cart/payment")} className={Style.buy} buttonText="Proceed to Buy"/>
        </div>
        </div>
        </>
    )
}