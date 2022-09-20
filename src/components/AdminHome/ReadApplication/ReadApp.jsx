import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Store from "../../../utils/userStore/ContextApi";
import './style.css'

function ReadApp() {
  let bodyElement = useRef();
  let scrollbar = useRef();



  function scrollProgress(e) {
    let totalHeight = e.target.scrollHeight - document.body.clientHeight;
    let Progress = (e.target.scrollTop / totalHeight) * 100;
    scrollbar.current.style.height = `${Progress.toFixed()}%`;
  }

  useEffect(() => {
    if (bodyElement) {
      if (bodyElement.current.clientHeight === bodyElement.current.scrollHeight) {
        bodyElement.current.style.minHeight = "100%";
        bodyElement.current.style.maxHeight = "";
      } else {
        bodyElement.current.style.minHeight = "";
        bodyElement.current.style.maxHeight = "100%";
      }
    }
  }, [bodyElement]);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/adminhome`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        app.adminData(data.users, data.app);
      });
  }, []);

  let param = useParams();
  const [cname, setCname] = useState('')
  const app = useContext(Store);
  let application = app.app_data.map((elem, i) =>
    elem._id === param.id ? (

      <div className="box text-light">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item ">
              <Link style={{ color: "white" }} to={"/admin"}>
                Applications
              </Link>
            </li>

            <li class="breadcrumb-item active" aria-current="page">
              {elem.cname}
            </li>
          </ol>
        </nav>
        <hr className="hr" />
        <h6>Address</h6>
        <p style={{ textAlign:"left" }}>{elem.address}</p>
        <hr className="hr" />
        <h6>City</h6>
        <p  style={{ textAlign:"left" }}>{elem.city}</p>
        <hr className="hr" />
        <h6>State</h6>
        <p style={{ textAlign:"left" }}>{elem.state}</p>
        <hr className="hr" />
        <h6>Phone NO</h6>
        <p  style={{ textAlign:"left" }}>{elem.no}</p>
        <hr className="hr" />
        <h6>Team and Background</h6>
        <p  style={{ textAlign:"left" }}>{elem.name1}</p>
        <hr className="hr" />
        <h6>Address</h6>
        <p  style={{ textAlign:"left" }}>{elem.name2}</p>
        <hr className="hr" />
        
        

      </div>

    ) : (
      ""
    )
  );

  return <>
    <div className="adminhome">

      <div className="scrollbar"></div>
      <div className="progressbar" ref={scrollbar}></div>
      <div onScroll={scrollProgress} className="body" ref={bodyElement}>


        <div className="container">
          {application}
        </div>

      </div>
    </div></>;
}

export default ReadApp;
