import React, { useState,useEffect } from 'react';
import {
    FaTh,
    FaBars,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    useEffect(() => {
        const handleResize = () => {
          setIsOpen(window.innerWidth >= 560);
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    const menuItem=[
        {
            path:"/",
            name:"Population Graph",
            icon:<FaTh/>
        },

        {
            path:"/currency",
            name:"Currency",
            icon:<FaRegChartBar/>
        },
        {
            path:"/cryptoprices",
            name:"Crypto Etherum",
            icon:<FaCommentAlt/>
        },
        {
            path:"/connect-wallet",
            name:"Wallet",
            icon:<FaShoppingBag/>
        },
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "300px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Trader</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} onClick={toggle} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;