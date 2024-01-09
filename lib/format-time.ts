export const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedTime = `${hours !== 0 ? String(hours).padStart(2, '0')+'h:':''}${String(minutes).padStart(2, '0')}m:${String(seconds).padStart(2, '0')}s`;
  return formattedTime;
}