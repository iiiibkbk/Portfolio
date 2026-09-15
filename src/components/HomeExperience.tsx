"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HOME_CONFIG, projects } from "../data/portfolio";
import AboutModal from "./AboutModal";
import ContactModal from "./ContactModal";

const NAV = {
  portfolio: { x: 72, y: 22 },
  project: { x: 1211, y: 21 },
  about: { x: 1275, y: 21 },
  contact: { x: 1340, y: 21 },
  fontSize: 14,
  idle: "#888888",
  active: "#363636",
  underline: "#e5f756"
} as const;

export default function HomeExperience() {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const navActive: "project" | "about" | "contact" | null = contactOpen ? "contact" : aboutOpen ? "about" : null;

  useEffect(() => {
    // 预热「项目」入口路由，减少点击导航后首次编译/加载造成的卡顿（dev 环境尤其明显）
    const run = () => {
      router.prefetch("/case/bingo-series");

      // 预加载 About/Contact 的弹窗大图，避免首次打开时“先出遮罩后出内容”的感觉
      const preload = (src: string) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = src;
      };
      [
        "/assets/about/about-badge-card2.png",
        "/assets/about/about-info-panel.png?v=4",
        "/assets/about/about-bubble-hi.png",
        "/assets/about/about-close-x.png",
        "/assets/contact/contact.png"
      ].forEach(preload);
    };

    // 尽量不阻塞首屏交互
    const w = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(run);
      return () => w.cancelIdleCallback?.(id);
    }

    const timeout = setTimeout(run, 200);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="portfolio-display relative min-h-screen overflow-x-auto bg-[var(--portfolio-yellow)] text-[var(--portfolio-black)]">
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <div className="relative mx-auto min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: HOME_CONFIG.backgroundColor }}>
        <header className="fixed left-0 top-0 z-[220] h-[59px] w-full">
          <div className="absolute inset-0">
            <Image src="/assets/top/top.png" alt="" fill priority className="object-fill" />
          </div>

          <div className="relative mx-auto h-full w-[1440px]">
            <Link href="/" className="absolute uppercase leading-none text-[#363636]" style={{ left: NAV.portfolio.x, top: NAV.portfolio.y, fontSize: NAV.fontSize }}>
              PORTFOLIO
            </Link>

            <nav className="leading-none">
              <Link href="/case/bingo-series" prefetch className="absolute" style={{ left: NAV.project.x, top: NAV.project.y, fontSize: NAV.fontSize, color: NAV.idle }}>
                项目
              </Link>
              <button type="button" onClick={() => { setContactOpen(false); setAboutOpen(true); }} className="absolute" style={{ left: NAV.about.x, top: NAV.about.y, fontSize: NAV.fontSize, color: navActive === "about" ? NAV.active : NAV.idle }}>
                关于
                {navActive === "about" ? <span className="absolute left-1/2 top-[18px] h-[3px] w-[36px] -translate-x-1/2" style={{ backgroundColor: NAV.underline }} /> : null}
              </button>
              <button type="button" onClick={() => { setAboutOpen(false); setContactOpen(true); }} className="absolute" style={{ left: NAV.contact.x, top: NAV.contact.y, fontSize: NAV.fontSize, color: navActive === "contact" ? NAV.active : NAV.idle }}>
                联系
                {navActive === "contact" ? <span className="absolute left-1/2 top-[18px] h-[3px] w-[36px] -translate-x-1/2" style={{ backgroundColor: NAV.underline }} /> : null}
              </button>
            </nav>
          </div>
        </header>

        <div
          className="pointer-events-none absolute"
          style={{
            left: 0,
            top: HOME_CONFIG.halftone.y,
            width: "100%",
            height: HOME_CONFIG.halftone.height,
            overflow: "hidden"
          }}
        >
          <img
            src="/assets/home/home-halftone-top.png?v=3"
            alt=""
            width={5000}
            height={368}
            className="absolute left-1/2 top-0 h-[368px] max-w-none -translate-x-1/2"
          />
        </div>

        <main className="relative mx-auto w-[1440px] overflow-hidden pt-[59px]" style={{ minHeight: `${HOME_CONFIG.height}px`, height: `${HOME_CONFIG.height}px` }}>
          <section id="projects" className="absolute inset-x-0 top-0 z-[20] h-[431px]">
            {projects.map((project) => {
                const rotation = project.homeRotation;

                return (
                  <Link
                    key={project.id}
                    href={`/case/${project.slug}`}
                    aria-label={`打开 ${project.title} 项目`}
                    className="group absolute z-[25] transition-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--portfolio-yellow)]"
                    style={{
                      left: `${project.homeX}px`,
                      top: `${project.homeY}px`,
                      pointerEvents: "auto"
                    }}
                  >
                    <div className="relative h-[114px] w-[100px] transform-gpu transition-none duration-0 ease-linear group-hover:-translate-y-2 group-hover:scale-[1.15] group-focus-visible:-translate-y-2 group-focus-visible:scale-[1.15]">
                      <div className="relative h-full w-full" style={{ transform: `rotate(${rotation}deg)` }}>
                      <Image
                        src={project.homeImage}
                        alt={project.title}
                        width={200}
                        height={228}
                        unoptimized
                        className="absolute left-0 top-0 h-[114px] w-[100px]"
                        style={{ imageRendering: "auto" }}
                      />
                      </div>
                    </div>
                  </Link>
                );
              })}
          </section>

          <section className="pointer-events-none absolute inset-x-0 bottom-[91px] top-0 z-[5]">
            <div
              className="absolute"
              style={{
                left: HOME_CONFIG.illustration.x,
                top: HOME_CONFIG.illustration.y,
                width: HOME_CONFIG.illustration.width,
                height: HOME_CONFIG.illustration.height
              }}
            >
              <Image
                src="/assets/home/home-main-illustration.png"
                alt="首页主插画"
                width={830}
                height={662}
                priority
                className="h-full w-full"
                style={{ imageRendering: "auto" }}
              />
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}
