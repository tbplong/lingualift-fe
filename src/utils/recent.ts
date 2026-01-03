export type RecentAttemptItem = {
  id: string;
  quizId: string;
  title: string;
  scorePercent: number;
  timeText: string;
  updatedAt: number;
};

const recentKey = (userKey: string) => `recent:${userKey}`;

function toTimeText(ms: number) {
  const diff = Date.now() - ms;
  const min = Math.floor(diff / 60000);
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} hours ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "Yesterday" : `${d} days ago`;
}

function safeReadList(userKey: string): RecentAttemptItem[] {
  try {
    const raw = localStorage.getItem(recentKey(userKey));
    const list: RecentAttemptItem[] = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    // nếu data bẩn thì reset luôn cho sạch
    try {
      localStorage.removeItem(recentKey(userKey));
    } catch {
      // ignore error
    }
    return [];
  }
}

export function pushRecent(
  userKey: string,
  item: Omit<RecentAttemptItem, "timeText">,
) {
  const list = safeReadList(userKey);

  const next = [
    { ...item, timeText: toTimeText(item.updatedAt) },
    ...list.filter((x) => x.id !== item.id),
  ]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 10);

  try {
    localStorage.setItem(recentKey(userKey), JSON.stringify(next));
  } catch {
    // ignore error
  }
}

export function loadRecent(userKey: string): RecentAttemptItem[] {
  const list = safeReadList(userKey);
  return list.map((x) => ({ ...x, timeText: toTimeText(x.updatedAt) }));
}
