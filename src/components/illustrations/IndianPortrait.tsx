import type { PortraitVariant } from "@/types";

import { cn } from "@/lib/utils";

type PortraitStage = "default" | "before" | "after";

type IndianPortraitProps = {
  variant: PortraitVariant;
  stage?: PortraitStage;
  title?: string;
  className?: string;
};

type PortraitTheme = {
  skin: string;
  skinShadow: string;
  hair: string;
  hairSoft: string;
  outfit: string;
  accent: string;
  backdropStart: string;
  backdropEnd: string;
  glow: string;
  eye: string;
  lip: string;
  accessory?: "bindi" | "beard";
  hairShape: "wave" | "bun" | "soft-wave" | "long-wave" | "short" | "bob";
};

const THEMES: Record<PortraitVariant, PortraitTheme> = {
  ruchika: {
    skin: "#c98463",
    skinShadow: "#b07053",
    hair: "#2b1712",
    hairSoft: "#5d352a",
    outfit: "#6d8c31",
    accent: "#edbe58",
    backdropStart: "#f8efd8",
    backdropEnd: "#dbe6ba",
    glow: "#f5d892",
    eye: "#342016",
    lip: "#9e5f55",
    accessory: "bindi",
    hairShape: "long-wave",
  },
  priya: {
    skin: "#ba7656",
    skinShadow: "#9d6247",
    hair: "#24120f",
    hairSoft: "#4a261d",
    outfit: "#b96d48",
    accent: "#7d9a50",
    backdropStart: "#f7ebd7",
    backdropEnd: "#f5d7bf",
    glow: "#e4ecd0",
    eye: "#2f1a12",
    lip: "#8f5148",
    accessory: "bindi",
    hairShape: "wave",
  },
  ananya: {
    skin: "#c17d60",
    skinShadow: "#aa684c",
    hair: "#2d1712",
    hairSoft: "#5e3228",
    outfit: "#89703f",
    accent: "#88a954",
    backdropStart: "#fbf0dc",
    backdropEnd: "#edd8b4",
    glow: "#f5d892",
    eye: "#311f17",
    lip: "#8d4e49",
    accessory: "bindi",
    hairShape: "bun",
  },
  kavita: {
    skin: "#ad6b4d",
    skinShadow: "#92573e",
    hair: "#23130f",
    hairSoft: "#593126",
    outfit: "#8b5f55",
    accent: "#6d8c31",
    backdropStart: "#f8efdf",
    backdropEnd: "#d9e1be",
    glow: "#f3d79f",
    eye: "#302117",
    lip: "#834744",
    accessory: "bindi",
    hairShape: "soft-wave",
  },
  rohit: {
    skin: "#a86849",
    skinShadow: "#8c543a",
    hair: "#1e1410",
    hairSoft: "#493229",
    outfit: "#5b6542",
    accent: "#d3a35a",
    backdropStart: "#efe7cf",
    backdropEnd: "#d6dfbd",
    glow: "#f0d7a1",
    eye: "#251712",
    lip: "#6a4337",
    accessory: "beard",
    hairShape: "short",
  },
  neha: {
    skin: "#c4815f",
    skinShadow: "#a86548",
    hair: "#25110d",
    hairSoft: "#5a3024",
    outfit: "#a06d52",
    accent: "#e0b665",
    backdropStart: "#fbefdc",
    backdropEnd: "#ead7bb",
    glow: "#dfe9bd",
    eye: "#311c15",
    lip: "#94524d",
    accessory: "bindi",
    hairShape: "bob",
  },
  deepika: {
    skin: "#b87659",
    skinShadow: "#9a5f46",
    hair: "#261510",
    hairSoft: "#5f3428",
    outfit: "#7f8e57",
    accent: "#d39d5f",
    backdropStart: "#f8ecd6",
    backdropEnd: "#e3dfc5",
    glow: "#f0d39c",
    eye: "#2f1d15",
    lip: "#8a4d47",
    accessory: "bindi",
    hairShape: "wave",
  },
  sanya: {
    skin: "#c07f60",
    skinShadow: "#a7684c",
    hair: "#23110f",
    hairSoft: "#5c3025",
    outfit: "#b78553",
    accent: "#7b9452",
    backdropStart: "#fbf1df",
    backdropEnd: "#e8dbc3",
    glow: "#e1e8c1",
    eye: "#2d1d16",
    lip: "#92554c",
    accessory: "bindi",
    hairShape: "long-wave",
  },
  meera: {
    skin: "#bb795b",
    skinShadow: "#9d6147",
    hair: "#25130f",
    hairSoft: "#563126",
    outfit: "#6e8156",
    accent: "#d7aa61",
    backdropStart: "#f7ecd9",
    backdropEnd: "#dadfbd",
    glow: "#f4d59b",
    eye: "#301e17",
    lip: "#8b4f47",
    accessory: "bindi",
    hairShape: "soft-wave",
  },
};

function getBodyScale(stage: PortraitStage) {
  if (stage === "before") {
    return { shoulderRx: 112, waistRx: 96, faceRx: 60, faceRy: 71, glowScale: 1 };
  }

  if (stage === "after") {
    return { shoulderRx: 94, waistRx: 78, faceRx: 54, faceRy: 66, glowScale: 0.9 };
  }

  return { shoulderRx: 102, waistRx: 86, faceRx: 57, faceRy: 68, glowScale: 0.95 };
}

function getHairPath(shape: PortraitTheme["hairShape"], hair = "#000000") {
  if (shape === "bun") {
    return (
      <>
        <circle cx="200" cy="76" r="18" fill={hair} />
        <path
          d="M94 170c0-59 27-108 66-108s66 49 66 108v30H94z"
          fill={hair}
        />
      </>
    );
  }

  if (shape === "short") {
    return (
      <path
        d="M96 155c4-58 38-94 84-94 50 0 82 39 82 92-14-9-34-15-60-15-41 0-74 13-106 31z"
        fill={hair}
      />
    );
  }

  if (shape === "bob") {
    return (
      <path
        d="M84 166c0-64 36-105 87-105 44 0 83 35 83 102v62c-14 11-29 20-44 27-2-40-10-61-39-70-30 7-39 31-42 70-17-8-32-17-45-29z"
        fill={hair}
      />
    );
  }

  if (shape === "soft-wave") {
    return (
      <path
        d="M80 177c0-70 40-116 95-116 52 0 94 46 94 116v90c-18-11-38-21-58-25-5-41-16-61-36-68-22 8-32 29-36 68-19 5-39 14-59 27z"
        fill={hair}
      />
    );
  }

  if (shape === "long-wave") {
    return (
      <path
        d="M74 177c0-75 43-120 101-120 58 0 101 45 101 120v112c-21-15-42-24-62-29-5-44-17-67-39-74-24 8-36 31-40 74-20 5-40 15-61 30z"
        fill={hair}
      />
    );
  }

  return (
    <path
      d="M78 174c0-71 41-116 98-116 55 0 98 46 98 116v102c-19-14-40-24-60-28-5-42-15-64-38-71-23 8-34 30-38 71-20 5-41 15-60 29z"
      fill={hair}
    />
  );
}

export function PortraitAvatar({
  variant,
  title,
  className,
}: Omit<IndianPortraitProps, "stage">) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-full border border-white/75 bg-white/70 shadow-[0_8px_20px_rgba(53,72,26,0.14)]",
        className
      )}
    >
      <IndianPortrait
        variant={variant}
        title={title}
        className="h-full w-full scale-[1.18]"
      />
    </div>
  );
}

export default function IndianPortrait({
  variant,
  stage = "default",
  title,
  className,
}: IndianPortraitProps) {
  const theme = THEMES[variant];
  const body = getBodyScale(stage);
  const titleId = title ? `${variant}-${stage}-title` : undefined;
  const shoulderY = stage === "before" ? 306 : stage === "after" ? 314 : 310;
  const waistY = stage === "before" ? 335 : stage === "after" ? 340 : 338;

  return (
    <svg
      viewBox="0 0 320 400"
      role="img"
      aria-labelledby={titleId}
      className={cn("h-full w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {titleId ? <title id={titleId}>{title}</title> : null}
      <defs>
        <linearGradient id={`${variant}-${stage}-bg`} x1="40" x2="280" y1="30" y2="370">
          <stop offset="0%" stopColor={theme.backdropStart} />
          <stop offset="100%" stopColor={theme.backdropEnd} />
        </linearGradient>
        <linearGradient id={`${variant}-${stage}-outfit`} x1="110" x2="220" y1="220" y2="380">
          <stop offset="0%" stopColor={theme.outfit} />
          <stop offset="100%" stopColor={theme.accent} />
        </linearGradient>
      </defs>

      <rect
        x="6"
        y="6"
        width="308"
        height="388"
        rx="36"
        fill={`url(#${variant}-${stage}-bg)`}
      />
      <circle
        cx="250"
        cy="88"
        r={50 * body.glowScale}
        fill={theme.glow}
        opacity="0.38"
      />
      <circle cx="74" cy="94" r="62" fill={theme.glow} opacity="0.16" />
      <path
        d="M40 334c35-23 76-37 124-37 47 0 86 13 117 39v44H40z"
        fill={theme.hairSoft}
        opacity="0.15"
      />

      <ellipse
        cx="160"
        cy={shoulderY}
        rx={body.shoulderRx}
        ry="70"
        fill={`url(#${variant}-${stage}-outfit)`}
      />
      <ellipse
        cx="160"
        cy={waistY}
        rx={body.waistRx}
        ry="54"
        fill={theme.outfit}
        opacity="0.9"
      />
      <path
        d="M113 255c14 24 34 37 47 37 16 0 33-13 47-37l14 11c-17 38-38 58-61 58-26 0-46-18-62-57z"
        fill={theme.accent}
        opacity="0.8"
      />

      {getHairPath(theme.hairShape, theme.hair)}

      <ellipse
        cx="160"
        cy="170"
        rx={body.faceRx}
        ry={body.faceRy}
        fill={theme.skin}
      />
      <ellipse
        cx="160"
        cy="212"
        rx="46"
        ry="30"
        fill={theme.skinShadow}
        opacity="0.18"
      />

      <path
        d="M116 170c12-18 28-29 44-29 18 0 34 10 46 28-10-36-26-53-47-53-19 0-34 16-43 54z"
        fill={theme.hairSoft}
        opacity="0.55"
      />

      <ellipse cx="138" cy="171" rx="6.5" ry="4.5" fill={theme.eye} />
      <ellipse cx="182" cy="171" rx="6.5" ry="4.5" fill={theme.eye} />
      <path
        d="M145 205c10 7 22 7 30 0"
        fill="none"
        stroke={theme.lip}
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M158 177c0 10-2 20-8 28"
        fill="none"
        stroke={theme.skinShadow}
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.35"
      />

      {theme.accessory === "bindi" ? (
        <circle cx="160" cy="154" r="4.5" fill={theme.accent} />
      ) : null}
      {theme.accessory === "beard" ? (
        <path
          d="M130 198c6 24 19 37 30 37 13 0 27-13 32-37-9 8-21 12-32 12-12 0-22-4-30-12z"
          fill={theme.hair}
          opacity="0.9"
        />
      ) : null}

      {stage === "after" ? (
        <>
          <path
            d="M228 122c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16z"
            fill={theme.accent}
            opacity="0.92"
          />
          <path
            d="M229 129v18M220 138h18"
            fill="none"
            stroke="#fffdf8"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </>
      ) : null}

      {stage === "before" ? (
        <ellipse
          cx="243"
          cy="142"
          rx="26"
          ry="18"
          fill={theme.hairSoft}
          opacity="0.18"
        />
      ) : null}

      <path
        d="M103 279c18-14 38-22 57-22 22 0 42 8 59 23"
        fill="none"
        stroke="#fff8ed"
        strokeLinecap="round"
        strokeWidth="4"
        opacity="0.55"
      />
    </svg>
  );
}
