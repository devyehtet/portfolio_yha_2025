const originalWarn = console.warn;

console.warn = (...args) => {
  const message = args
    .map((arg) => (typeof arg === "string" ? arg : String(arg)))
    .join(" ");

  if (message.includes("[baseline-browser-mapping]")) {
    return;
  }

  originalWarn(...args);
};
