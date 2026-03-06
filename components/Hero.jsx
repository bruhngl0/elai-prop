"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import "../styles/hero.scss";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlideRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const touchStartRef = useRef(null);

  const heroImagesRef = useRef([]);
  const heroTextRef = useRef(null);
  const carouselInterval = useRef(null);

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1600&q=80",
      alt: "Fashion accessories flat lay",
    },
    {
      url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80",
      alt: "Jewellery and accessories",
    },
    {
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&q=80",
      alt: "Watches and luxury accessories",
    },
  ];

  const startInterval = useCallback(() => {
    clearInterval(carouselInterval.current);
    carouselInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
  }, [carouselImages.length]);

  // Initial entry animation
  useEffect(() => {
    gsap.set(heroImagesRef.current[0], { opacity: 1, scale: 1 });
    const tl = gsap.timeline();
    tl.from(heroImagesRef.current[0], {
      scale: 1.15,
      opacity: 0,
      duration: 1.6,
      ease: "power3.out",
    }).from(
      heroTextRef.current,
      { y: 80, opacity: 0, duration: 1.1, ease: "power3.out" },
      "-=0.9",
    );
  }, []);

  // Start autoplay
  useEffect(() => {
    startInterval();
    return () => clearInterval(carouselInterval.current);
  }, [startInterval]);

  const goToSlide = useCallback(
    (index) => {
      if (isAnimatingRef.current) return;
      setCurrentSlide(index);
      startInterval();
    },
    [startInterval],
  );

  // Slide transition — runs for every slide change including wrap-around
  useEffect(() => {
    const prevSlide = prevSlideRef.current;
    if (prevSlide === currentSlide || isAnimatingRef.current) return;

    const currentImage = heroImagesRef.current[currentSlide];
    const prevImage = heroImagesRef.current[prevSlide];
    if (!currentImage || !prevImage) return;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        prevSlideRef.current = currentSlide;
        isAnimatingRef.current = false;
      },
    });

    tl.to(prevImage, {
      opacity: 0,
      scale: 1.05,
      duration: 0.9,
      ease: "power2.inOut",
    }).fromTo(
      currentImage,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" },
      "-=0.5",
    );
  }, [currentSlide]);

  // Pause on scroll, resume after
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      clearInterval(carouselInterval.current);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(startInterval, 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [startInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        goToSlide(
          (currentSlide - 1 + carouselImages.length) % carouselImages.length,
        );
      }
      if (e.key === "ArrowRight") {
        goToSlide((currentSlide + 1) % carouselImages.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSlide, carouselImages.length, goToSlide]);

  // Touch / swipe support
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const delta = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        goToSlide((currentSlide + 1) % carouselImages.length);
      } else {
        goToSlide(
          (currentSlide - 1 + carouselImages.length) % carouselImages.length,
        );
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div className="elai-container">
      <section
        className="hero"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="hero-carousel">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`hero-image ${index === currentSlide ? "active" : ""}`}
              ref={(el) => (heroImagesRef.current[index] = el)}
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <img src={image.url} alt={image.alt} />
            </div>
          ))}
        </div>

        <div className="hero-content">
          <div className="elai-shell">
            <div ref={heroTextRef}>
              <span className="hero-eyebrow">
                India&apos;s First Accessories Marketplace
              </span>
              <h1 className="hero-text">
                Every accessory.<br />One platform.
              </h1>
              <p className="hero-text-des">
                Elai is India&apos;s only dedicated accessories marketplace, bringing
                every accessory category — across fashion, lifestyle, tech, beauty,
                ethnic, luxury, and daily essentials — onto one unified platform.
              </p>
              <div className="hero-ctas">
                <a
                  href="#contact"
                  className="hero-cta hero-cta--primary"
                >
                  Get Early Access
                </a>
                <a
                  href="#categories"
                  className="hero-cta hero-cta--secondary"
                >
                  Explore Categories
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <button
          className="carousel-arrow carousel-arrow--prev"
          onClick={() =>
            goToSlide((currentSlide - 1 + carouselImages.length) % carouselImages.length)
          }
          aria-label="Previous slide"
        >
          &#8249;
        </button>
        <button
          className="carousel-arrow carousel-arrow--next"
          onClick={() => goToSlide((currentSlide + 1) % carouselImages.length)}
          aria-label="Next slide"
        >
          &#8250;
        </button>

        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button className="scroll-indicator" onClick={() => {
          document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
        }}>
          <span>↓</span>
          <span>Scroll to explore</span>
        </button>
      </section>

      {/* Stats bar */}
      <div className="hero-stats">
        <div className="elai-shell hero-stats__inner">
          <div className="hero-stat">
            <span className="hero-stat__number">40+</span>
            <span className="hero-stat__label">Categories</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat__number">₹45,000 Cr</span>
            <span className="hero-stat__label">Market Opportunity</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat__number">12–15%</span>
            <span className="hero-stat__label">Annual Growth</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat__number">#1</span>
            <span className="hero-stat__label">First Mover in India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
