"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ABOUT_CONFIG, aboutMe } from "../data/portfolio";

export default function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const hiTimer = useRef<number | null>(null);
  const [hiVisible, setHiVisible] = useState(false);
  const hiBubbleOffsetX = -26;
  const aboutContentOffsetX = -14;

  useEffect(() => {
    if (hiTimer.current) {
      window.clearTimeout(hiTimer.current);
    }
    if (open) {
      setHiVisible(false);
      hiTimer.current = window.setTimeout(() => setHiVisible(true), 400);
    } else {
      setHiVisible(false);
    }
    return () => {
      if (hiTimer.current) window.clearTimeout(hiTimer.current);
    };
  }, [open]);

  if (!open) return null;

  const badgeLeft = ABOUT_CONFIG.badgeDerived.x;
  const badgeTop = ABOUT_CONFIG.badgeDerived.y;

  return (
    <div className="fixed inset-0 z-[160]">
      <button
        type="button"
        aria-label="关闭关于弹窗"
        onClick={onClose}
        className="absolute inset-0 bg-transparent backdrop-blur-[14px] [background-color:transparent]"
      />

      <div className="pointer-events-none absolute left-1/2 top-[28px] h-[955px] w-[1440px] -translate-x-1/2">
        <div className="pointer-events-auto absolute z-[20]" style={{ left: badgeLeft, top: badgeTop, width: ABOUT_CONFIG.badge.width, height: ABOUT_CONFIG.badge.height }}>
          <Image src="/assets/about/about-badge-card2.png" alt="关于我工牌" width={982} height={1350} priority className="h-full w-full object-contain" />
        </div>

        <div
          className="pointer-events-none absolute z-[30]"
          style={{
            left: ABOUT_CONFIG.hiBubble.x,
            top: ABOUT_CONFIG.hiBubble.y,
            width: ABOUT_CONFIG.hiBubble.width,
            height: ABOUT_CONFIG.hiBubble.height,
            opacity: hiVisible ? 1 : 0,
            transform: hiVisible ? `translate3d(${hiBubbleOffsetX}px, 0, 0)` : `translate3d(${hiBubbleOffsetX}px, 10px, 0)`,
            transition: "opacity 180ms ease, transform 180ms ease"
          }}
        >
          <Image src="/assets/about/about-bubble-hi.png" alt="Hi" width={ABOUT_CONFIG.hiBubble.width * 2} height={ABOUT_CONFIG.hiBubble.height * 2} className="h-full w-full" />
        </div>

        <div className="pointer-events-auto absolute z-[10]" style={{ left: ABOUT_CONFIG.infoPanel.x, top: ABOUT_CONFIG.infoPanel.y, width: ABOUT_CONFIG.infoPanel.width, height: ABOUT_CONFIG.infoPanel.height }}>
          <Image src="/assets/about/about-info-panel.png?v=4" alt="" width={ABOUT_CONFIG.infoPanel.width * 2} height={ABOUT_CONFIG.infoPanel.height * 2} priority className="h-full w-full" />
        </div>

        <div
          className="pointer-events-none absolute z-[15]"
          style={{
            left: ABOUT_CONFIG.titleWorkBg.x,
            top: ABOUT_CONFIG.titleWorkBg.y,
            width: ABOUT_CONFIG.titleWorkBg.width,
            height: ABOUT_CONFIG.titleWorkBg.height,
            transform: `translate3d(${aboutContentOffsetX}px, 0, 0)`
          }}
        >
          <Image src="/assets/about/about-title-work.png" alt="" width={128} height={40} className="h-full w-full object-contain" />
        </div>
        <div
          className="pointer-events-none absolute z-[15]"
          style={{
            left: ABOUT_CONFIG.titleEducationBg.x,
            top: ABOUT_CONFIG.titleEducationBg.y,
            width: ABOUT_CONFIG.titleEducationBg.width,
            height: ABOUT_CONFIG.titleEducationBg.height,
            transform: `translate3d(${aboutContentOffsetX}px, 0, 0)`
          }}
        >
          <Image src="/assets/about/about-title-education.png" alt="" width={128} height={40} className="h-full w-full object-contain" />
        </div>

        <p
          className="pointer-events-none absolute z-[16] -translate-x-1/2 text-[14px] leading-none text-white"
          style={{ left: ABOUT_CONFIG.titleWorkBg.x + ABOUT_CONFIG.titleWorkBg.width / 2, top: ABOUT_CONFIG.text.workTitle.y, marginLeft: aboutContentOffsetX }}
        >
          工作经历
        </p>
        <p
          className="pointer-events-none absolute z-[16] text-[14px] leading-none text-[#ece8a3]"
          style={{ left: ABOUT_CONFIG.text.workYear.x, top: ABOUT_CONFIG.text.workYear.y, transform: `translate3d(${aboutContentOffsetX}px, 0, 0)` }}
        >
          2019-至今
        </p>
        <div
          className="pointer-events-none absolute z-[16] text-[14px] leading-[1.5] text-[#defff8]"
          style={{
            left: ABOUT_CONFIG.text.workBody.x,
            top: ABOUT_CONFIG.text.workBody.y,
            width: ABOUT_CONFIG.text.workBody.width,
            minHeight: ABOUT_CONFIG.text.workBody.height,
            transform: `translate3d(${aboutContentOffsetX}px, 0, 0)`
          }}
        >
          <p className="m-0">{aboutMe.experience[0].description}</p>
          <p className="m-0">·主导完成 Bingo City、Offline Bingo 两款游戏的完整 UI 系统设计，从视觉风格</p>
          <p className="m-0 pl-[14px]">定调到全流程界面落地；</p>
          <p className="m-0">·参与 Cash、Baby Slots 等游戏的主要模块设计，涵盖主界面、系统弹窗与活动</p>
          <p className="m-0 pl-[14px]">运营界面；</p>
          <p className="m-0 whitespace-nowrap">·参与Bingo Series三款同类型产品的UI设计，覆盖促销、活动、宣传等功能场景。</p>
        </div>
        <p
          className="pointer-events-none absolute z-[16] -translate-x-1/2 text-[14px] leading-none text-white"
          style={{ left: ABOUT_CONFIG.titleEducationBg.x + ABOUT_CONFIG.titleEducationBg.width / 2, top: ABOUT_CONFIG.text.educationTitle.y, marginLeft: aboutContentOffsetX }}
        >
          毕业院校
        </p>
        <p
          className="pointer-events-none absolute z-[16] text-[14px] leading-none text-[#ece8a3]"
          style={{ left: ABOUT_CONFIG.text.educationYear.x, top: ABOUT_CONFIG.text.educationYear.y, transform: `translate3d(${aboutContentOffsetX}px, 0, 0)` }}
        >
          2015-2019
        </p>
        <p
          className="pointer-events-none absolute z-[16] text-[14px] leading-none text-[#defff8]"
          style={{ left: ABOUT_CONFIG.text.educationSchool.x, top: ABOUT_CONFIG.text.educationSchool.y, transform: `translate3d(${aboutContentOffsetX}px, 0, 0)` }}
        >
          湖北美术学院-视觉传达
        </p>

        <button
          type="button"
          aria-label="关闭关于弹窗"
          onClick={onClose}
          className="pointer-events-auto absolute z-[40] bg-transparent p-0"
          style={{ left: ABOUT_CONFIG.close.x, top: ABOUT_CONFIG.close.y, width: ABOUT_CONFIG.close.width, height: ABOUT_CONFIG.close.height }}
        >
          <Image src="/assets/about/about-close-x.png" alt="" width={ABOUT_CONFIG.close.width} height={ABOUT_CONFIG.close.height} className="h-full w-full" />
        </button>
      </div>
    </div>
  );
}
