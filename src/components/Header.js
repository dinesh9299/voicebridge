import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className=" p-1 w-100   text-center bg-info App-header text-white">
        <h3 className="reggae-one-regular">
          <Link to={"/"} className=" text-decoration-none text-white">
            VoiceBridge
          </Link>
        </h3>
      </header>
    </div>
  );
};

export default Header;
