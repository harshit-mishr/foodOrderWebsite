import React,{useState} from "react";
import CustomButton from '../../Atom/CustomButton'
import CustomInput from '../../Atom/CustomInput'
import Style from "./Payment.module.css";
 export default function Payment(){
    const [show,setShow] = useState(false)
    const [data,setData] = useState({})
    const [error,setError] = useState({})
    function captureEmail(e) {
        setData({...data,email: e.target.value})
        const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (regEmail.test(data.email)) {
          setError({...data,emailError: "2px solid green"});
        } else if(!regEmail.test(data.email) &&  data.email !== ""){
          setError({...data,emailError: "2px solid red"})
        }
      }
    function handleClick(){
        console.log(data)
        const userdetails = data
        setShow(true)
    }

    return(
        <>
        <div className={Style.mainDiv}> 
       
        {show ? <div className={Style.SussDiv}>Successfully Order Sent</div> : ""}
        <div className={Style.mainD} >
        <div className={Style.mainBox} >
            <div className={Style.Box1}  >
                <h3>BILLING ADDRESS</h3>
                <span>Full Name :</span>
                <CustomInput  onChange={(e)=>setData({...data,name: e.target.value})} className={Style.Input1}/>
                <span>Email :</span>
                <CustomInput style={{border : error.emailError}} value={data.email} onChange={captureEmail} className={Style.Input1}/>
                <span>Address :</span>
                <CustomInput onChange={(e)=>setData({...data,address: e.target.value})} className={Style.Input1}/>
                <span>City :</span>
                <CustomInput onChange={(e)=>setData({...data,City: e.target.value})} className={Style.Input1}/>
                <div className={Style.Box2}>
                    <div className={Style.Box3}><span>State :</span><CustomInput onChange={(e)=>setData({...data,state: e.target.value})} className={Style.Input2}/></div>
                    <div className={Style.Box3}><span>Zip Code :</span><CustomInput type="number" onChange={(e)=>setData({...data,zipCode: e.target.value})} className={Style.Input2}/></div>
                </div>
            </div>
            <div className={Style.Box1} >
                <h3>PAYMENT</h3>
                <span>Card Accepted</span>
                <div className={Style.ImgDiv}>
                    <img className={Style.Img} src="https://financialit.net/sites/default/files/068bjcjwbw0snwhiq0kno5m-15.1602794215.png" />
                    <img className={Style.Img} src="https://images.livemint.com/img/2021/07/14/1600x900/AFP_9BQ6PY_1626265698497_1626265712931.jpg" />
                    <img className={Style.Img} src="https://www.bankrate.com/2022/06/06135736/Amex-cd-rates.jpg?auto=webp&optimize=high&crop=16:9"/>
                    <img className={Style.Img} src="https://www.investopedia.com/thmb/3H96L9iC_VUhvsqmnypxfEQW4UA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/full-color-800x450-cee226a48bed4177b90351075b332227.jpg"/>
                </div>
                <span>Name On Card</span>
                <CustomInput onChange={(e)=>setData({...data,cardName: e.target.value})} className={Style.Input1}/>
                <span>Credit Card number</span>
                <CustomInput onChange={(e)=>setData({...data,cardNumber: e.target.value})} className={Style.Input1}/>
                <span>Exp Month</span>
                <CustomInput onChange={(e)=>setData({...data,ExpMonth: e.target.value})} className={Style.Input1}/>
                <div  className={Style.Box2} >
                    <div className={Style.Box3}><span>Exp Year :</span><CustomInput onChange={(e)=>setData({...data,year: e.target.value})} type="year"  className={Style.Input2}/></div>
                    <div className={Style.Box3}><span>CVV :</span><CustomInput type="password" onChange={(e)=>setData({...data,cvv: e.target.value})} className={Style.Input2}/></div>
                </div>
            </div>
        </div>
       <p><CustomButton onClick={handleClick} buttonText='Submit' className={Style.btn}/></p> 
        </div>
        
        
        </div>
        </>
    )
 }