import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Menu.css";
import { Link } from "react-router-dom";

const Menu = ({ isOpen, isClosing, onClose }) => {
  const menuRef = useRef(null);
  const isGuest = localStorage.getItem("isGuest");
  let menuItems;
  if (isGuest === "false")
    menuItems = {
      HOME: "/",
      ABOUT: "/about",
      "SHIFT INTO HIGH GEAR": "/products",
      ORDERS: "/orders",
    };
  else
    menuItems = {
      HOME: "/",
      ABOUT: "/about",
      "SHIFT INTO HIGH GEAR": "/products",
    };
  const menuItemRefs = Object.keys(menuItems).reduce((acc, item) => {
    acc[item] = useRef(null);
    return acc;
  }, {});

  useEffect(() => {
    gsap.set(menuRef.current, { autoAlpha: 0, x: "-100%" });
    gsap.set(
      Object.values(menuItemRefs).map((ref) => ref.current),
      { autoAlpha: 0, x: "-1000px" }
    );

    if (isOpen) {
      const tl = gsap.timeline();
      tl.to(menuRef.current, { x: "0%", duration: 0.5, autoAlpha: 1 }).fromTo(
        Object.values(menuItemRefs).map((ref) => ref.current),
        { x: "-1000%", autoAlpha: 0 },
        { x: "-120", autoAlpha: 1, stagger: -0.2 }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isClosing) {
      gsap.to(menuRef.current, {
        x: "-100%",
        duration: 1,
        autoAlpha: 0,
        delay: 0.5,
      });
      gsap.to(
        Object.values(menuItemRefs).map((ref) => ref.current),
        { x: "-1000%", autoAlpha: 0, stagger: 0.2, duration: 0.5 }
      );
    }
  }, [isClosing]);

  return (
    <div ref={menuRef} className="menu">
      {Object.keys(menuItems).map((item) => (
        <div key={item} ref={menuItemRefs[item]}>
          <Link to={menuItems[item]} className="menu-link" onClick={onClose}>
            <div className="menu-item">{item}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
