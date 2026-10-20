import type { GameDesignCard } from "../card/schema";
import { getHouseSkinForCard } from "../skin/houseSkins";

export type SkinImageKind = "marquee" | "side" | "attract";

export interface SkinSessionResult {
  marqueeUrl?: string;
  sideUrl?: string;
  attractUrl?: string;
  trimColor?: string;
  bodyColor?: string;
  imagesMs?: number;
}

export interface SkinSessionOptions {
  signal?: AbortSignal;
  onImageReady?: (kind: SkinImageKind, dataUrl: string) => void;
}

export async function runSkinSession(
  card: GameDesignCard,
  options?: SkinSessionOptions
): Promise<SkinSessionResult> {
  const signal = options?.signal;
  const onImageReady = options?.onImageReady;

  const bundle = getHouseSkinForCard(card);

  if (signal?.aborted) {
    return {};
  }

  // 1. Marquee
  if (bundle.marqueeDataUrl && onImageReady) {
    onImageReady("marquee", bundle.marqueeDataUrl);
  }

  await new Promise((resolve) => setTimeout(resolve, 150));
  if (signal?.aborted) return {};

  // 2. Side
  if (bundle.sideDataUrl && onImageReady) {
    onImageReady("side", bundle.sideDataUrl);
  }

  await new Promise((resolve) => setTimeout(resolve, 150));
  if (signal?.aborted) return {};

  // 3. Attract
  if (bundle.attractDataUrl && onImageReady) {
    onImageReady("attract", bundle.attractDataUrl);
  }

  return {
    marqueeUrl: bundle.marqueeDataUrl,
    sideUrl: bundle.sideDataUrl,
    attractUrl: bundle.attractDataUrl,
    trimColor: bundle.trim,
    bodyColor: bundle.body,
  };
}
