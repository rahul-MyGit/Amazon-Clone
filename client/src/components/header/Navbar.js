import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import RightHeader from "./RightHeader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  //console.log(account);

  const history = useNavigate();

  const [text,setText] = useState("");
  //console.log(text);
  const [liopen,setLiopen] = useState(true);

  const {products} = useSelector(state => state.getproductsdata);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dropen, setdropen] = useState(false);

  const cartItemCount = account && account.carts ? account.carts.length : 0;

  const getdetailvaliduser = async () => {
    const res = await fetch("/validuser", {
      method:"Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    //console.log(data);

    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };

  const handleopen = () => {
    setdropen(true);
  };

  const handledrclose = () => {
    setdropen(false);
  };



  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method:"GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    //console.log(data);

    if (res2.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(false);
      toast.success('User Logged Out Succesfully', {
        position: "top-center",
        theme: "colored",})
      history("/");
      
      
    }
  };

  const getText = (items)=>{
    setText(items);
    setLiopen(false);
  }

  useEffect(() => {
    getdetailvaliduser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburger" onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handledrclose}>
            <RightHeader logclose={handledrclose} />
          </Drawer>

          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbar">
            <input type="text"
            onChange={(e)=>getText(e.target.value)}
            placeholder="search item"
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/*search filter*/}

            {
              text && 
              <List className="extrasearch" hidden={liopen}>
                {
                  products.filter(product =>product.title.longTitle.toLowerCase().includes(text.toLocaleLowerCase())).map(product=>(
                    <ListItem>
                      <NavLink to={`/getproductsone/${product.id}`}>
                      {product.title.longTitle}
                      </NavLink>
                      
                    </ListItem>
                  ))
                }
              </List>
            }
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">Sign In</NavLink>
          </div>
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}
            <ToastContainer/>

            <p>Cart</p>
          </div>
          {account ? (
            <Avatar
              className="avatar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.name[0].toUpperCase()}{" "}
            </Avatar>
          ) : (
            <Avatar
              className="avatar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {" "}
            </Avatar>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {account ? (
              <>
                <MenuItem onClick={handleClose}><PermIdentitySharpIcon style={{fontSize:"20px",marginRight:"3"}}/>My account</MenuItem>
                <MenuItem onClick={()=>{handleClose(); logoutuser();}} ><LogoutIcon style={{fontSize:"20px",marginRight:"3"}}/>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleClose}>
                <NavLink
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#000000DE",
                    fontSize: "16px",
                    fontFamily: "Roboto",
                  }}
                ><LoginIcon style={{fontSize:"16px",marginRight:"3"}}/>
                  Sign in
                </NavLink>
              </MenuItem>
            )}
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
