export type Project = {
  id: string;
  slug: string;
  title: string;
  subTitle: string;
  description: string;
  role: string[];
  tags: string[];
  category: string;
  color: string;
  homeImage: string;
  homeGlowImage?: string;
  homeRotation: number;
  homeX: number;
  homeY: number;
  layout: "horizontal" | "vertical";
  tabs: {
    key: string;
    label: string;
    folder: string;
    prefix: string;
    count: number;
    extraImages?: string[];
    excludeNumbers?: number[];
  }[];
};

export const NAV_CONFIG = {
  width: 1440,
  height: 56,
  leftPadding: 247.19,
  rightPadding: 248,
  menuGap: 41,
  fontSize: 12,
  underlineWidth: 36,
  underlineHeight: 3
} as const;

export const HOME_CONFIG = {
  width: 1440,
  height: 900,
  backgroundColor: "#e0f15b",
  halftone: {
    x: -240,
    y: 62,
    width: 1920,
    height: 368
  },
  illustration: {
    x: 501,
    y: 427,
    width: 415,
    height: 331
  }
} as const;

export const CONTACT_CONFIG = {
  height: 91,
  leftPadding: 247.19,
  rightPadding: 247.19,
  homeColor: "#5b9596",
  projectsColor: "#3799ac"
} as const;

export const ABOUT_CONFIG = {
  overlayOpacity: 0.1,
  overlayBlur: 6,
  badge: {
    width: 560,
    height: 675,
    overlapX: 244,
    bottomGap: 7
  },
  badgeDerived: {
    x: 314 + 245 - 560,
    y: 257 + 428 - 675 - 7,
    width: 560,
    height: 675
  },
  infoPanel: {
    x: 314,
    y: 262,
    width: 812,
    height: 428
  },
  hiBubble: {
    x: 464,
    y: 253,
    width: 119,
    height: 91
  },
  titleWorkBg: {
    x: 570,
    y: 333,
    width: 128,
    height: 40
  },
  titleEducationBg: {
    x: 570,
    y: 565,
    width: 128,
    height: 40
  },
  text: {
    workTitle: { x: 598.99, y: 346 },
    workYear: { x: 572.31, y: 383.45 },
    workBody: { x: 572.31, y: 403.45, width: 526.36, height: 135.55 },
    educationTitle: { x: 598.99, y: 577 },
    educationYear: { x: 572.31, y: 613.45 },
    educationSchool: { x: 572.31, y: 634.45 }
  },
  close: {
    x: 1086,
    y: 269,
    width: 25,
    height: 26
  }
} as const;

export const PROJECTS_CONFIG = {
  width: 1440,
  backgroundColor: "#b6d8d9",
  halftone: { x: -240, y: 62, width: 1920, height: 368 },
  displayWidth: 1364,
  horizontalScale: 0.487,
  verticalScale: 0.427,
  tab: {
    width: 89,
    height: 37,
    gap: 5,
    y: 487
  },
  horizontal: {
    frame: { x: 10, y: 465, width: 1421, height: 613 },
    gallery: { x: 0, y: 541, width: 1364, height: 613 }
  },
  vertical: {
    frame: { x: 10, y: 465, width: 1421, height: 754 },
    gallery: { x: 0, y: 541, width: 1364, height: 754 }
  },
  gallery: {
    gap: 19,
    introSpeed: 180,
    normalSpeed: 22,
    introDurationMs: 900
  }
} as const;

const generateImages = (
  folder: string,
  prefix: string,
  count: number,
  extraImages: string[] = [],
  excludeNumbers: number[] = []
) => [
  ...Array.from({ length: count }, (_, index) => index + 1)
    .filter((index) => !excludeNumbers.includes(index))
    .map((index) => `${folder}/${prefix}-${String(index).padStart(2, "0")}.webp`),
  ...extraImages
];

export const projects: Project[] = [
  {
    id: "bingo-series",
    slug: "bingo-series",
    title: "Bingo Series",
    subTitle: "Bingo 系列活动、促销与游戏中界面整合展示",
    description: "围绕同一产品线的多场景界面设计，覆盖活动、促销和游戏中的 UI 表现，强调统一视觉语言下的场景区分。",
    role: ["活动界面设计", "促销界面设计", "游戏中 HUD", "弹窗与反馈"],
    tags: ["Bingo", "Promo", "Event"],
    category: "Bingo",
    color: "#f3d65c",
    homeImage: "/assets/home/home-cartridge-bingo-series.png",
    homeGlowImage: "/assets/home/glow/home-cartridge-bingo-series-Outer-Glow.png",
    homeRotation: -4,
    homeX: 289,
    homeY: 167,
    layout: "horizontal",
    tabs: [
      {
        key: "promo",
        label: "促销",
        folder: "/assets/projects/bingo-series/project-bingo-series-promo",
        prefix: "project-bingo-series-promo",
        count: 23,
        excludeNumbers: [2, 3]
      },
      {
        key: "event",
        label: "活动",
        folder: "/assets/projects/bingo-series/project-bingo-series-event",
        prefix: "project-bingo-series-event",
        count: 17,
        extraImages: [
          "/assets/projects/bingo-series/project-bingo-series-event/project-bingo-series-event-001.webp",
          "/assets/projects/bingo-series/project-bingo-series-event/project-bingo-series-event-002.webp"
        ]
      },
      {
        key: "gameplay",
        label: "游戏中",
        folder: "/assets/projects/bingo-series/project-bingo-series-gameplay",
        prefix: "project-bingo-series-gameplay",
        count: 9
      }
    ]
  },
  {
    id: "bingo-city",
    slug: "bingo-city",
    title: "Bingo City",
    subTitle: "Bingo City 系统与活动界面展示",
    description: "以城市主题为核心的 Bingo 产品 UI 项目，包含系统层级与活动包装两类内容。",
    role: ["系统界面设计", "活动包装", "主题视觉统一"],
    tags: ["Bingo", "City", "System"],
    category: "Bingo",
    color: "#f3d65c",
    homeImage: "/assets/home/home-cartridge-bingo-city.png",
    homeGlowImage: "/assets/home/glow/home-cartridge-bingo-city-Outer-Glow.png",
    homeRotation: -1,
    homeX: 441,
    homeY: 184,
    layout: "horizontal",
    tabs: [
      {
        key: "operations",
        label: "活动",
        folder: "/assets/projects/bingo-city/project-bingo-city-operations",
        prefix: "project-bingo-city-operations",
        count: 11
      },
      {
        key: "system",
        label: "系统",
        folder: "/assets/projects/bingo-city/project-bingo-city-system",
        prefix: "project-bingo-city-system",
        count: 15
      }
    ]
  },
  {
    id: "bingo-offline",
    slug: "bingo-offline",
    title: "Bingo Offline",
    subTitle: "Offline Bingo 的系统、活动、经营与挑战界面",
    description: "围绕离线 Bingo 玩法的完整界面体系，包含系统、活动、经营与挑战四类内容。",
    role: ["系统模块设计", "活动界面设计", "经营玩法包装", "挑战流程设计"],
    tags: ["Bingo", "Offline", "Challenge"],
    category: "Bingo",
    color: "#f3d65c",
    homeImage: "/assets/home/home-cartridge-bingo-offline.png",
    homeGlowImage: "/assets/home/glow/home-cartridge-bingo-offline-Outer-Glow.png",
    homeRotation: 3,
    homeX: 594,
    homeY: 169,
    layout: "vertical",
    tabs: [
      {
        key: "operations",
        label: "活动",
        folder: "/assets/projects/bingo-offline/project-bingo-offline-operations",
        prefix: "project-bingo-offline-operations",
        count: 20
      },
      {
        key: "system",
        label: "系统",
        folder: "/assets/projects/bingo-offline/project-bingo-offline-system",
        prefix: "project-bingo-offline-system",
        count: 17
      },
      {
        key: "management",
        label: "经营",
        folder: "/assets/projects/bingo-offline/project-bingo-offline-management",
        prefix: "project-bingo-offline-management",
        count: 6
      },
      {
        key: "challenge",
        label: "挑战",
        folder: "/assets/projects/bingo-offline/project-bingo-offline-challenge",
        prefix: "project-bingo-offline-challenge",
        count: 7
      }
    ]
  },
  {
    id: "baby-slots",
    slug: "baby-slots",
    title: "Baby Slots",
    subTitle: "Baby Slots 的系统与活动界面展示",
    description: "以 Slots 产品为基础的系统与活动整合展示，强调轻快、亲和和明确的奖励反馈。",
    role: ["系统界面设计", "活动运营界面", "奖励反馈视觉"],
    tags: ["Slots", "System", "Event"],
    category: "Slots",
    color: "#f3d65c",
    homeImage: "/assets/home/home-cartridge-baby-slots.png",
    homeGlowImage: "/assets/home/glow/home-cartridge-baby-slots-Outer-Glow.png",
    homeRotation: -5,
    homeX: 747,
    homeY: 183,
    layout: "vertical",
    tabs: [
      {
        key: "event",
        label: "活动",
        folder: "/assets/projects/baby-slots/project-baby-slots-event",
        prefix: "project-baby-slots-event",
        count: 13
      },
      {
        key: "system",
        label: "系统",
        folder: "/assets/projects/baby-slots/project-baby-slots-system",
        prefix: "project-baby-slots-system",
        count: 8
      }
    ]
  },
  {
    id: "cash",
    slug: "cash",
    title: "Cash",
    subTitle: "竖版游戏 Cash 项目的活动界面展示",
    description: "以活动展示为主的竖版项目，重点呈现高饱和、强反馈的休闲游戏界面节奏。",
    role: ["活动 UI", "弹窗与流程", "休闲玩法视觉"],
    tags: ["Cash", "Event"],
    category: "Cash",
    color: "#f3d65c",
    homeImage: "/assets/home/home-cartridge-cash.png",
    homeGlowImage: "/assets/home/glow/home-cartridge-cash-Outer-Glow.png",
    homeRotation: 4,
    homeX: 900,
    homeY: 166,
    layout: "vertical",
    tabs: [
      {
        key: "operations",
        label: "活动",
        folder: "/assets/projects/cash",
        prefix: "project-cash-operations",
        count: 8
      }
    ]
  },
  {
    id: "vertical",
    slug: "vertical",
    title: "Vertical",
    subTitle: "竖版小游戏合集：bubble / match3 / tetris",
    description: "竖版小游戏合集，展示不同玩法在同一移动端视图中的 UI 适配与风格差异。",
    role: ["竖版界面设计", "玩法包装", "移动端视图节奏"],
    tags: ["Vertical", "Bubble", "Match3", "Tetris"],
    category: "Vertical",
    color: "#f3d65c",
    // 注意：最新版切图使用 `home-cartridge-vertical.png`（2x），网页里按 1x 显示
    homeImage: "/assets/home/home-cartridge-vertical.png",
    homeGlowImage: "/assets/home/glow/home-cartridge-vertical-Outer-Glow.png",
    homeRotation: 2,
    homeX: 1052,
    homeY: 175,
    layout: "vertical",
    tabs: [
      {
        key: "bubble",
        label: "Bubble",
        folder: "/assets/projects/vertical/project-vertical-bubble",
        prefix: "project-vertical-bubble",
        count: 7
      },
      {
        key: "match3",
        label: "Match3",
        folder: "/assets/projects/vertical/project-vertical-match3",
        prefix: "project-vertical-match3",
        count: 6
      }
    ]
  }
];

export const projectImageMap = Object.fromEntries(
  projects.map((project) => [
    project.slug,
    project.tabs.map((tab) => ({
      ...tab,
      images: generateImages(tab.folder, tab.prefix, tab.count, tab.extraImages, tab.excludeNumbers)
    }))
  ])
);

export const aboutMe = {
  name: "LIANGCHEN",
  post: "GAME UI 设计",
  experience: [
    {
      year: "2019-2026",
      company: "在勤路软件有限公司",
      description: "在勤路软件有限公司担任游戏 UI 设计师，负责多款 Bingo 类产品及个人独立主导项目的 UI 设计工作。",
      details: [
        "主导完成 Bingo City、Offline Bingo 两款游戏的完整 UI 系统设计，从视觉风格定调到全流程界面落地；",
        "参与 Cash、Baby Slots 等游戏的主要模块设计，涵盖主界面、系统弹窗与活动运营界面；",
        "参与 Bingo Series 三款同类型产品的 UI 设计，覆盖促销、活动、宣传等功能场景。"
      ]
    },
    {
      year: "2015-2019",
      company: "湖北美术学院 - 视觉传达",
      description: "完成视觉传达本科阶段学习，建立系统的视觉语言基础。"
    }
  ],
  contact: {
    email: "771521684@qq.com",
    wechat: "OYyy2611Q"
  }
};
