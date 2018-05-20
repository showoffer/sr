const pow = Math.pow,
  floor = Math.floor,
  abs = Math.abs,
  log = Math.log;

function round(n, precision) {
  var prec = Math.pow(10, precision);
  return Math.round(n * prec) / prec;
}

export function format(n) {
  var base = floor(log(abs(n)) / log(1000));
  var suffix = "KMB"[base - 1];
  return suffix
    ? round(n / pow(1000, base), 1) + suffix
    : "" + (n === 0 ? n : n.toFixed(1));
}
