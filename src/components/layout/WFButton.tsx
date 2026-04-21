import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { interpolate } from 'flubber';
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

import faviconImg from '@/assets/favicon.png';

// Pill: 160 × 44 px, radio de esquinas = 22 (altura / 2 = píldora perfecta)
const PILL =
  'M 22 0 L 138 0 A 22 22 0 0 1 160 22 A 22 22 0 0 1 138 44 L 22 44 A 22 22 0 0 1 0 22 A 22 22 0 0 1 22 0 Z';

// Círculo centrado en (80, 22) con radio 22
const CIRCLE =
  'M 102 22 A 22 22 0 0 1 80 44 A 22 22 0 0 1 58 22 A 22 22 0 0 1 80 0 A 22 22 0 0 1 102 22 Z';

// Variantes separadas para tener delay solo en la entrada, no en la salida
const iconVariants = {
  hidden: { opacity: 0, scale: 0.1, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 240, damping: 20, delay: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 0.1,
    rotate: 180,
    transition: { duration: 0.12, ease: 'easeIn' as const },
  },
};

const textVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.16 } },
  exit: { opacity: 0, scale: 0.6, transition: { duration: 0.1 } },
};

interface Props {
  label: string;
}

export function WFButton({ label }: Props) {
  const uid = useId();
  const gradId = `wfBtnGrad-${uid}`;
  const shineId = `wfBtnShine-${uid}`;
  const [hovered, setHovered] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const hoveredRef = useRef(false);
  const active = hovered || autoPlaying;
  const progress = useMotionValue(0);

  useEffect(() => {
    const anim = animate(progress, active ? 1 : 0, {
      duration: 0.45,
      ease: 'easeInOut',
    });
    return () => anim.stop();
  }, [active, progress]);

  // Dispara sola: primera vez a los 3s, luego cada 5s
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const play = () => {
      if (hoveredRef.current) return; // no interrumpe al usuario
      setAutoPlaying(true);
      setTimeout(() => setAutoPlaying(false), 3600);
    };

    const initialTimer = setTimeout(() => {
      play();
      intervalId = setInterval(play, 11000);
    }, 3000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, []);

  const pathMixer = useMemo(() => interpolate(PILL, CIRCLE, { maxSegmentLength: 4 }), []);
  const morphedPath = useTransform(progress, (p) => pathMixer(p));

  return (
    // Contenedor fijo: el espacio en el layout nunca cambia
    <motion.div
      style={{ width: 160, height: 44 }}
      className="relative flex-shrink-0"
      animate={active ? { scale: 1 } : { scale: [1, 1.025, 1] }}
      transition={active
        ? { duration: 0.2 }
        : { duration: 2.7, repeat: Infinity, ease: 'easeInOut' }
      }
      onMouseEnter={() => { setHovered(true); hoveredRef.current = true; }}
      onMouseLeave={() => { setHovered(false); hoveredRef.current = false; }}
    >
      {/* SVG con el path que morphea — sin pointer-events para no bloquear el <a> */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          filter: active
            ? 'drop-shadow(0px 4px 14px rgba(248,98,19,0.5))'
            : 'drop-shadow(0px 3px 8px rgba(0,0,0,0.2))',
        }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <svg width="160" height="44" viewBox="0 0 160 44" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Degradado principal: naranja vivo arriba → naranja quemado abajo */}
            <linearGradient id={gradId} x1="0.1" y1="0" x2="0.9" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#FF8C42" />
              <stop offset="100%" stopColor="#C94B0A" />
            </linearGradient>
            {/* Brillo superior: franja blanca semitransparente */}
            <linearGradient id={shineId} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="white" stopOpacity="0.12" />
              <stop offset="55%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Capa base con degradado */}
          <motion.path fill={`url(#${gradId})`} d={morphedPath} />
          {/* Capa de brillo (mismo path, encima) */}
          <motion.path fill={`url(#${shineId})`} d={morphedPath} />
        </svg>
      </motion.div>

      {/* Link — cubre todo el contenedor */}
      <motion.a
        href="https://webfactoring2.banpro.cl/index.html"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.94 }}
        className="absolute inset-0 flex items-center justify-center focus:outline-none"
      >
        <AnimatePresence initial={false}>
          {!active ? (
            <motion.span
              key="text"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[13px] font-semibold uppercase tracking-wider text-white"
            >
              {label}
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src={faviconImg}
                  alt="WebFactoring"
                  width={27}
                  height={27}
                  className="rounded-full object-contain"
                />
              </motion.div>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    </motion.div>
  );
}
