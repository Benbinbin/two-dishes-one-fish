function formatTime(value) {
  const time = new Date(value);
  return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`;
}

export default formatTime;