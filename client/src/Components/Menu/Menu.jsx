import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Menu.css";

const Menu = ({ isOpen, isClosing, onClose }) => {
  const menuRef = useRef(null);
  const menuItems = ["Home", "About", "Services", "Contact"];
  const menuItemRefs = menuItems.map(() => useRef(null));

  useEffect(() => {
    gsap.set(menuRef.current, { autoAlpha: 0, x: "-100%" });
    gsap.set(
      menuItemRefs.map((ref) => ref.current),
      { autoAlpha: 0, x: "-1000px" }
    );

    if (isOpen) {
      const tl = gsap.timeline();
      tl.to(menuRef.current, { x: "0%", duration: 0.5, autoAlpha: 1 }).fromTo(
        menuItemRefs.map((ref) => ref.current),
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
        menuItemRefs.map((ref) => ref.current),
        { x: "-1000%", autoAlpha: 0, stagger: 0.2, duration: 0.5 }
      );
    }
  }, [isClosing]);

  return (
    <div className="menu" ref={menuRef}>
      {menuItems.map((item, index) => (
        <div className="menu-item" key={index} ref={menuItemRefs[index]}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default Menu;
