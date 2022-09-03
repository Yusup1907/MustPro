import {
  faBuildingUser,
  faHouseCircleCheck,
  faTreeCity,
  faLayerGroup,
  faBed,
  faPerson,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBuildingUser} />
            <span>Apartemen</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTreeCity} />
            <span>Ruko & Rumah</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faHouseCircleCheck} />
            <span>Indekos</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faMap} />
            <span>Tanah</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faLayerGroup} />
            <span>Design rumah</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Temukan Tempat Impian Anda Bersama MustPro.
            </h1>
            <p className="headerDesc">
            Dapatkan hadiah untuk properti Anda– buka penghematan instan 10% atau lebih dengan akun MustPro gratis
            </p>
            <button className="headerBtn">Sign in / Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder=""
                  className="headerSearchInput"
                />
              </div>
              
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  className="headerSearchText"
                ></span>
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn">
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;