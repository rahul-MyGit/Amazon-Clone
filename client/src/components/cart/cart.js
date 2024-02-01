import  { React, useContext, useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { fontSize } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import "./cart.css";
import { LoginContext } from "../context/ContextProvider";

const Cart = () => {


  const { id } = useParams("");


  const history = useNavigate("");

  const {account,setAccount} = useContext(LoginContext)

  const [inddata, setIndData] = useState("");
  //console.log(inddata);

  const getinddata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      console.log("No data available");
    } else {
      console.log("getdata");
      setIndData(data);
    }
  };

  useEffect(() => {
    getinddata();
  }, [id]);

  //add to cart function---------------------->

  const addtocart = async(id)=>{
    const checkers = await fetch(`/addcart/${id}` , {
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        inddata
      }),
      credentials:"include"
    });

    const data1 = await checkers.json();
    console.log(data1);

    if(checkers.status ===  401 || !data1){
      console.log("user valid");
      alert("user invalid");
    }else{
      //alert("item added in your cart");
      history("/buynow");
      setAccount(data1);
    }
  }

  return (
    <div className="cart_section">
      {inddata && Object.keys(inddata).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.detailUrl} alt="cart_img" />
            <div className="cart_btn">
              <button className="cart_btn1" onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>
            {inddata.title.longTitle}
            </h4>
            <Divider />
            <p>
              M.R.P: <span>RS {inddata.price.mrp}</span>
            </p>
            <p>
              Deal of the day: <span style={{ color: "red" }}>RS {inddata.price.cost}</span>
            </p>
            <p>
              You save: <span style={{ color: "red" }}>RS {inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})</span>
            </p>
            <div className="discount_box">
              <h5>
                Discount:<span style={{ color: "#111" }}>{inddata.discount}</span>
              </h5>
              <h4>
                Free delivery:<span style={{ color: "#111" }}>Oct 8-21 </span>
                Details
              </h4>
              <p>
                Fastest delivery:{" "}
                <span style={{ color: "#111" }}>Tomorrow 11AM</span>
              </p>
              <p className="description">
                About the Item:
                <span
                  style={{
                    color: "#565959",
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.4px",
                  }}
                >
                  {inddata.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
