"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/section5.scss";

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
  const audiences = [
    {
      group: "Gen Z & Young Millennials",
      desc: "16–35 year olds who live and breathe trends",
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
    },
    {
      group: "Fashion-Conscious Shoppers",
      desc: "Men & women who accessorise intentionally",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
    },
    {
      group: "Wedding & Ethnic Buyers",
      desc: "Shoppers looking for curated festive & bridal pieces",
      img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
    },
    {
      group: "Gift Buyers",
      desc: "Finding the perfect personalised accessory gift",
      img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80",
    },
    {
      group: "Tech Enthusiasts",
      desc: "Smartwatch straps, covers, cables & wearables",
      img: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80",
    },
  ];

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });

      gsap.from(cardsRef.current, {
        y: 70,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".criteria-grid", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section5" ref={sectionRef}>
      <div className="elai-shell">
        <div className="section5-content">
          <div className="section5-header" ref={headerRef}>
            <p className="section5-subtitle">WHO IS ELAI FOR?</p>
            <h2 className="section5-title">
              Built for every kind<br />of accessory lover.
            </h2>
            <p className="section5-description">
              Whether you&apos;re chasing the latest drop or hunting for the perfect ethnic
              piece, Elai has something for you.
            </p>
          </div>

          <div className="criteria-grid">
            {audiences.map((item, index) => (
              <div
                key={index}
                className="criteria-card"
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <div className="criteria-card__img">
                  <img src={item.img} alt={item.group} />
                </div>
                <div className="criteria-card__body">
                  <p className="criteria-title">{item.group}</p>
                  <p className="criteria-desc">{item.desc}</p>
                </div>
              </div>
            ))}

            <div
              className="criteria-card cta-card"
              ref={(el) => (cardsRef.current[audiences.length] = el)}
            >
              <div className="cta-content">
                <p className="cta-text">Sound like you?</p>
                <div className="cta-action">
                  <a href="#contact" className="cta-link">
                    Get early access →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;
 