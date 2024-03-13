import React from "react";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <div className="flex w-full flex-row flex-wrap justify-between border-t-2 p-3">
      <div className="p-3">
        <FooterLinks />
      </div>
      <div className="mx-auto pt-3 sm:m-0">
        <p>© 2024 Gec Portal @ CUH</p>
      </div>
    </div>
  );
};

export default Footer;
