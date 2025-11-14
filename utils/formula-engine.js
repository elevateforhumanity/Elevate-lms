class FormulaEngine {
  constructor() {
    this.functions = {
      SUM: (...args) => args.reduce((a, b) => a + b, 0),
      AVERAGE: (...args) => args.reduce((a, b) => a + b, 0) / args.length,
      MIN: (...args) => Math.min(...args),
      MAX: (...args) => Math.max(...args),
      COUNT: (...args) => args.length,
      IF: (condition, trueVal, falseVal) => (condition ? trueVal : falseVal),
      ROUND: (num, decimals = 0) =>
        Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals),
      SQRT: (num) => Math.sqrt(num),
      POWER: (base, exp) => Math.pow(base, exp),
      ABS: (num) => Math.abs(num),
    };
  }

  evaluate(formula, context = {}) {
    try {
      if (!formula || !formula.startsWith('=')) return formula;
      let expr = formula.substring(1);
      expr = expr.replace(/([A-Z]+)(\d+)/g, (match, col, row) => {
        const cellRef = `${col}${row}`;
        return context[cellRef] !== undefined ? context[cellRef] : 0;
      });
      return eval(expr);
    } catch (error) {
      return `#ERROR: ${error.message}`;
    }
  }
}

module.exports = new FormulaEngine();
