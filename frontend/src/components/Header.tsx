import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <div className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-6">
          <Link href="/">
            <li className="hover:underline cursor-pointer">Home</li>
          </Link>
          <Link href="/about">
            <li className="hover:underline cursor-pointer">About</li>
          </Link>
          <Link href="/products">
            <li className="hover:underline cursor-pointer">Products</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
