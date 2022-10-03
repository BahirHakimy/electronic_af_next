import React from "react";
import {
  AiOutlinePieChart,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Image from "next/image";
import { BiCommentEdit, BiUser, BiUserPin } from "react-icons/bi";
import { FaBoxes } from "react-icons/fa";
import { useRouter } from "next/router";

import NavItem from "./NavItem";

const navs = [
  { link: "/admin", title: "Dashboard", Icon: AiOutlinePieChart },
  { link: "/admin/staff", title: "Staff", Icon: BiUser },
  { link: "/admin/products", title: "Products", Icon: AiOutlineShopping },
  { link: "/admin/customers", title: "Customers", Icon: BiUserPin },
  { link: "/admin/orders", title: "Orders", Icon: AiOutlineShoppingCart },
  { link: "/admin/reviews", title: "Reviews", Icon: BiCommentEdit },
  { link: "/admin/stock", title: "Stock", Icon: FaBoxes },
];

function Nav() {
  const { pathname } = useRouter();

  return (
    <ul className="bg-cyan-600 w-10 md:w-52 h-screen">
      <li className="w-full text-center mt-5">
        <div className="w-20 h-20 p-2 m-auto bg-slate-50 rounded-xl">
          <Image src="/logo120.png" width={120} height={120} alt="logo" />
        </div>
      </li>
      {navs.map((nav) => (
        <NavItem
          key={nav.title}
          link={nav.link}
          title={nav.title}
          active={nav.link === pathname}
          Icon={nav.Icon}
        />
      ))}
    </ul>
  );
}

export default Nav;
