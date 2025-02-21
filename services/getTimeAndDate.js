module.exports.TandD = () => {
  let d = new Date();
  return `${d.toDateString()} ${d.toLocaleTimeString()}`;
};
