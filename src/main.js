console.log('SCI Utilities!')

document.getElementById('calculate').onclick = async () => {
    let request = getRequest(document.getElementById('metric').value)
    let data = await getData(request)
    document.getElementById('results').innerHTML = JSON.stringify(data, null, 4)

}

// To update manually
function getRequest(metric) {
    switch (metric) {
        case 'gdp': return {
            page: 'List_of_continents_by_GDP',
            title: 'GDP in US Billions',
            table: 0,
            fromRow: 2,
            toRow: 7,
            fromCol: 1,
            toCol: 2
        }
        case 'gdppp': return {
            page: 'List_of_continents_by_GDP',
            title: 'GDP in US Billions (PPP Adjusted)',
            table: 1,
            fromRow: 2,
            toRow: 7,
            fromCol: 1,
            toCol: 2
        }
        case 'gdppc': return {
            page: 'List_of_continents_by_GDP',
            title: 'GDP Per Capita in US Dollars',
            table: 2,
            fromRow: 2,
            toRow: 7,
            fromCol: 1,
            toCol: 2
        }
        case 'gdppcpp': return {
            page: 'List_of_continents_by_GDP',
            title: 'GDP Per Capita in US Dollars (PPP Adjusted)',
            table: 3,
            fromRow: 2,
            toRow: 7,
            fromCol: 1,
            toCol: 2
        }
        case 'pop': return {
            page: 'List_of_continents_and_continental_subregions_by_population', 
            title: 'Population',
            table: 0, 
            fromRow: 2,
            toRow: 7,
            fromCol: 0,
            toCol: 1
        }
    }
}

async function getData(requestData) {
    let apiURL = 'https://www.wikitable2json.com/api/'+requestData.page+'?table='+requestData.table+'&lang=en&cleanRef=false'
    let response = await fetch(apiURL).then(r => r.json().then(d => d))
    let selectedResponse = slice2D(response[0], requestData.fromRow, requestData.toRow, requestData.fromCol, requestData.toCol)
    // console.log(selectedResponse)
    return jsonify(scaleData(selectedResponse), requestData.title)
}

function jsonify(table, title) {
    let json = {
        title: title
    }
    for (let continent of table) {
        json[continent[0]] = {
            reale: continent[1],
            persone: continent[2]
        } 
    }
    return json
}

function scaleData(continentList) {
    // Add total
    let dataToScale = getCol(continentList, 1)
    let total = dataToScale.reduce((s, n) => s + n, 0)
    let scaledTotal = document.getElementById('participants').value
    let onePerson = total / scaledTotal
    let min = Math.min(...dataToScale)
    let scaledData = dataToScale.map(n => (scaledTotal)*(n-min)/(total-min))
    let integerScaledData = scaledData.map(n => Math.round(n))

    while(sumCheck(integerScaledData, scaledTotal)!=0) {
        let smallestErrorSoFar = total
        let ii=0
        for(let i=0; i<integerScaledData.length; i++) {
            let error = Math.abs(scaledData[i] - onePerson*(integerScaledData[i]+1))
            if (error<smallestErrorSoFar) {
                smallestErrorSoFar = error
                ii = i
            }
        }
        integerScaledData[ii]+=1
    }
    for(let i in continentList) continentList[i].push(integerScaledData[i])
    continentList.unshift(['Total', total, scaledTotal])
    return continentList
}

function slice2D(array, fromRow, toRow, fromCol, toCol) {
    return array.slice(fromRow, toRow+1).map(i => i.slice(fromCol, toCol+1))
}

function getCol(array, col) {
    return slice2D(array, 0, array.length, col, col+1).map(n => parseInt(n[0].replaceAll(',', '')))
}

function sumCheck(scaledArray, scaledTotal) {
    return scaledTotal - scaledArray.reduce((s, n) => s + n, 0)
}