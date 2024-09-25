import React from "react";
import Header from "./Header";
import speaker from "../images/speaker.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <div className=" text-center mt-3 ">
        <h1 className=" lora ">Welcome to VoiceBridge</h1>
        <div className=" fw-semibold">
          Your Gateway to Text and Speech Transformation
        </div>
        {/*Desktop */}
        <div
          className=" d-none d-lg-flex d-md-flex d-sm-none mt-4  d-flex align-items-center gap-5 justify-content-center "
          style={{ height: "60vh" }}
        >
          <div
            className=" card border-0 shadow p-4 w-25 bg-transparent"
            style={{ height: "200px", cursor: "pointer" }}
          >
            <Link to={"/ttos"} className=" text-decoration-none">
              <div className=" text-center">
                <img src={speaker} alt="speaker" width={"100px"}></img>
              </div>
              <div className=" mt-4">Text-To-Speech</div>
            </Link>
          </div>
          <div
            className=" card border-0 shadow p-4 w-25 bg-transparent "
            style={{ height: "200px", cursor: "pointer" }}
          >
            <Link to={"/stot"} className=" text-decoration-none">
              <div className=" text-center">
                <div
                  className="bi bi-mic-fill text-warning "
                  style={{ fontSize: "95px", marginTop: "-25px" }}
                ></div>
                <div className=" mt-2">Speech-To-Text</div>
              </div>
            </Link>
          </div>
        </div>

        {/*Mobile */}

        <div
          className="  d-sm-block d-lg-none d-md-none mt-4  mx-3 align-items-center gap-5 justify-content-center "
          style={{ height: "60vh" }}
        >
          <div
            className=" card mb-4 border-0 shadow-sm p-4 w-100 bg-transparent"
            style={{ height: "200px", cursor: "pointer" }}
          >
            <Link to={"/ttos"} className=" text-decoration-none">
              <div className=" text-center">
                <img src={speaker} alt="speaker" width={"100px"}></img>
              </div>
              <div className=" mt-4">Text-To-Speech</div>
            </Link>
          </div>
          <div
            className=" card border-0 shadow-sm p-4 w-100 bg-transparent "
            style={{ height: "200px", cursor: "pointer" }}
          >
            <Link to={"/stot"} className=" text-decoration-none">
              <div className=" text-center">
                <div
                  className="bi bi-mic-fill text-warning "
                  style={{ fontSize: "95px", marginTop: "-25px" }}
                ></div>
                <div className=" mt-2">Speech-To-Text</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
