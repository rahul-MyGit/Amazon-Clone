const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// get productdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log("console the data"+ productsdata);
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error " + error.message);
  }
});

//get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const individualdata = await Products.findOne({ id: id });

    //console.log(individualdata + "individual data");

    res.status(201).json(individualdata);
  } catch {
    res.status(400).json(individualdata);
    console.log("error " + error.message);
  }
});

//register data post api

router.post("/register", async (req, res) => {
  //console.log(req.body);

  const { name, email, number, password, cpassword } = req.body;

  if (!name || !email || !number || !password || !cpassword) {
    res.status(422).json({ error: "all fields are mandatory" });
    console.log("no data available");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "this user already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password doesn't match" });
    } else {
      const finalUser = new USER({
        name,
        email,
        number,
        password,
        cpassword,
      });

      //hash -> encrypt hujug ->> decrypt -> hash
      // bcryptjs

      // password hashing process

      const storedata = await finalUser.save();
      console.log(storedata);
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log("error" + error.message);
    res.status(422).send(error);
  }
});

//Login user api ----------------------------------------------------------------->

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill all the data" });
  }

  try {
    const userlogin = await USER.findOne({ email: email });
    console.log(userlogin + "user value");

    if (userlogin) {
      const isMatch = await bcryptjs.compare(password, userlogin.password);
      //console.log(isMatch);

      //token generate-->

      const token = await userlogin.generateAuthToken();
      //console.log(token);

      //generate cookie--->

      res.cookie("Amazonweb", token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000), //setting expiration time 2 hours from now
        httpOnly: true, //making cookie HTTp-only to enhance security
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid details" });
      } else {
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "Invalid details" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid details" });
  }
});

// adding the data into cart----->

router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    console.log(cart + "cart value");

    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);

      res.status(201).json(UserContact);
    } else {
      res.status(401).json({ error: "Invalid User" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid User" });
  }
});

//get cart details ----------------------------------------------->

router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    console.log("error" + error);
  }
});

//get valid user------------------------------------->

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuser1 = await USER.findOne({ _id: req.userID });
    res.status(201).json(validuser1);
  } catch (error) {
    console.log("error" + error);
  }
});

//remove item from cart ------------------------------------------------>

router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((cruval) => {
      return cruval.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("item removed");
  } catch (error) {
    console.log("error" + error);
    res.status(400).json(req.rootUser);
  }
});

//for user log out----------------------->

router.get("/logout",authenticate,(req,res)=>{
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currelem)=>{
      return currelem.token !== req.token
    });


    res.clearCookie("Amazonweb",{path:"/"});

    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    console.log("User Logout")
  } catch (error) {
    console.log("error for user logout");
  }
})

module.exports = router;
