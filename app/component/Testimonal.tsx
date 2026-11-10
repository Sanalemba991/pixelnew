"use client";

import { useState, useEffect } from "react";
const REVIEWS = [
    {
        name: "Karan Mehta",
        role: "Filmmaker",
        avatar: "/reviews/karan.jpg",
        product: "/reviews/product-1.jpg",
        text: "Genuine products, great pricing and very helpful support. Highly recommend Pixel Store!",
    },
    {
        name: "Aditya Rao",
        role: "Photographer & Travel Creator",
        avatar: "/reviews/aditya.jpg",
        product: "/reviews/sony-camera.jpg",
        text: "Excellent experience! Bought my Sony camera from Pixel Store. Original product, well-packed and delivered super fast.",
    },
    {
        name: "Sneha Kulkarni",
        role: "Content Creator",
        avatar: "/reviews/sneha.jpg",
        product: "/reviews/product-3.jpg",
        text: "The best store for creators! Wide range of products, authentic and a smooth buying experience.",
    },
];

const CSS = `
.cr-section{
  position:relative; overflow:hidden; padding:56px 16px 40px;
  background:
    radial-gradient(60% 50% at 50% 0%, #fff 0%, rgba(255,255,255,0) 70%),
    linear-gradient(180deg,#faf8f6 0%,#f3efec 100%);
  font-family:var(--font-heading,"Poppins","Segoe UI",system-ui,sans-serif);
  color:#111;
}
.cr-head{ text-align:center; max-width:760px; margin:0 auto 34px; }
.cr-eyebrow{
  display:flex; align-items:center; justify-content:center; gap:14px;
  font-size:12px; font-weight:700; letter-spacing:.22em; color:#1b1b1b; margin-bottom:14px;
}
.cr-eyebrow::before,.cr-eyebrow::after{ content:""; width:46px; height:3px; border-radius:2px; background:#ff6a00; }
.cr-eyebrow::after{ display:none; }
.cr-title{
  margin:0; font-size:clamp(30px,5vw,52px); font-weight:800; font-style:italic;
  letter-spacing:-.02em; line-height:1.1;
}
.cr-title em{ color:#ff6a00; font-style:italic; }
.cr-sub{ margin:14px auto 0; max-width:520px; color:#555; font-size:15px; line-height:1.5; }

/* ---------- stage ---------- */
.cr-stage{
  position:relative; max-width:1040px; height:340px; margin:0 auto;
  perspective:1400px;
}
.cr-ghost{
  position:absolute; top:50%; height:230px; width:12%;
  border-radius:26px; background:rgba(255,255,255,.55);
  box-shadow:0 10px 30px rgba(0,0,0,.06); transform:translateY(-50%);
}
.cr-ghost.l1{ left:3%; opacity:.7 }  .cr-ghost.l2{ left:0%; opacity:.4; height:200px }
.cr-ghost.r1{ right:3%; opacity:.7 } .cr-ghost.r2{ right:0%; opacity:.4; height:200px }

.cr-card{
  position:absolute; top:50%; overflow:hidden; border-radius:28px;
  background:linear-gradient(135deg,#ffffff 0%,#fbf7f4 100%);
  border:1px solid rgba(255,255,255,.9);
  box-shadow:0 24px 50px -18px rgba(60,30,0,.28), inset 0 1px 0 #fff;
  transition:all .65s cubic-bezier(.22,.8,.3,1);
  display:flex; flex-direction:column; justify-content:space-between;
  padding:22px 22px 20px; box-sizing:border-box;
}
.cr-card[data-pos="0"]{
  left:50%; width:60%; height:250px; z-index:3; padding:26px 30px 24px;
  transform:translate(-50%,-50%);
}
.cr-card[data-pos="-1"]{
  left:15%; width:25%; height:270px; z-index:2; opacity:.95;
  transform:translate(-50%,-50%) rotateY(16deg) scale(.97);
}
.cr-card[data-pos="1"]{
  left:85%; width:25%; height:270px; z-index:2; opacity:.95;
  transform:translate(-50%,-50%) rotateY(-16deg) scale(.97);
}
.cr-card[data-pos="hidden"]{
  left:50%; width:25%; height:250px; z-index:0; opacity:0; pointer-events:none;
  transform:translate(-50%,-50%) scale(.8);
}

.cr-body{ position:relative; z-index:2; transition:padding .65s cubic-bezier(.22,.8,.3,1); }
.cr-card[data-pos="0"] .cr-body{ padding-right:44%; }
.cr-quote{ color:#ff6a00; font-size:44px; line-height:.7; font-weight:800; font-family:Georgia,serif; display:block; margin-bottom:10px; }
.cr-text{ margin:0; font-size:15px; line-height:1.35; font-weight:600; color:#1a1a1a; transition:font-size .5s ease; }
.cr-card[data-pos="0"] .cr-text{ font-size:clamp(15px,1.9vw,20px); font-style:italic; font-weight:700; }

.cr-person{ position:relative; z-index:2; display:flex; align-items:center; gap:12px; margin-top:14px; }
.cr-avatar{
  width:46px; height:46px; border-radius:50%; flex:none; object-fit:cover;
  background:linear-gradient(135deg,#ffb27a,#ff6a00); border:2px solid #fff;
  box-shadow:0 2px 8px rgba(0,0,0,.15); transition:all .5s ease;
}
.cr-card[data-pos="0"] .cr-avatar{ width:56px; height:56px; }
.cr-name{ font-size:13px; font-weight:700; line-height:1.2; }
.cr-card[data-pos="0"] .cr-name{ font-size:16px; }
.cr-role{ font-size:11px; color:#666; margin-top:2px; }
.cr-card[data-pos="0"] .cr-role{ font-size:12.5px; }
.cr-stars{ color:#ff6a00; font-size:13px; letter-spacing:2px; margin-top:4px; }
.cr-card[data-pos="0"] .cr-stars{ font-size:16px; }
.cr-side-stars{ display:none; }

/* product image (only visible on the active card) */
.cr-media{
  position:absolute; top:0; right:0; bottom:0; width:0; z-index:1;
  clip-path:polygon(22% 0,100% 0,100% 100%,0 100%);
  transition:width .65s cubic-bezier(.22,.8,.3,1);
  background:linear-gradient(135deg,#f0b27a,#7a4a2a);
}
.cr-card[data-pos="0"] .cr-media{ width:50%; }
.cr-media img{ width:100%; height:100%; object-fit:cover; display:block; }
.cr-media::after{
  content:""; position:absolute; inset:0;
  background:linear-gradient(90deg,rgba(255,255,255,.35),rgba(255,255,255,0) 35%);
}

/* ---------- podium ---------- */
.cr-podium{
  position:relative; width:min(520px,70%); height:78px; margin:-28px auto 0; z-index:1;
}

.cr-podium .base{
  position:absolute; left:6%; right:6%; bottom:0; height:34px; border-radius:50%;
  background:linear-gradient(180deg,#f4efeb,#e3dcd6); z-index:-1;
  box-shadow:0 14px 24px rgba(0,0,0,.1);
}

/* ---------- controls ---------- */
.cr-controls{ position:relative; z-index:4; display:flex; align-items:center; justify-content:center; gap:14px; margin-top:-40px; }
.cr-btn{
  width:38px; height:38px; border-radius:50%; border:0; cursor:pointer;
  background:#fff; color:#111; font-size:18px; line-height:1; display:grid; place-items:center;
  box-shadow:0 4px 14px rgba(0,0,0,.18); transition:transform .2s ease, box-shadow .2s ease;
}
.cr-btn:hover{ transform:scale(1.08); box-shadow:0 6px 18px rgba(255,106,0,.35); }
.cr-btn:focus-visible,.cr-dot:focus-visible{ outline:3px solid #ff6a00; outline-offset:3px; }
.cr-dots{ display:flex; gap:9px; }
.cr-dot{ width:8px; height:8px; border-radius:50%; border:0; padding:0; cursor:pointer; background:#c9c3be; transition:all .3s ease; }
.cr-dot[aria-current="true"]{ background:#ff6a00; width:22px; border-radius:6px; }

/* ---------- responsive ---------- */
@media (max-width:760px){
  .cr-stage{ height:430px; }
  .cr-ghost{ display:none; }
  .cr-card[data-pos="0"]{ width:90%; height:380px; }
  .cr-card[data-pos="0"] .cr-body{ padding-right:0; }
  .cr-card[data-pos="0"] .cr-media{ top:auto; width:100%; height:42%; clip-path:polygon(0 18%,100% 0,100% 100%,0 100%); }
  .cr-card[data-pos="0"] .cr-person{ margin-top:auto; margin-bottom:calc(42% - 8px); }
  .cr-card[data-pos="-1"],.cr-card[data-pos="1"]{ opacity:0; pointer-events:none; }
}
@media (prefers-reduced-motion:reduce){
  .cr-card,.cr-body,.cr-media,.cr-avatar{ transition:none; }
}
`;

export default function Testimonal() {
    const [index, setIndex] = useState(1); // start on the middle review like the design
    const n = REVIEWS.length;

    const next = () => setIndex((i) => (i + 1) % n);
    const prev = () => setIndex((i) => (i - 1 + n) % n);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % n);
        }, 3000);

        return () => clearInterval(timer);
    }, [n]);

    // position of each card relative to the active one
    const posOf = (i: number) => {
        const d = (((i - index) % n) + n) % n;
        if (d === 0) return "0";
        if (d === 1) return "1";
        if (d === n - 1) return "-1";
        return "hidden";
    };

    return (
        <section className="cr-section" aria-roledescription="carousel" aria-label="Customer reviews">
            <style>{CSS}</style>

            <div className="cr-head">
                <div className="cr-eyebrow">CREATOR REVIEWS</div>
                <h2 className="cr-title">
                    What Our <em>Customers Say</em>
                </h2>
                <p className="cr-sub">
                    Real experiences from photographers, filmmakers and tech creators who trust Pixel Store.
                </p>
            </div>

            <div className="cr-stage">
                <span className="cr-ghost l2" />
                <span className="cr-ghost l1" />
                <span className="cr-ghost r1" />
                <span className="cr-ghost r2" />

                {REVIEWS.map((r, i) => {
                    const pos = posOf(i);
                    return (
                        <article
                            key={r.name}
                            className="cr-card"
                            data-pos={pos}
                            aria-hidden={pos !== "0"}
                            onClick={() => pos === "1" ? next() : pos === "-1" ? prev() : null}
                            style={{ cursor: pos === "0" ? "default" : "pointer" }}
                        >
                            <div className="cr-body">
                                <span className="cr-quote" aria-hidden="true">“</span>
                                <p className="cr-text">“{r.text}”</p>
                            </div>

                            <div className="cr-person">
                                <img
                                    className="cr-avatar"
                                    src={r.avatar}
                                    alt={r.name}
                                    onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                                />
                                <div>
                                    <div className="cr-name">{r.name}</div>
                                    <div className="cr-role">{r.role}</div>
                                    <div className="cr-stars" aria-label="5 out of 5 stars">★★★★★</div>
                                </div>
                            </div>

                            <div className="cr-media">
                                <img
                                    src={r.product}
                                    alt=""
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="cr-podium" aria-hidden="true">
                <span className="base" />
                <span className="top" />
            </div>

            <div className="cr-controls">
                <button className="cr-btn" onClick={prev} aria-label="Previous review">‹</button>
                <div className="cr-dots">
                    {REVIEWS.map((r, i) => (
                        <button
                            key={r.name}
                            className="cr-dot"
                            aria-label={`Show review ${i + 1}`}
                            aria-current={i === index}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
                <button className="cr-btn" onClick={next} aria-label="Next review">›</button>
            </div>
        </section>
    );
}