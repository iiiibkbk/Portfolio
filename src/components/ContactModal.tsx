"use client";

import Image from "next/image";

const CONTACT = {
  popup: { x: 1137, y: 63, width: 266, height: 171 },
  labelWechat: { x: 1196, y: 129 },
  valueWechat: { x: 1237, y: 129 },
  labelEmail: { x: 1196, y: 177 },
  valueEmail: { x: 1237, y: 177 },
  color: "#defff8",
  fontSize: 14
} as const;

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[160]">
      <button
        type="button"
        aria-label="关闭联系弹窗"
        onClick={onClose}
        className="absolute inset-0 bg-transparent backdrop-blur-[14px] [background-color:transparent]"
      />

      <div className="pointer-events-none absolute left-1/2 top-0 h-[955px] w-[1440px] -translate-x-1/2">
        <div
          className="pointer-events-auto absolute"
          style={{
            left: CONTACT.popup.x,
            top: CONTACT.popup.y,
            width: CONTACT.popup.width,
            height: CONTACT.popup.height
          }}
        >
          <Image src="/assets/contact/contact.png" alt="联系弹窗" width={632} height={406} priority className="h-full w-full" />
        </div>

        <p className="pointer-events-none absolute text-[14px] leading-none" style={{ left: CONTACT.labelWechat.x, top: CONTACT.labelWechat.y, color: CONTACT.color }}>
          微信
        </p>
        <p className="pointer-events-none absolute text-[14px] leading-none" style={{ left: CONTACT.valueWechat.x, top: CONTACT.valueWechat.y, color: CONTACT.color }}>
          OYyy2611O
        </p>
        <p className="pointer-events-none absolute text-[14px] leading-none" style={{ left: CONTACT.labelEmail.x, top: CONTACT.labelEmail.y, color: CONTACT.color }}>
          邮箱
        </p>
        <p className="pointer-events-none absolute text-[14px] leading-none normal-case" style={{ left: CONTACT.valueEmail.x, top: CONTACT.valueEmail.y, color: CONTACT.color }}>
          771521684@qq.com
        </p>
      </div>
    </div>
  );
}
