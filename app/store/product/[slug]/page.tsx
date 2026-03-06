"use client";

import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  Target,
  Factory,
  Settings,
  ArrowRight,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";
import catalogData from "../../../../public/catalog.json";

type CatalogProduct = (typeof catalogData.catalog)[number] & {
  media?: string[];
};

const CAPABILITY_ICONS = [
  <Target key="target" size={30} className="text-[#9acd32]" />,
  <Settings key="settings" size={30} className="text-[#9acd32]" />,
  <Factory key="factory" size={30} className="text-[#9acd32]" />,
  <ShieldCheck key="shield" size={30} className="text-[#9acd32]" />,
];

const DEFAULT_HERO_IMAGE = "/heatsealed.jpg";

const ProductInternal = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const product = catalogData.catalog.find((p) => p.id === slug) as
    | CatalogProduct
    | undefined;

  // Hero gallery: use product.media from catalog if available
  const heroImages: string[] =
    product?.media?.length && product.media.length > 0
      ? product.media
      : [DEFAULT_HERO_IMAGE];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Swipe / drag handling
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    setDragOffset(e.touches[0].clientX - touchStartX.current);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) >= 40) {
      if (delta < 0) {
        setSelectedIndex((i) => Math.min(i + 1, heroImages.length - 1));
      } else {
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
    }
    setDragOffset(0);
    touchStartX.current = null;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-blue-900 uppercase mb-4">
            Product not found
          </h1>
          <p className="text-slate-500">
            No product matching <span className="font-bold">{slug}</span>.
          </p>
        </div>
      </div>
    );
  }

  const {
    hero,
    construction_variants,
    materials_expertise,
    design_and_customisation,
    manufacturing_capabilities,
    quality_focus,
    applications_served,
    cta,
  } = product;

  // Card images: use card.media from catalog if it looks like a path
  const cardImages = (construction_variants.cards ?? []).map((card) =>
    typeof card.media === "string" && card.media.startsWith("/")
      ? card.media
      : null,
  );

  return (
    <div
      className="min-h-screen w-full font-sans selection:bg-[#9acd32] selection:text-white"
      style={{
        background:
          "linear-gradient(to bottom, #4169E1 0%, #4169E1 60%, #FFFFFF 100%)",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Blueprint Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 w-full">
        {/* --- HERO SECTION --- */}
        <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 items-center gap-12">
            {/* Image column — comes first on mobile via order */}
            <div className="order-first lg:order-last lg:col-span-5 w-full flex flex-col items-center lg:items-end gap-4">
              {/* Main image — sliding strip */}
              <div
                className="w-full max-w-md aspect-[4/3] bg-white/15 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Strip: all images side-by-side, translate to selected */}
                <div
                  className="flex h-full"
                  style={{
                    width: `${heroImages.length * 100}%`,
                    transform: `translateX(calc(${-selectedIndex * 100}% / ${heroImages.length} + ${dragOffset / heroImages.length}px))`,
                    transition:
                      dragOffset === 0
                        ? "transform 0.35s cubic-bezier(0.4,0,0.2,1)"
                        : "none",
                  }}
                >
                  {heroImages.map((img, i) => (
                    <div
                      key={i}
                      className="h-full shrink-0 flex items-center justify-center bg-white/5"
                      style={{ width: `${100 / heroImages.length}%` }}
                    >
                      <img
                        src={img}
                        alt={`${hero.title} ${i + 1}`}
                        className="w-full h-full object-contain pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Thumbnail strip — only shown when more than 1 image */}
              {heroImages.length > 1 && (
                <div className="w-full max-w-md flex gap-2 overflow-x-auto p-1 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                  {heroImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedIndex(i)}
                      className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        selectedIndex === i
                          ? "border-[#9acd32] scale-105 shadow-lg"
                          : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/60"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Text column */}
            <div className="order-last lg:order-first lg:col-span-7 space-y-8 text-white">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase">
                {hero.title}
              </h1>

              <div className="space-y-6 text-blue-50 text-lg leading-relaxed">
                {hero.body.map((para, i) => (
                  <p key={i} className={i === 0 ? "font-medium" : "opacity-90"}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex items-center group">
                  <span className="bg-[#9acd32] text-white font-black py-4 px-8 group-hover:opacity-90 transition-opacity uppercase text-sm tracking-widest">
                    {hero.primary_cta}
                  </span>
                  <span className="bg-[#86b32b] text-white py-4 px-4 border-l border-white/10">
                    <ChevronRight size={20} />
                  </span>
                </button>
                <button className="flex items-center group border border-white/40">
                  <span className="bg-white/10 text-white font-black py-4 px-8 group-hover:bg-white/20 transition-colors uppercase text-sm tracking-widest">
                    {hero.secondary_cta}
                  </span>
                  <span className="bg-white/20 text-white py-4 px-4 border-l border-white/40 group-hover:bg-white/30 transition-colors">
                    <ChevronRight size={20} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- CONSTRUCTION VARIANTS --- */}
        {construction_variants.cards &&
          construction_variants.cards.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-white text-sm font-black tracking-[0.6em] uppercase">
                  {construction_variants.title}
                </h2>
                <div className="h-[1px] flex-grow bg-white/30"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {construction_variants.cards.map((card, i) => (
                  <div
                    key={i}
                    className="group flex flex-col bg-white rounded-[2rem] shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500"
                  >
                    <div className="h-[320px] bg-white overflow-hidden relative flex items-center justify-center">
                      {cardImages[i] ? (
                        <img
                          src={cardImages[i]}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-4"
                          alt={card.title}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-slate-200">
                          <span className="text-blue-400 font-black uppercase tracking-widest text-xs text-center p-6">
                            {card.title}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600">
                        {card.tag}
                      </div>
                    </div>
                    <div className="p-10 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black text-blue-900 mb-4 uppercase tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed mb-8">
                        {card.description}
                      </p>
                      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[#9acd32] font-black text-xs tracking-widest uppercase">
                          {card.footer_label}
                        </span>
                        <ArrowRight size={20} className="text-blue-900" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* --- MANUFACTURING CAPABILITIES SECTION --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-40">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden">
            {/* Materials & Design */}
            {((materials_expertise.items &&
              materials_expertise.items.length > 0) ||
              (design_and_customisation.items &&
                design_and_customisation.items.length > 0)) && (
              <div className="grid lg:grid-cols-2">
                {materials_expertise.items &&
                  materials_expertise.items.length > 0 && (
                    <div className="p-8 lg:p-16 bg-slate-50 border-r border-slate-100">
                      <h3 className="text-3xl font-black text-blue-900 mb-8 border-b-4 border-[#9acd32] inline-block uppercase">
                        {materials_expertise.title}
                      </h3>
                      {materials_expertise.note && (
                        <p className="text-slate-600 mb-8 font-medium uppercase text-xs tracking-wider">
                          {materials_expertise.note}
                        </p>
                      )}
                      <ul className="space-y-4">
                        {materials_expertise.items.map((mat, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-slate-800 font-bold"
                          >
                            <div className="w-2 h-2 bg-[#9acd32] rotate-45 shrink-0"></div>
                            {mat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {design_and_customisation.items &&
                  design_and_customisation.items.length > 0 && (
                    <div className="p-8 lg:p-16 bg-white">
                      <h3 className="text-3xl font-black text-blue-900 mb-8 border-b-4 border-[#9acd32] inline-block uppercase">
                        {design_and_customisation.title}
                      </h3>
                      {design_and_customisation.note && (
                        <p className="text-slate-600 mb-8 uppercase text-xs tracking-wider">
                          {design_and_customisation.note}
                        </p>
                      )}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {design_and_customisation.items.map((text, i) => (
                          <div
                            key={i}
                            className="bg-slate-50 p-4 rounded-xl text-xs font-bold text-blue-900 leading-relaxed border border-slate-200"
                          >
                            {text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {/* Manufacturing Capabilities Block */}
            {manufacturing_capabilities.items &&
              manufacturing_capabilities.items.length > 0 && (
                <div className="p-8 lg:p-16 bg-[#4169e1] text-white">
                  <h3 className="text-2xl font-black mb-12 text-center uppercase tracking-[0.3em]">
                    {manufacturing_capabilities.title}
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {manufacturing_capabilities.items.map((text, i) => (
                      <div key={i} className="text-center group">
                        <div className="mb-4 flex justify-center">
                          {CAPABILITY_ICONS[i % CAPABILITY_ICONS.length]}
                        </div>
                        <p className="text-xs font-bold leading-relaxed opacity-80 uppercase tracking-tighter">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                  {manufacturing_capabilities.note && (
                    <div className="mt-12 text-center pt-8 border-t border-white/10">
                      <p className="text-sm font-medium text-blue-200">
                        {manufacturing_capabilities.note}
                      </p>
                    </div>
                  )}
                </div>
              )}

            {/* Quality & Applications */}
            {((quality_focus.items && quality_focus.items.length > 0) ||
              (applications_served.items &&
                applications_served.items.length > 0)) && (
              <div className="p-8 lg:p-16 grid lg:grid-cols-2 gap-16 items-start">
                {quality_focus.items && quality_focus.items.length > 0 && (
                  <div className="text-slate-900">
                    <h3 className="text-2xl font-black text-blue-900 mb-8 uppercase">
                      {quality_focus.title}
                    </h3>
                    <ul className="space-y-4">
                      {quality_focus.items.map((text, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 font-bold text-slate-700"
                        >
                          <ClipboardCheck
                            size={20}
                            className="text-[#9acd32]"
                          />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {applications_served.items &&
                  applications_served.items.length > 0 && (
                    <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100">
                      <h3 className="text-2xl font-black text-blue-900 mb-8 uppercase">
                        {applications_served.title}
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {applications_served.items.map((text, i) => (
                          <div
                            key={i}
                            className="bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200 text-xs font-black text-blue-900 uppercase"
                          >
                            • {text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {/* Final CTA Area */}
            <div className="bg-[#4169E1] p-10 flex flex-col md:flex-row justify-between items-center gap-8 text-white">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-black uppercase mb-2">
                  {cta.title}
                </h4>
                <p className="text-blue-100 font-medium">{cta.subtitle}</p>
              </div>
              <button className="bg-[#9acd32] text-white px-10 py-4 rounded-full font-black text-xs tracking-[0.2em] shadow-2xl hover:bg-white hover:text-blue-900 transition-all whitespace-nowrap">
                {cta.button}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductInternal;
