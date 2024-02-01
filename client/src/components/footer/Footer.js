import React from 'react'
import { NavLink } from 'react-router-dom';
import './footer.css';

const Footer = () => {

    const year = new Date().getFullYear();
    console.log(year)


  return (
    <footer>
        <div className="footer_container">
            <div className="footer_details_one">
                <h3>Get to Know Us</h3>
                <p>About us</p>
                <p>Careers</p>
                <p>Press Releases</p>
                <p>Ayush Jha Amazon</p>
            </div>
            <div className="footer_details_one">
                <h3>Connect with Us</h3>
                <p>facebook</p>
                <p>Twitter</p>
                <p>Instagram</p>
            </div>
            <div className="footer_details_one forres">
                <h3>Make Money With Us</h3>
                <p>Sell on Amazon</p>
                <p>Sell Under amazon Accelerator</p>
                <p>Advertise Your products</p>
                <p>Amazon Pay on merchants</p>
                <p>Amazon global selling</p>
            </div>
            <div className="footer_details_one forres">
                <h3>let Us Help You</h3>
                <p>Covid-19</p>
                <p>your Account</p>
                <p>return Center</p>
                <p>100% purchase protection</p>
                <p>help</p>
            </div>
            
        </div>
        <div className="lastdetails">
                <img src='./amazon_PNG25.png' alt=''/>
                <p>Conditons Of use And Sale  &nbsp; &nbsp; &nbsp;&nbsp; Privacy Notice &nbsp; &nbsp; &nbsp;&nbsp; Interest-based Ads &nbsp; &nbsp; &nbsp;&nbsp; @1996-{year},Amazon.com,Inc,Or Its affiliate</p>
            </div>
    </footer>
  )
}

export default Footer