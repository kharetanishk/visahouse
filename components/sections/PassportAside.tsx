"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type StampType = "circle" | "rect";

type Stamp = {
  id: number;
  type: StampType;
  country: string;
  date: string;
  visa: string;
  color: string;
  x: number;
  y: number;
};

const STAMPS: Stamp[] = [
  { id: 1, type: "circle", country: "DUBAI", date: "14 MAR 24", visa: "TOURIST", color: "#1a3a6b", x: 18, y: 48 },
  { id: 2, type: "circle", country: "USA", date: "22 JUN 24", visa: "VISITOR", color: "#8b0000", x: 120, y: 30 },
  { id: 3, type: "circle", country: "UK", date: "05 SEP 24", visa: "STUDENT", color: "#1a5c2a", x: 60, y: 140 },
  { id: 4, type: "circle", country: "CANADA", date: "18 NOV 24", visa: "WORK", color: "#6b0080", x: 155, y: 115 },
  { id: 5, type: "circle", country: "AUS", date: "03 JAN 25", visa: "TOURIST", color: "#005a8e", x: 22, y: 220 },
  { id: 6, type: "circle", country: "NZ", date: "28 FEB 25", visa: "TOURIST", color: "#0a4a0a", x: 130, y: 210 },
  { id: 7, type: "circle", country: "JAPAN", date: "10 MAR 25", visa: "TRANSIT", color: "#b30000", x: 70, y: 305 },
  { id: 8, type: "circle", country: "SGP", date: "15 APR 25", visa: "BUSINESS", color: "#c05a00", x: 160, y: 285 },
  { id: 9, type: "rect", country: "ADMITTED", date: "FRANKFURT", visa: "TRANSIT", color: "#5a4000", x: 18, y: 178 },
  { id: 10, type: "rect", country: "APPROVED", date: "SCHENGEN", visa: "VISA", color: "#8b0000", x: 110, y: 168 },
  { id: 11, type: "rect", country: "ADMITTED", date: "HEATHROW", visa: "UK VISA", color: "#1a3a6b", x: 18, y: 370 },
  { id: 12, type: "rect", country: "DEPARTING", date: "MUM INTL", visa: "CLEARED", color: "#1a5c2a", x: 118, y: 360 },
  { id: 13, type: "circle", country: "FRANCE", date: "02 MAY 25", visa: "TOURIST", color: "#00318c", x: 20, y: 430 },
  { id: 14, type: "circle", country: "ITALY", date: "08 MAY 25", visa: "TOURIST", color: "#009246", x: 140, y: 420 },
  { id: 15, type: "circle", country: "THAI", date: "20 MAY 25", visa: "TOURIST", color: "#a51931", x: 70, y: 510 },
  { id: 16, type: "circle", country: "BRAZIL", date: "14 JUN 25", visa: "TOURIST", color: "#009c3b", x: 160, y: 500 },
];

const DELAY_PER_STAMP = 0.22;
const STAMPS_PER_PAGE = 4;
const totalPages = Math.ceil(STAMPS.length / STAMPS_PER_PAGE);

function CircleStamp({
  stampId,
  country,
  date,
  visa,
  color,
}: {
  stampId: number;
  country: string;
  date: string;
  visa: string;
  color: string;
}) {
  const topId = `arc-top-${stampId}`;
  const botId = `arc-bot-${stampId}`;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="36" cy="36" r="33" stroke={color} strokeWidth="2.5" />
      <circle cx="36" cy="36" r="28" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
      <path id={topId} d="M 10 36 A 26 26 0 0 1 62 36" fill="none" />
      <text fontSize="7.5" fontFamily="serif" fontWeight="700" fill={color} letterSpacing="2">
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          {country}
        </textPath>
      </text>
      <text x="36" y="40" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="700" fill={color}>
        {date}
      </text>
      <path id={botId} d="M 10 36 A 26 26 0 0 0 62 36" fill="none" />
      <text fontSize="6.5" fontFamily="serif" fill={color} letterSpacing="1.5">
        <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">
          {visa}
        </textPath>
      </text>
      <text x="36" y="31" textAnchor="middle" fontSize="8" fill={color} opacity="0.7">
        ✦
      </text>
    </svg>
  );
}

function RectStamp({ country, date, visa, color }: { country: string; date: string; visa: string; color: string }) {
  return (
    <svg width="90" height="40" viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="1" y="1" width="88" height="38" stroke={color} strokeWidth="2" />
      <rect x="4" y="4" width="82" height="32" stroke={color} strokeWidth="0.6" strokeOpacity="0.4" />
      <text x="45" y="16" textAnchor="middle" fontSize="9" fontFamily="serif" fontWeight="700" fill={color} letterSpacing="2">
        {country}
      </text>
      <line x1="8" y1="21" x2="82" y2="21" stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
      <text x="45" y="31" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={color} letterSpacing="1">
        {date} · {visa}
      </text>
    </svg>
  );
}

const LOOP_PAUSE_MS = 2000;
const LAST_PAGE_SETTLE_MS = 500;

export function PassportAside() {
  const [visibleStamps, setVisibleStamps] = useState<number[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [coverVisible, setCoverVisible] = useState(true);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startAnimationRef = useRef<() => void>(() => {});

  const clearTimers = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  }, []);

  const stampPage = useCallback((pg: number) => {
    const start = (pg - 1) * STAMPS_PER_PAGE;
    const end = Math.min(start + STAMPS_PER_PAGE, STAMPS.length);

    for (let i = start; i < end; i++) {
      const delay = (i - start) * DELAY_PER_STAMP * 1000;
      const stampId = STAMPS[i].id;
      const t = setTimeout(() => {
        setVisibleStamps((prev) => [...prev, stampId]);
      }, delay);
      timerRefs.current.push(t);
    }

    const pageDuration = (end - start) * DELAY_PER_STAMP * 1000 + 500;
    if (pg < totalPages) {
      const tFlip = setTimeout(() => {
        setPageIndex(pg + 1);
        stampPage(pg + 1);
      }, pageDuration);
      timerRefs.current.push(tFlip);
    } else {
      const stampCount = end - start;
      const lastStampDelay = stampCount > 0 ? (stampCount - 1) * DELAY_PER_STAMP * 1000 : 0;
      const tLoop = setTimeout(() => {
        startAnimationRef.current();
      }, lastStampDelay + LAST_PAGE_SETTLE_MS + LOOP_PAUSE_MS);
      timerRefs.current.push(tLoop);
    }
  }, []);

  const startAnimation = useCallback(() => {
    clearTimers();
    setVisibleStamps([]);
    setPageIndex(0);
    setCoverVisible(true);

    const t0 = setTimeout(() => {
      setCoverVisible(false);
      setPageIndex(1);
      stampPage(1);
    }, 700);
    timerRefs.current.push(t0);
  }, [clearTimers, stampPage]);

  useEffect(() => {
    startAnimationRef.current = startAnimation;
  }, [startAnimation]);

  useEffect(() => {
    startAnimation();
    return () => clearTimers();
  }, [startAnimation, clearTimers]);

  const currentPageStamps =
    pageIndex > 0 ? STAMPS.slice((pageIndex - 1) * STAMPS_PER_PAGE, pageIndex * STAMPS_PER_PAGE) : [];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
      className="lg:col-span-5"
      aria-label="VisaHouse passport animation"
    >
      <div
        className="relative overflow-hidden rounded-2xl p-0"
        style={{
          background: "linear-gradient(145deg, var(--color-surface, #f2ead8) 0%, #ede4cf 100%)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        <div
          className="flex items-center justify-between px-4 pb-2 pt-3 sm:px-5 sm:pb-3 sm:pt-4"
          style={{ borderBottom: "1px solid rgba(139,115,69,0.15)" }}
        >
          <span
            style={{
              fontFamily: "serif",
              fontSize: 18,
              color: "#1e3557",
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            VisaHouse
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: "serif",
              letterSpacing: 2,
              color: "#5a4a2a",
              background: "rgba(255,252,245,0.85)",
              border: "1px solid rgba(139,115,69,0.3)",
              borderRadius: 20,
              padding: "3px 12px",
            }}
          >
            Mumbai, India
          </span>
        </div>

        <div className="flex items-center justify-center" style={{ padding: "8px 8px 8px" }}>
          <div
            style={{
              width: 280,
              height: 360,
              position: "relative",
              perspective: 900,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#f0e8d8",
                borderRadius: "4px 14px 14px 4px",
                boxShadow: "-2px 2px 0 #e0d5c0, -4px 4px 0 #d4c8b0",
                zIndex: 0,
              }}
            />

            <AnimatePresence>
              {coverVisible ? (
                <motion.div
                  key="cover"
                  initial={{ rotateY: 0 }}
                  exit={{ rotateY: -100, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(145deg, #1a3a6b 0%, #0d2347 100%)",
                    borderRadius: "4px 14px 14px 4px",
                    zIndex: 10,
                    transformOrigin: "left center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    boxShadow: "6px 6px 28px rgba(0,0,0,0.4), inset 0 0 0 2px rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      border: "2px solid rgba(212,175,55,0.8)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(212,175,55,0.9)",
                      fontSize: 26,
                    }}
                  >
                    ✦
                  </div>
                  <div
                    style={{
                      color: "rgba(212,175,55,0.88)",
                      fontSize: 11,
                      letterSpacing: 3,
                      fontFamily: "serif",
                      textTransform: "uppercase",
                    }}
                  >
                    Passport
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 9,
                      letterSpacing: 2,
                      fontFamily: "serif",
                      textTransform: "uppercase",
                    }}
                  >
                    Republic of India
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`page-${pageIndex}`}
                initial={{ rotateY: -80, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -80, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#f9f5ed",
                  borderRadius: "4px 14px 14px 4px",
                  transformOrigin: "left center",
                  overflow: "hidden",
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(139,115,69,0.12) 22px, rgba(139,115,69,0.12) 23px)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.04,
                    fontSize: 72,
                    fontFamily: "serif",
                    color: "#1a3a6b",
                    pointerEvents: "none",
                    userSelect: "none",
                    transform: "rotate(-30deg)",
                  }}
                >
                  ✦
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 18,
                    right: 18,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 7.5,
                    color: "#8b7355",
                    letterSpacing: 1.5,
                    fontFamily: "serif",
                    textTransform: "uppercase",
                  }}
                >
                  <span>VISA / VISAS</span>
                  <span>PAGE {(pageIndex - 1) * 2 + 3}</span>
                </div>

                {currentPageStamps.map((s) => {
                  const rotateDeg = s.id % 2 === 0 ? 12 : -8;
                  return (
                    <AnimatePresence key={s.id}>
                      {visibleStamps.includes(s.id) ? (
                        <motion.div
                          initial={{ scale: 3, opacity: 0, rotate: rotateDeg }}
                          animate={{ scale: 1, opacity: 0.88, rotate: rotateDeg }}
                          transition={{ type: "spring", stiffness: 520, damping: 18, mass: 0.6 }}
                          style={{
                            position: "absolute",
                            left: s.x,
                            top: s.y,
                            mixBlendMode: "multiply",
                            transformOrigin: "center center",
                          }}
                        >
                          {s.type === "circle" ? (
                            <CircleStamp
                              stampId={s.id}
                              country={s.country}
                              date={s.date}
                              visa={s.visa}
                              color={s.color}
                            />
                          ) : (
                            <RectStamp country={s.country} date={s.date} visa={s.visa} color={s.color} />
                          )}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
