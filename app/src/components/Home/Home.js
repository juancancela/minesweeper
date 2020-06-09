import React from "react";
import "./Home.css";
import logo from "./logo.png";
import { getUserToken } from "../../store";
import { Link } from "react-router-dom";

const ITEMS = [
  {
    name: "Github Repo",
    link: "https://github.com/juancancela/minesweeper",
  },
  {
    name: "Code Docs",
    link: "http://192.241.136.96:3002/",
  },
];

export default function Home() {
  const token = getUserToken();
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h1>Minesweeper Project</h1>
        <Link className="Home-play-now-btn" to={token ? "/setup" : "/login"}>
          {token ? "Create Match" : "Sign In"}
        </Link>
        <div></div>
        {ITEMS.map((item, idx) => (
          <a
            key={`items-${idx}`}
            className="Home-link"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.name}
          </a>
        ))}
      </header>
    </div>
  );
}
