import axios from "axios";
import React, { useEffect, useState } from "react";
import { Token } from "./types";

interface HeroProps {
  name: Token["name"];
  icon: Token["image"];
  price: Token["current_price"];
  symbol: Token["symbol"];
}

export const Hero: React.FC<HeroProps> = ({ name, icon, price, symbol }) => {
  return (
    <div>
      <h1>{name}</h1>
      <img src={icon}></img>
      <h3>Price:${price}</h3>
      <h3>{symbol.toUpperCase()}</h3>
    </div>
  );
};
