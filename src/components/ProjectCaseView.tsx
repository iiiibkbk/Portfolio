"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS_CONFIG, projectImageMap, projects, type Project } from "../data/portfolio";
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

function ProjectGallery({
  images,
  layout,
  area,
  paused,
  onImageClick
}: {
  images: string[];
  layout: "horizontal" | "vertical";
  area: { x: number; y: number; width: number; height: number };
  paused: boolean;
  onImageClick?: (payload: { src: string; width: number; height: number }) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startOffset: 0, moved: false });
  const hoverRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  const imageSize =
    layout === "horizontal"
      ? { width: 1362 * PROJECTS_CONFIG.horizontalScale, height: 783 * PROJECTS_CONFIG.horizontalScale }
      : { width: 783 * PROJECTS_CONFIG.verticalScale, height: 1372 * PROJECTS_CONFIG.verticalScale };
  const gap = PROJECTS_CONFIG.gallery.gap;
  const step = imageSize.width + gap;
  const cycleWidth = Math.max(images.length * step, step);
  const repeatedImages = useMemo(
    () => (images.length <= 1 ? images : Array.from({ length: 3 }, () => images).flat()),
    [images]
  );

  const normalize = (value: number) => {
    let next = value % cycleWidth;
    if (next < 0) next += cycleWidth;
    return next;
  };

  const normalizeIndex = (value: number) => {
    if (images.length === 0) return 0;
    let next = value % images.length;
    if (next < 0) next += images.length;
    return next;
  };

  const openPreviewFromClientX = (clientX: number) => {
    if (!containerRef.current || images.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const localX = clientX - rect.left;
    if (localX < 0 || localX > rect.width) return;
    const absoluteX = offsetRef.current + localX;
    const imageIndex = normalizeIndex(Math.floor(absoluteX / step));
    const image = images[imageIndex];
    onImageClick?.({
      src: image,
      width: imageSize.width * 1.2,
      height: imageSize.height * 1.2
    });
  };

  const syncWindow = (value: number) => {
    if (!trackRef.current) return;
    if (images.length <= 1) {
      trackRef.current.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const normalized = normalize(value);
    trackRef.current.style.transform = `translate3d(${-normalized - cycleWidth}px, 0, 0)`;
  };

  useEffect(() => {
    offsetRef.current = 0;
    syncWindow(0);
    let last = performance.now();

    const animate = (time: number) => {
      const dt = time - last;
      last = time;

      const shouldFreeze = paused || hoverRef.current || dragRef.current.active || images.length <= 1;
      if (!shouldFreeze) {
        offsetRef.current = normalize(offsetRef.current + (PROJECTS_CONFIG.gallery.normalSpeed * dt) / 1000);
        syncWindow(offsetRef.current);
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [cycleWidth, images.length, layout, paused, step]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const stopDrag = (pointerId?: number) => {
      if (pointerId !== undefined && pointerId !== -1 && el.hasPointerCapture(pointerId)) {
        el.releasePointerCapture(pointerId);
      }
      dragRef.current.active = false;
      dragRef.current.pointerId = -1;
      dragRef.current.moved = false;
      setDragging(false);
      if (!el.matches(":hover")) hoverRef.current = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      hoverRef.current = true;
      dragRef.current = {
        active: true,
        pointerId: e.pointerId,
        startX: e.clientX,
        startOffset: offsetRef.current,
        moved: false
      };
      el.setPointerCapture(e.pointerId);
      setDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current.active || dragRef.current.pointerId !== e.pointerId) return;
      const delta = e.clientX - dragRef.current.startX;
      if (Math.abs(delta) > 6) dragRef.current.moved = true;
      const next = normalize(dragRef.current.startOffset - delta);
      offsetRef.current = next;
      syncWindow(next);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (dragRef.current.pointerId !== e.pointerId) return;
      const moved = dragRef.current.moved;
      const clientX = e.clientX;
      stopDrag(e.pointerId);
      if (!moved) openPreviewFromClientX(clientX);
    };

    const onPointerEnter = () => {
      hoverRef.current = true;
    };

    const onWheel = (e: WheelEvent) => {
      if (images.length <= 1) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 0.5) return;
      hoverRef.current = true;
      offsetRef.current = normalize(offsetRef.current + delta);
      syncWindow(offsetRef.current);
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (dragRef.current.active && dragRef.current.pointerId === e.pointerId) return;
      hoverRef.current = false;
    };

    el.onpointerdown = onPointerDown;
    el.onpointermove = onPointerMove;
    el.onpointerup = onPointerUp;
    el.onpointercancel = onPointerUp;
    el.onpointerenter = onPointerEnter;
    el.onpointerleave = onPointerLeave;
    el.onwheel = onWheel;

    return () => {
      stopDrag(dragRef.current.pointerId);
      el.onpointerdown = null;
      el.onpointermove = null;
      el.onpointerup = null;
      el.onpointercancel = null;
      el.onpointerenter = null;
      el.onpointerleave = null;
      el.onwheel = null;
    };
  }, [cycleWidth, images.length]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div
        ref={containerRef}
        className="absolute z-[130] overflow-hidden"
        style={{ left: area.x, top: area.y, width: area.width, height: area.height, userSelect: "none" }}
      >
        <img
          src={images[0]}
          alt=""
          width={imageSize.width}
          height={imageSize.height}
          className="absolute left-0 top-0 max-w-none select-none"
          style={{ width: imageSize.width, height: imageSize.height }}
          decoding="async"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute z-[130] overflow-hidden"
      style={{ left: area.x, top: area.y, width: area.width, height: area.height, touchAction: "none", cursor: dragging ? "grabbing" : "grab", userSelect: "none" }}
    >
      <div
        ref={trackRef}
        className="absolute left-0 top-0 z-[1] will-change-transform"
        style={{
          transform: "translate3d(0, 0, 0)",
          contain: "layout paint",
          width: repeatedImages.length * step,
          height: imageSize.height
        }}
      >
        {repeatedImages.map((image, slot) => {
          const left = slot * step;

          return (
          <img
            key={`${slot}-${image}`}
            src={image}
            alt=""
            width={imageSize.width}
            height={imageSize.height}
            className="absolute top-0 max-w-none select-none"
            style={{ left, width: imageSize.width, height: imageSize.height }}
            decoding="async"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
          />
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectCaseView({ project }: { project: Project }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ src: string; width: number; height: number } | null>(null);
  const tabs = projectImageMap[project.slug];
  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "");
  const activeTabData = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const activeLayout = project.layout === "horizontal" ? PROJECTS_CONFIG.horizontal : PROJECTS_CONFIG.vertical;
  const pageHeight = project.layout === "horizontal" ? 1190 : 1330;
  const hoverArea = project.layout === "horizontal"
    ? { x: 17, y: 614, width: 1405, height: 381 }
    : { x: 17, y: 584, width: 1405, height: 592 };
  const tabGroupWidth = tabs.length * PROJECTS_CONFIG.tab.width + Math.max(0, tabs.length - 1) * PROJECTS_CONFIG.tab.gap;
  const tabStartX = activeLayout.frame.x + (activeLayout.frame.width - tabGroupWidth) / 2;
  const navActive = contactOpen ? "contact" : aboutOpen ? "about" : "project";

  useEffect(() => {
    // 预加载 About/Contact 弹窗资源，避免首次打开时感知“加载慢”
    const run = () => {
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
  }, []);

  useEffect(() => {
    if (!tabs.some((tab) => tab.key === activeTab)) setActiveTab(tabs[0]?.key ?? "");
  }, [activeTab, tabs]);

  useEffect(() => {
    if (!previewImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewImage(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewImage]);

  return (
    <div className="portfolio-display relative min-h-screen overflow-x-hidden text-black" style={{ backgroundColor: "#acd9da" }}>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      {previewImage ? (
        <div className="fixed inset-0 z-[260]">
          <button
            type="button"
            aria-label="关闭图片预览"
            onClick={() => setPreviewImage(null)}
            className="absolute inset-0 bg-transparent backdrop-blur-[14px] [background-color:rgba(0,0,0,0.16)]"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="pointer-events-auto relative"
              style={{ width: previewImage.width, height: previewImage.height }}
            >
              <img
                src={previewImage.src}
                alt=""
                width={previewImage.width}
                height={previewImage.height}
                className="h-full w-full select-none object-contain"
                draggable={false}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative mx-auto min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: "#acd9da" }}>
        <header className="fixed left-0 top-0 z-[220] h-[59px] w-full">
          <Image src="/assets/top/top.png" alt="" fill priority className="object-fill" />
          <div className="relative mx-auto h-full w-[1440px]">
            <Link href="/" className="absolute uppercase leading-none text-[#363636]" style={{ left: NAV.portfolio.x, top: NAV.portfolio.y, fontSize: NAV.fontSize }}>
              PORTFOLIO
            </Link>
            <nav className="leading-none">
              <span className="absolute" style={{ left: NAV.project.x, top: NAV.project.y, fontSize: NAV.fontSize, color: navActive === "project" ? NAV.active : NAV.idle }}>
                项目
                {navActive === "project" ? <span className="absolute left-1/2 top-[18px] h-[3px] w-[36px] -translate-x-1/2" style={{ backgroundColor: NAV.underline }} /> : null}
              </span>
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

        <div className="pointer-events-none absolute" style={{ left: 0, top: PROJECTS_CONFIG.halftone.y, width: "100%", height: PROJECTS_CONFIG.halftone.height, overflow: "hidden" }}>
          <img src="/assets/projects/common/projects-halftone-top.png?v=3" alt="" width={5000} height={368} className="absolute left-1/2 top-0 h-[368px] max-w-none -translate-x-1/2" />
        </div>

        <main className="relative mx-auto w-[1440px]" style={{ height: pageHeight }}>
          {projects.map((item) => {
            const isSelected = item.slug === project.slug;
            return (
              <Link
                key={item.slug}
                href={`/case/${item.slug}`}
                className="group absolute z-[25]"
                style={{ left: item.homeX, top: item.homeY }}
              >
                <div className="relative h-[114px] w-[100px] transition-transform duration-0 ease-out group-hover:-translate-y-2 group-hover:scale-[1.15] group-focus-visible:-translate-y-2 group-focus-visible:scale-[1.15]">
                  <div className="relative h-full w-full" style={{ transform: `rotate(${item.homeRotation}deg)` }}>
                    {isSelected && item.homeGlowImage ? (
                      <Image src={item.homeGlowImage} alt="" width={120} height={134} unoptimized className="absolute left-1/2 top-1/2 h-[134px] w-[120px] max-w-none -translate-x-1/2 -translate-y-1/2" />
                    ) : null}
                    <Image src={item.homeImage} alt={item.title} width={200} height={228} unoptimized className="relative h-[114px] w-[100px]" />
                  </div>
                </div>
              </Link>
            );
          })}

          <div className="pointer-events-none absolute left-0 top-0 z-[10] h-full w-full">
            <div className="absolute" style={{ left: activeLayout.frame.x, top: activeLayout.frame.y, width: activeLayout.frame.width, height: activeLayout.frame.height }}>
              <Image
                src={project.layout === "horizontal" ? "/assets/projects/common/projects-horizontal-bg.png" : "/assets/projects/common/projects-vertical_bg.png"}
                alt=""
                width={activeLayout.frame.width}
                height={activeLayout.frame.height}
                className="h-full w-full"
              />
            </div>
          </div>

          {project.slug === "cash" ? (
            <div className="pointer-events-none absolute z-[15] text-[14px] leading-none" style={{ left: 688, top: 499, color: "#65a3b3" }}>
              活动页面
            </div>
          ) : tabs.length > 1 ? (
            <div className="absolute z-[15] flex items-center" style={{ top: 487, left: tabStartX, gap: PROJECTS_CONFIG.tab.gap }}>
              {tabs.map((tab) => {
                const selected = tab.key === activeTab;
                return (
                  <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className="relative h-[37px] w-[89px] text-[12px] leading-none">
                    <Image src={selected ? "/assets/projects/common/projects-tab-selected.png" : "/assets/projects/common/projects-tab-unselected.png"} alt="" fill className="object-cover" />
                    <span className="relative z-10 flex h-full items-center justify-center" style={{ color: "#65a3b3" }}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}

          <ProjectGallery
            images={activeTabData.images}
            layout={project.layout}
            area={hoverArea}
            paused={aboutOpen || contactOpen || Boolean(previewImage)}
            onImageClick={(payload) => setPreviewImage(payload)}
          />
        </main>
      </div>
    </div>
  );
}
