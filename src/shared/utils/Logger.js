class Logger {
  static debug(...args) {
    if (enableDebug) {
      console.log("%c[DBG]", "color: cyan;", ...args);
    }
  }

  static info(...args) {
    if (enableDebug) {
      console.log("%c[INF]", "color: green;", ...args);
    }
  }

  static warn(...args) {
    console.warn("%c[WRN]", "color: orange;", ...args);
  }

  static err(...args) {
    console.error("%c[ERR]", "color: red;", ...args);
  }

  static success(...args) {
    console.log("%c[SUCCESS]", "color: green; font-weight: bold;", ...args);
  }
}

export default Logger;
