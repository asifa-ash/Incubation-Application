import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import Store from "../../utils/userStore/ContextApi";
import "./Home.css";
import jwt_decode from "jwt-decode";
import { useState } from "react";

function Home() {
  let location = useLocation();
  const userData = useContext(Store);
  let [, setParams] = useSearchParams();
  const [progress, setProgress] = useState(0);

  let token = location.search.split("token=")[1]
    ? location.search.split("token=")[1]
    : null;
  if (token) localStorage.setItem("token", token);
  const isThereAnyDataBase = (body) => {
    return new Promise((resolve, reject) => {
      console.log(body);
      fetch(`${process.env.REACT_APP_SERVER_IP}/userData`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data.isThere);
        });
    });
  };
  //`${process.env.REACT_APP_SERVER_IP}/userData`

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let decoded = jwt_decode(localStorage.getItem("token"));

      isThereAnyDataBase(decoded).then((isThere) => {
        console.log("chk database : ", isThere, decoded);
        if (!isThere) {
          userData.remove();
          localStorage.removeItem("token");
        } else {
          console.log(decoded, "hi");
          userData.add(decoded);
          setParams("");
        }
      });
    } else {
      userData.remove("");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let decoded = jwt_decode(localStorage.getItem("token"));

      fetch(`${process.env.REACT_APP_SERVER_IP}/userData`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(decoded),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          userData.add(data.userData);
          //setting up css variable for progress
          document.documentElement.style.setProperty(
            "--progress",
            `${data.userData.progress === 0 ? "" : data.userData.progress}%`
          );
          //setting up progress state whn page reload or mount or update

          setProgress(data.userData.progress);
        });
    }
    if (!userData.loginState) {
      document.documentElement.style.setProperty("--progress", `*`);
    }
  }, []);

  return (
    <div className="homePage">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <div className=" navbar-brand">
            <h1>Entrepreneur</h1>
          </div>
          <div className="hstack gap-5">
            <div className="add-app-btn">
              {userData.user.submitted || !userData.loginState ? (
                ""
              ) : (
                <Link to={"/application"}>
                  <p className="pi"> Application</p>
                </Link>
              )}
            </div>

            <div
              onClick={() => {
                localStorage.removeItem("token");
                userData.remove();
                setProgress(0);
                document.documentElement.style.setProperty("--progress", `*`);
              }}
              className="logOut nav-link"
            >
              {userData.loginState ? (
                <p style={{ cursor: "pointer" }} className="logOutp nav-link">
                  LogOut
                </p>
              ) : (
                <Link
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  to={"/login"}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <section className="h-100 w-100 container-fluid bg-dark d-flex align-items-center flex-column">
        <div
          className="labelProgress"
          data-status={userData.user.submitted ? "Progress" : "😁"}
        ></div>
        <div className="h-100 w-100 container d-flex align-items-center justify-content-center">
          <div className="progressCircle">
            <span
              className="innerSpin"
              data-progress={
                progress === "rejected" ? "Rejected" : progress + "% Completed"
              }
            ></span>
          </div>
          <div className="lines container">
            <p>Welcome</p>
            <p>{userData.loginState ? userData.user.name : "Stranger"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
