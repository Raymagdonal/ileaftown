export const generateHourlyVisitors = (start = 5, increment = 2, hours = 24) => {
  const arr = [];
  for (let h = 0; h < hours; h++) {
    arr.push(start + increment * h);
  }
  return arr;
};

// Returns current visitor count based on local hour of day (0-23)
export const getCurrentVisitors = ({ start = 5, increment = 2, now = new Date() } = {}) => {
  const hour = now.getHours();
  return start + increment * hour;
};

export default { generateHourlyVisitors, getCurrentVisitors };
