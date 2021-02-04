import React from 'react';
import { FaWhatsapp,FaViber,FaTelegramPlane } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

const FooterPage =()=>{
    return(
        <header className="site-header sticky-top py-1" style={{background: "black"}}>
  <nav className="container d-flex flex-column flex-md-row justify-content-between">
    <a className="py-2" href="#" aria-label="Product">
        Contact Us :
    </a>
    <a className="py-2 d-none d-md-inline-block" href="#"><FaWhatsapp/>Whatsapp:+21624065396</a>
    <address>
        <a className="py-2 d-none d-md-inline-block" href="mailto:TuniLawyer@gmail.com">
        <CgMail/>Mail:TuniLawyer@gmail.com</a>
</address>
    <a className="py-2 d-none d-md-inline-block" href="#"><FaViber/>Viber:+21624065396</a>
   
  </nav>
</header>

    )
}
export default (FooterPage)