const fs = require("fs");
const path = require("path");

const write = (filePath, content) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
};

const files = {
  "src/data/portfolio.ts": `export type Project = {
  id: string;
  slug: string;
  title: string;
  subTitle: string;
  description: string;
  role: string[];
  tags: string[];
  category: string;
  color: string;
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "bingo-series",
    title: "Bingo Series",
    subTitle: "Bingo 活动与促销相关界面设计整合",
    description: "系列型项目，包含多个场景和多个界面类型，侧重于促销氛围与用户参与感的营造。",
    role: ["活动界面设计", "弹窗设计", "商店促销包装", "HUD / UI 视觉优化", "插图整合与风格统一"],
    tags: ["Bingo", "Match-3"],
    category: "Bingo",
    color: "#ff823a"
  },
  {
    id: "2",
    slug: "vertical-game-a",
    title: "Vertical Game A",
    subTitle: "竖版轻度休闲游戏 UI 探索",
    description: "采用自由展示模式，侧重于单屏内信息的极致利用与手势操作的便捷性。",
    role: ["核心 UI 框架", "关卡反馈动效", "角色属性面板"],
    tags: ["Vertical", "Casual"],
    category: "Vertical",
    color: "#bc84ee"
  },
  {
    id: "3",
    slug: "vertical-game-b",
    title: "Vertical Game B",
    subTitle: "竖版游戏 UI 设计，偏重色彩与质感",
    description: "与 A 保持统一结构，但通过不同的色彩方案和排版方式实现视觉差异化。",
    role: ["UI 视觉表现", "动效预设", "多语言适配"],
    tags: ["Vertical", "Clean"],
    category: "Vertical",
    color: "#dcfd8b"
  },
  {
    id: "4",
    slug: "mini-game",
    title: "Mini Game",
    subTitle: "Toon Blast 风格 + Candy Match 玩法",
    description: "强调关卡反馈与打击感，视觉风格活泼亮丽，适合展示复杂特效与界面交互。",
    role: ["主界面设计", "弹窗系统", "结果页逻辑", "设置与引导"],
    tags: ["Cartoon", "Match-3"],
    category: "MiniGame",
    color: "#e8fb54"
  },
  {
    id: "5",
    slug: "offline-system",
    title: "Offline System",
    subTitle: "特定玩法与系统功能模块化展示",
    description: "侧重于系统逻辑与功能性界面的呈现，展示对复杂交互流程的把控力。",
    role: ["系统架构设计", "图标体系", "功能反馈循环"],
    tags: ["System", "Interaction"],
    category: "System",
    color: "#c8d9d1"
  },
  {
    id: "6",
    slug: "bingo-city",
    title: "Bingo City",
    subTitle: "模拟建造与城市氛围视觉包装",
    description: "将 Bingo 玩法与城市建设结合，侧重于世界观的沉浸感与主题包装。",
    role: ["视觉氛围营造", "主题包装设计", "建筑 UI 交互"],
    tags: ["Simulation", "City"],
    category: "Bingo",
    color: "#fdd5bd"
  },
  {
    id: "7",
    slug: "bingo-tombola",
    title: "Bingo Tombola",
    subTitle: "不同视觉个性的系列子项目",
    description: "展示在同一框架下实现完全不同视觉风格的可能性，强调素材的灵活性。",
    role: ["多风格尝试", "界面排布优化", "动态组件设计"],
    tags: ["Variety", "Layout"],
    category: "Bingo",
    color: "#6a2ed1"
  }
];

export const aboutMe = {
  name: "TIAN FU",
  post: "SALES / DESIGNER",
  experience: [
    {
      year: "2019-2026",
      company: "滚滚长江东逝水工作室",
      description: "负责核心项目视觉框架搭建与动效落地。"
    },
    {
      year: "2015-2019",
      company: "湖北美术学院 - 视觉传达",
      description: "打下扎实的视觉语言与美学基础。"
    }
  ],
  contact: {
    email: "771521684@qq.com",
    behance: "behance.net/tianfu"
  }
};
`,
  "src/app/page.tsx": `import HomeExperience from "../components/HomeExperience";

export default function Home() {
  return <HomeExperience />;
}
`,
  "src/components/HomeExperience.tsx": `"use client";

import { useState } from "react";
import Link from "next/link";
import { aboutMe, projects } from "../data/portfolio";

export default function HomeExperience() {
  const [badgeExpanded, setBadgeExpanded] = useState(false);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#e8fb54] p-8"
      style={{
        backgroundImage: "radial-gradient(#0000001a 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}
    >
      <nav className="absolute right-8 top-8 z-30 flex gap-6 text-sm font-bold tracking-[0.3em] text-black">
        <button onClick={() => setBadgeExpanded(false)} className="hover:line-through">
          HOME 家
        </button>
        <button onClick={() => setBadgeExpanded(true)} className="hover:line-through">
          ABOUT 关于
        </button>
      </nav>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={\`/case/\${project.slug}\`}
              className="group relative transition-transform hover:-translate-y-2"
            >
              <div
                className="flex h-28 w-20 items-center justify-center rounded-sm border-2 border-black p-2 text-center text-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: project.color }}
              >
                {project.title}
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {project.subTitle}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex h-[320px] w-full max-w-[560px] items-center justify-center overflow-hidden rounded-2xl border-[3px] border-black bg-white/40 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="rounded border-2 border-black bg-black p-8 text-center font-mono text-xs text-[#e8fb54] shadow-inner">
            INSERT CARTRIDGE / 请插入卡带
          </div>
        </div>

        <div className="mt-8 select-none text-center text-6xl font-black tracking-tighter text-black/10 md:text-8xl">
          PORTFOLIO
        </div>
      </div>

      <div
        className={\`fixed bottom-10 right-8 z-50 cursor-pointer transition-all duration-500 \${badgeExpanded ? "scale-100" : "scale-95 hover:rotate-2"}\`}
        onClick={() => !badgeExpanded && setBadgeExpanded(true)}
      >
        {!badgeExpanded ? (
          <div className="h-28 w-52 border-2 border-black bg-white p-4 shadow-[6px_6px_0px_0px_#ff823a]">
            <div className="flex gap-3">
              <div className="flex h-16 w-12 items-center justify-center border border-black bg-gray-200 text-xs font-bold">
                照片
              </div>
              <div className="flex flex-col text-[10px] font-bold text-black">
                <span>NAME: {aboutMe.name}</span>
                <span>POST: {aboutMe.post}</span>
                <span className="mt-auto text-orange-500">滕福 7</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-[450px] border-[3px] border-black bg-white p-8 shadow-[12px_12px_0px_0px_#ff823a]">
            <button
              onClick={(event) => {
                event.stopPropagation();
                setBadgeExpanded(false);
              }}
              className="absolute right-4 top-4 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="mb-6 border-b-2 border-black pb-2 text-2xl font-black text-black">
              ABOUT ME / 关于我
            </h2>
            <div className="space-y-6 text-black">
              <div>
                <h3 className="mb-2 text-sm font-bold text-orange-500">EXPERIENCE 经历</h3>
                {aboutMe.experience.map((exp) => (
                  <div key={exp.year} className="mb-3 text-xs">
                    <div className="font-bold">
                      {exp.year} | {exp.company}
                    </div>
                    <div className="opacity-70">{exp.description}</div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="mb-1 text-sm font-bold text-orange-500">CONTACT 联系</h3>
                <p className="text-xs">Email: {aboutMe.contact.email}</p>
                <p className="text-xs">Behance: {aboutMe.contact.behance}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
`,
  "src/app/case/[slug]/page.tsx": `import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../data/portfolio";

export default function CasePage({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="sticky top-0 z-40 flex h-16 w-full items-center gap-4 overflow-x-auto border-b-2 border-black bg-[#fffff0] px-8">
        {projects.map((item) => (
          <Link
            key={item.id}
            href={\`/case/\${item.slug}\`}
            className={\`border-2 border-black px-3 py-1 text-[10px] font-bold \${project.slug === item.slug ? "bg-black text-white" : "bg-white text-black hover:bg-[#e8fb54]"}\`}
          >
            {item.title}
          </Link>
        ))}
        <Link href="/" className="ml-auto text-xs font-black hover:underline">
          BACK HOME ↖
        </Link>
      </div>

      <main className="mx-auto max-w-5xl p-12">
        <header className="mb-12">
          <h1 className="mb-2 text-5xl font-black">{project.title}</h1>
          <p className="text-sm font-bold italic text-orange-500 opacity-60">{project.subTitle}</p>
        </header>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="col-span-1 space-y-8">
            <section className="border-l-4 border-black pl-4">
              <h3 className="mb-2 text-xs font-black tracking-wider text-gray-500">DESCRIPTION 说明</h3>
              <p className="text-xs leading-relaxed">{project.description}</p>
            </section>
            <section className="border-l-4 border-black pl-4">
              <h3 className="mb-2 text-xs font-black tracking-wider text-gray-500">ROLE 负责模块</h3>
              <ul className="space-y-1.5">
                {project.role.map((role) => (
                  <li key={role} className="flex items-center gap-2 text-xs font-bold">
                    <span className="h-1.5 w-1.5 rounded-full border border-black bg-[#e8fb54]" />
                    {role}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="col-span-2 space-y-6">
            <div className="flex aspect-video w-full items-center justify-center border-2 border-black bg-gray-50 text-xs italic text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              [ 横图展示大稿 ]
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex aspect-[3/4] items-center justify-center border-2 border-black bg-gray-50 text-xs italic text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                [ 竖图 A ]
              </div>
              <div className="flex aspect-[3/4] items-center justify-center border-2 border-black bg-gray-50 text-xs italic text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                [ 竖图 B ]
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
`,
  "src/app/layout.tsx": `import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tian Fu Portfolio",
  description: "Portfolio game style showcase"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
`,
  "src/app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  margin: 0;
  min-height: 100%;
  background: #e8fb54;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}
`,
  "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {}
  },
  plugins: []
};
`,
  "postcss.config.js": `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
`
};

for (const [file, content] of Object.entries(files)) {
  write(path.join(__dirname, file), content);
}

console.log("✨ 项目初始化脚本运行成功，所有项目文件已生成。");
