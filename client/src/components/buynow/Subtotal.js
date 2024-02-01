import React, { useEffect, useState } from 'react'

const Subtotal = ({item}) => {

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
    <div className='sub_item'>
        <h3>Subtotal ({item.length} Item) : <strong style={{fontweigt:700 , color: "#111"}}>Rs{price}.00 </strong></h3>

    </div>
  )
}

export default Subtotal;