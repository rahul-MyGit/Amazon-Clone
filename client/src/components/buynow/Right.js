import {React,useState,useEffect} from 'react'

const Right = ({item}) => {


  const [price,setPrice] = useState(0);

  useEffect(()=>{
    totalAmount();
  },[item])

  const totalAmount = () => {
    let price = 0;
    
    item.map((item)=>{
    
      price += item.price.cost
    });
  
    setPrice(price)

  }

  return (
    <div className='right_buy'>
        <img src='' alt='' />
        <div className="cost_right">
            <p> Your order is eligible for FREE order</p> <br />
            <span style={{color: "#56595"}}>Select this option at checkout</span>
            <h3>Subtotal ({item.length} Item) :<strong style={{fontWeight: 700}}>Rs{price}.00</strong></h3>
            <button className='rightbuy_btn'>Process to Buy</button>
            <div className="emi">
                 Emi Available
            </div>
        </div>
    </div>
  )
}

export default Right;