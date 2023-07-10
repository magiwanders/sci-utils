console.log("SCI Utilities!");
document.getElementById("calculate").onclick = async () => {
  let e = m(document.getElementById("metric").value), t = await d(e);
  document.getElementById("results").innerHTML = JSON.stringify(t, null, 4);
};
function m(e) {
  switch (e) {
    case "gdp":
      return {
        page: "List_of_continents_by_GDP",
        title: "GDP in US Billions",
        table: 0,
        fromRow: 2,
        toRow: 7,
        fromCol: 1,
        toCol: 2
      };
    case "gdppp":
      return {
        page: "List_of_continents_by_GDP",
        title: "GDP in US Billions (PPP Adjusted)",
        table: 1,
        fromRow: 2,
        toRow: 7,
        fromCol: 1,
        toCol: 2
      };
    case "gdppc":
      return {
        page: "List_of_continents_by_GDP",
        title: "GDP Per Capita in US Dollars",
        table: 2,
        fromRow: 2,
        toRow: 7,
        fromCol: 1,
        toCol: 2
      };
    case "gdppcpp":
      return {
        page: "List_of_continents_by_GDP",
        title: "GDP Per Capita in US Dollars (PPP Adjusted)",
        table: 3,
        fromRow: 2,
        toRow: 7,
        fromCol: 1,
        toCol: 2
      };
    case "pop":
      return {
        page: "List_of_continents_and_continental_subregions_by_population",
        title: "Population",
        table: 0,
        fromRow: 2,
        toRow: 7,
        fromCol: 0,
        toCol: 1
      };
  }
}
async function d(e) {
  let t = "https://www.wikitable2json.com/api/" + e.page + "?table=" + e.table + "&lang=en&cleanRef=false", o = await fetch(t).then((i) => i.json().then((a) => a)), l = u(o[0], e.fromRow, e.toRow, e.fromCol, e.toCol);
  return g(_(l), e.title);
}
function g(e, t) {
  let o = {
    title: t
  };
  for (let l of e)
    o[l[0]] = {
      reale: l[1],
      persone: l[2]
    };
  return o;
}
function _(e) {
  let t = w(e, 1), o = t.reduce((n, c) => n + c, 0), l = document.getElementById("participants").value, i = o / l, a = Math.min(...t), p = t.map((n) => l * (n - a) / (o - a)), r = p.map((n) => Math.round(n));
  for (; P(r, l) != 0; ) {
    let n = o, c = 0;
    for (let s = 0; s < r.length; s++) {
      let f = Math.abs(p[s] - i * (r[s] + 1));
      f < n && (n = f, c = s);
    }
    r[c] += 1;
  }
  for (let n in e)
    e[n].push(r[n]);
  return e.unshift(["Total", o, l]), e;
}
function u(e, t, o, l, i) {
  return e.slice(t, o + 1).map((a) => a.slice(l, i + 1));
}
function w(e, t) {
  return u(e, 0, e.length, t, t + 1).map((o) => parseInt(o[0].replaceAll(",", "")));
}
function P(e, t) {
  return t - e.reduce((o, l) => o + l, 0);
}
