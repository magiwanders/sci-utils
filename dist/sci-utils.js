function _(e) {
  let t = [];
  t.push(_tr({}, [
    _th({
      colspan: "3"
    }, e.title + " - One person is: " + e.Total.onePerson)
  ])), t.push(_tr({}, [
    _th({}, "Continent"),
    _th({}, "Actual number"),
    _th({}, "Preople in the game")
  ])), console.log(e);
  for (let o of Object.keys(e))
    o != "title" && t.push(_tr({}, [
      _th({}, o.toString()),
      _th({}, e[o].reale),
      _th({}, e[o].persone.toString())
    ]));
  return _table(
    { id: "resultsTable" },
    t
  );
}
console.log("SCI Utilities!");
document.getElementById("calculate").onclick = async () => {
  let e = m(document.getElementById("metric").value), t = await g(e);
  document.getElementById("results").innerHTML = "", document.getElementById("results").append(_(t));
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
    case "energy":
      return {
        page: "List_of_countries_by_electricity_consumption",
        title: "Energy consumption in exaJoule",
        table: 1,
        fromRow: 1,
        toRow: 6,
        fromCol: 0,
        toCol: 1
      };
    case "refugees":
      return {
        page: "List_of_countries_by_refugee_population",
        title: "Refugees or refugee-like population by hosting continent",
        table: 2,
        fromRow: 1,
        toRow: 6,
        fromCol: 0,
        toCol: 1
      };
  }
}
async function g(e) {
  let t = "https://www.wikitable2json.com/api/" + e.page + "?table=" + e.table + "&lang=en&cleanRef=false", o = await fetch(t).then((r) => r.json().then((i) => i)), l = f(o[0], e.fromRow, e.toRow, e.fromCol, e.toCol);
  return h(b(l), e.title);
}
function h(e, t) {
  let o = {
    title: t
  };
  for (let l of e)
    o[l[0]] = {
      reale: l[1].toString(),
      persone: parseFloat(l[2])
    }, l[0] == "Total" && (o.Total.onePerson = l[3]);
  return o;
}
function b(e) {
  let t = d(e, 1), o = t.reduce((n, c) => n + c, 0), l = document.getElementById("participants").value, r = o / l, i = Math.min(...t), p = t.map((n) => l * (n - i) / (o - i)), a = p.map((n) => Math.round(n));
  for (; w(a, l) != 0; ) {
    let n = o, c = 0;
    for (let s = 0; s < a.length; s++) {
      let u = Math.abs(p[s] - r * (a[s] + 1));
      u < n && (n = u, c = s);
    }
    a[c] += 1;
  }
  for (let n in e)
    e[n].push(a[n]);
  return e.unshift(["Total", o, l, r]), e;
}
function f(e, t, o, l, r) {
  return e.slice(t, o + 1).map((i) => i.slice(l, r + 1));
}
function d(e, t) {
  return f(e, 0, e.length, t, t + 1).map((o) => parseInt(o[0].replaceAll(",", "")));
}
function w(e, t) {
  return t - e.reduce((o, l) => o + l, 0);
}
