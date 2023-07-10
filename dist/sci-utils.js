console.log("SCI Utilities!");
document.getElementById("calculate").onclick = async () => {
  let e = p(document.getElementById("metric").value), t = await f(e);
  document.getElementById("results").innerHTML = JSON.stringify(t, null, 4);
};
function p(e) {
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
        table: 1,
        fromRow: 2,
        toRow: 7,
        fromCol: 1,
        toCol: 2
      };
    case "gdppc":
      return {
        page: "List_of_continents_by_GDP",
        table: 2
      };
    case "gdppcpp":
      return {
        page: "List_of_continents_by_GDP",
        table: 3
      };
  }
}
async function f(e) {
  let t = "https://www.wikitable2json.com/api/" + e.page + "?table=" + e.table + "&lang=en&cleanRef=false", l = await fetch(t).then((o) => o.json().then((i) => i)), n = c(l[0], e.fromRow, e.toRow, e.fromCol, e.toCol);
  return u(m(n), e.title);
}
function u(e, t) {
  let l = {
    title: t
  };
  for (let n of e)
    l[n[0]] = {
      reale: n[1],
      persone: n[2]
    };
  return l;
}
function m(e) {
  let t = d(e, 1), l = t.reduce((a, s) => a + s, 0), n = document.getElementById("participants").value, o = Math.min(...t), i = t.map((a) => n * (a - o) / (l - o)), r = i.map((a) => Math.floor(a));
  for (; g(r, n) != 0; )
    r[_(i, r)] += 1;
  for (let a in e)
    e[a].push(r[a]);
  return e.unshift(["Total", l, n]), e;
}
function c(e, t, l, n, o) {
  return e.slice(t, l + 1).map((i) => i.slice(n, o + 1));
}
function d(e, t) {
  return c(e, 0, e.length, t, t + 1).map((l) => parseFloat(l[0].replace(",", ".")));
}
function g(e, t) {
  return t - e.reduce((l, n) => l + n, 0);
}
function _(e, t) {
  let l = [];
  for (let o = 0; o < e.length; o++)
    l.push(e[o] - t[o]);
  let n = Math.max(...l);
  return l.indexOf(n);
}
