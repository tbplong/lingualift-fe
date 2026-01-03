export type RecentAttemptItem = {
  id: string;
  quizId: string;
  title: string;
  scorePercent: number;
  timeText: string;
  updatedAt: number;
};

const key = (userKey: string) => `recent:${userKey}`;

function toTimeText(ms: number) {
  const diff = Date.now() - ms;
  const min = Math.floor(diff / 60000);
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} hours ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "Yesterday" : `${d} days ago`;
}

export function pushRecent(
  userKey: string,
  item: Omit<RecentAttemptItem, "timeText">,
) {
  const raw = localStorage.getItem(key(userKey));
  const list: RecentAttemptItem[] = raw ? JSON.parse(raw) : [];

  const next = [
    { ...item, timeText: toTimeText(item.updatedAt) },
    ...list.filter((x) => x.id !== item.id),
  ]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 10);

  localStorage.setItem(key(userKey), JSON.stringify(next));
}

export function loadRecent(userKey: string): RecentAttemptItem[] {
  const raw = localStorage.getItem(key(userKey));
  const list: RecentAttemptItem[] = raw ? JSON.parse(raw) : [];
  return list.map((x) => ({ ...x, timeText: toTimeText(x.updatedAt) }));
}
