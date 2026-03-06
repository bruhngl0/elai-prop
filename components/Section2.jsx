"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/section2.scss";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Fashion Jewellery",
    items: "Earrings, rings, chains, pendants, chokers, anklets",
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80",
  },
  {
    title: "Men's Accessories",
    items: "Watches, wallets, belts, ties, sunglasses, caps",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
  {
    title: "Bags & Travel",
    items: "Handbags, totes, sling bags, backpacks, pouches",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  },
  {
    title: "Ethnic Accessories",
    items: "Jhumkas, maang tikkas, kamarbandhs, turbans",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    title: "Tech Accessories",
    items: "Phone covers, smartwatch straps, earbuds cases",
    img: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&q=80",
  },
  {
    title: "Beauty Add-Ons",
    items: "Headbands, rollers, cosmetic pouches, organizers",
    img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80",
  },
  {
    title: "Luxury Pieces",
    items: "Silver, gold-plated, handcrafted, designer bags",
    img: "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=600&q=80",
  },
  {
    title: "Seasonal & Gifting",
    items: "Festival collections, couple rings, personalized accessories",
    img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&q=80",
  },
];

const Section2 = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 85%",
        },
      });

      // Cards stagger
      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".categories-grid",
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="categories" id="categories" ref={sectionRef}>
      <div className="cat-blob cat-blob--1" />
      <div className="cat-blob cat-blob--2" />

      <div className="elai-shell">
        <div className="categories-top" ref={headRef}>
          <span className="categories-eyebrow">40+ categories and growing</span>
          <div className="categories-header">
            <div className="categories-left">
              <h2 className="categories-heading">
                Every accessory <em>you&apos;ve ever wanted.</em>
              </h2>
            </div>
            <div className="categories-right">
              <p className="categories-desc">
                From everyday fashion to luxury statement pieces, Elai brings
                India&apos;s widest accessories selection onto one elegant,
                easy-to-browse platform.
              </p>
              <a href="#contact" className="categories-cta">
                Get early access →
              </a>
            </div>
          </div>
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="category-card"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="category-card__img">
                <img src={cat.img} alt={cat.title} />
              </div>
              <span className="category-card__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="category-card__body">
                <span className="category-card__name">{cat.title}</span>
                <span className="category-card__tags">{cat.items}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
