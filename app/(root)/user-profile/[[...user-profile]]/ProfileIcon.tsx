import Image from "next/image";
import React from "react";

const ProfileIcon = () => {
  return (
    <Image className="invert" src="/assets/icons/account.svg" alt="user" width={20} height={20} />
  );
};

export default ProfileIcon;
