// src/utils/dashboardStats.ts

export type LocalStats = {
  timeThisWeekMin: number;
  completed: number;
  accuracyPercent: number;
};

// Hàm lấy key theo user để không bị lẫn lộn nếu đổi tài khoản
const getKey = (userId: string) => `stats:${userId}`;

export const loadLocalStats = (userId: string): LocalStats => {
  const data = localStorage.getItem(getKey(userId));
  if (!data) {
    return { timeThisWeekMin: 0, completed: 0, accuracyPercent: 0 };
  }
  return JSON.parse(data);
};

export const saveQuizStats = (
  userId: string,
  score: number,
  timeSpentMinutes: number,
) => {
  const current = loadLocalStats(userId);

  // 1. Tính số bài đã làm
  const newCompleted = current.completed + 1;

  // 2. Tính lại độ chính xác trung bình (Accuracy)
  // Công thức: ((Điểm cũ * số bài cũ) + Điểm mới) / số bài mới
  const currentTotalScore = current.accuracyPercent * current.completed;
  const newAccuracy = Math.round((currentTotalScore + score) / newCompleted);

  // 3. Cộng dồn thời gian (Time)
  const newTime = current.timeThisWeekMin + timeSpentMinutes;

  const newStats: LocalStats = {
    completed: newCompleted,
    accuracyPercent: newAccuracy,
    timeThisWeekMin: newTime, // Làm tròn nếu cần
  };

  // Lưu xuống LocalStorage
  localStorage.setItem(getKey(userId), JSON.stringify(newStats));

  // Bắn tín hiệu để Dashboard biết mà cập nhật ngay lập tức
  window.dispatchEvent(new Event("stats:changed"));
};
