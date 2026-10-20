import type { GameDesignCard } from "../card/schema";
import type { GenreName } from "../card/presets";

export interface BuildStageItem {
  id: string;
  status: "pending" | "active" | "done" | "failed";
  label?: string;
}

export type BuildSessionState =
  | "IDLE"
  | "RUNNING"
  | "READY"
  | "FALLBACK"
  | "FETCHING_CART"
  | "VERIFYING"
  | "RETRYING"
  | "DONE"
  | "FAILED"
  | "CANCELLED";

export interface BuildSnapshot {
  state: BuildSessionState;
  stages: BuildStageItem[];
  pct: number;
  elapsedSeconds: number;
  isFallback: boolean;
  fallbackReason?: string | null;
  cartSource: string | null;
  houseCartSource: string | null;
  error: string | null;
}

const houseCache = new Map<string, string>();

export async function loadHouseGameSource(genre: GenreName = "runner"): Promise<string> {
  const key = genre || "runner";
  if (houseCache.has(key)) {
    return houseCache.get(key)!;
  }

  const url = `/house-games/${encodeURIComponent(key)}.js`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch house game: ${res.statusText}`);
    }
    const text = await res.text();
    houseCache.set(key, text);
    return text;
  } catch (err) {
    console.warn(`[loadHouseGameSource] Could not load ${url}, falling back to minimal runtime stub`, err);
    const stub = `export function create(engine) {
      return {
        update(dt) {},
        render(g) {
          g.cls(2);
          g.text("GAME LOAD FAILED", 80, 95, 7);
        }
      };
    }`;
    return stub;
  }
}

export interface BuildSessionOptions {
  onUpdate?: (snap: BuildSnapshot) => void;
}

export class BuildSession {
  public interactionId: string | null = null;
  public environmentId: string | null = null;

  private card: GameDesignCard;
  private onUpdate?: (snap: BuildSnapshot) => void;
  private isCancelled = false;
  private currentSnapshot: BuildSnapshot;

  constructor(card: GameDesignCard, options?: BuildSessionOptions) {
    this.card = card;
    this.onUpdate = options?.onUpdate;
    this.interactionId = `build-${Date.now()}`;
    this.environmentId = "env-local";

    this.currentSnapshot = {
      state: "IDLE",
      stages: [
        { id: "coding", status: "pending", label: "Writing code" },
        { id: "playtest", status: "pending", label: "Playtesting" },
        { id: "cartridge", status: "pending", label: "Burning cartridge" },
      ],
      pct: 0,
      elapsedSeconds: 0,
      isFallback: false,
      fallbackReason: null,
      cartSource: null,
      houseCartSource: null,
      error: null,
    };
  }

  private notify(snap: Partial<BuildSnapshot>) {
    this.currentSnapshot = { ...this.currentSnapshot, ...snap };
    this.onUpdate?.(this.currentSnapshot);
  }

  async start(options?: { runSkin?: boolean; timeoutMs?: number }): Promise<BuildSnapshot> {
    if (this.isCancelled) {
      return { ...this.currentSnapshot, state: "CANCELLED" };
    }

    const houseSource = await loadHouseGameSource(this.card.genre);
    this.currentSnapshot.houseCartSource = houseSource;
    this.currentSnapshot.cartSource = houseSource;

    this.notify({
      state: "RUNNING",
      pct: 15,
      elapsedSeconds: 1,
      stages: [
        { id: "coding", status: "active", label: "Writing code" },
        { id: "playtest", status: "pending", label: "Playtesting" },
        { id: "cartridge", status: "pending", label: "Burning cartridge" },
      ],
    });

    await new Promise((r) => setTimeout(r, 600));
    if (this.isCancelled) return { ...this.currentSnapshot, state: "CANCELLED" };

    this.notify({
      pct: 50,
      elapsedSeconds: 2,
      stages: [
        { id: "coding", status: "done", label: "Writing code" },
        { id: "playtest", status: "active", label: "Playtesting" },
        { id: "cartridge", status: "pending", label: "Burning cartridge" },
      ],
    });

    await new Promise((r) => setTimeout(r, 700));
    if (this.isCancelled) return { ...this.currentSnapshot, state: "CANCELLED" };

    this.notify({
      pct: 85,
      elapsedSeconds: 3,
      stages: [
        { id: "coding", status: "done", label: "Writing code" },
        { id: "playtest", status: "done", label: "Playtesting" },
        { id: "cartridge", status: "active", label: "Burning cartridge" },
      ],
    });

    await new Promise((r) => setTimeout(r, 500));
    if (this.isCancelled) return { ...this.currentSnapshot, state: "CANCELLED" };

    const finalSnap: BuildSnapshot = {
      ...this.currentSnapshot,
      state: "READY",
      pct: 100,
      elapsedSeconds: 4,
      stages: [
        { id: "coding", status: "done", label: "Writing code" },
        { id: "playtest", status: "done", label: "Playtesting" },
        { id: "cartridge", status: "done", label: "Burning cartridge" },
      ],
    };
    this.notify(finalSnap);
    return finalSnap;
  }

  async cancel(): Promise<void> {
    this.isCancelled = true;
    this.notify({ state: "CANCELLED" });
  }

  async cleanup(): Promise<void> {
    this.isCancelled = true;
  }
}
