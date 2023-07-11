
export function Table(data) {
    let rows = []
    rows.push(_tr({},[
        _th({
            colspan: "3"
        }, data.title+' - One person is: '+data['Total'].onePerson)
    ]))

    rows.push(_tr({},[
        _th({}, 'Continent'),
        _th({}, 'Actual number'),
        _th({}, 'Preople in the game')
    ]))

    console.log(data)

    for(let continent of Object.keys(data)) {
        if(continent!='title') {
            rows.push(_tr({},[
                _th({}, continent.toString()),
                _th({}, data[continent].reale),
                _th({}, data[continent].persone.toString())
            ]))
        }
    }

    return _table(
        {id: 'resultsTable'},
        rows
    )
}