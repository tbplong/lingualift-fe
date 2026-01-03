export type PickupPayload = {
  userId: string;
  quizId: string;
  attemptId: string;
  title: string;
  category?: string;
  current: number; // 1-based current question
  questionsNo: number;
  answeredCount: number;
  remainingTime: number; // seconds
  updatedAt: number; // Date.now()
};

const key = (userId: string) => `pickup:${userId}`;

export function savePickup(p: PickupPayload) {
  try {
    localStorage.setItem(key(p.userId), JSON.stringify(p));
  } catch {
    // Silently ignore errors when clearing pickup data
  }
}

export function loadPickup(userId: string): PickupPayload | null {
  try {
    const raw = localStorage.getItem(key(userId));
    return raw ? (JSON.parse(raw) as PickupPayload) : null;
  } catch {
    return null;
  }
}

export function clearPickup(userId: string) {
  try {
    localStorage.removeItem(key(userId));
  } catch {
    // Silently ignore errors when clearing pickup data
  }
}

export function calcProgressPercent(
  answeredCount: number,
  questionsNo: number,
) {
  if (!questionsNo) return 0;
  return Math.max(
    0,
    Math.min(100, Math.round((answeredCount / questionsNo) * 100)),
  );
}
