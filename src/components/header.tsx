import * as React from "react";
import "./header.css";
import siteLogo from "./siteLogo.svg";

export interface IHeaderProps {
  onSearch: (query: string) => void;
}

export default function Header(props: IHeaderProps) {
  return (
    <div className="header">
      <img src={siteLogo} alt="" className="siteLogo"></img>
      <div className="spacer"></div>
      <div className="searchBar">
        {" "}
        <input
          className="searchBar"
          type="search"
          placeholder="find your station"
          onChange={(e) => {
            props.onSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
