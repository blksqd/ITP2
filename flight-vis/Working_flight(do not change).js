let table
let countrySelect
let selected
let submit

function preload() {
    table = loadTable('flights.csv', 'csv', 'header')
}

function setup() {
    var canvas = createCanvas(900, 500)
    canvas.parent('app')
    noStroke()
    background(0)

    //----------------------------------------------------------------------//
    //Create DOM Elements
    //----------------------------------------------------------------------//

    countrySelect = createSelect()
    countrySelect.addClass('dropdown')

    submit = createButton('Submit')
    submit.addClass('btn')
    submit.parent('menu')

    flight = createButton('Density')
    flight.addClass('btn')
    flight.parent('menu')

    //----------------------------------------------------------------------//
    //clean data
    //----------------------------------------------------------------------//

    let lands = table.getColumn(2)
    let uniqueCountries = [...new Set(lands)]
    let countries = [...uniqueCountries]

    //assign data to drop-down menu
    for (i = 0; i < countries.length; i++) {
        countrySelect.option(countries[i])
    }
    countrySelect.parent('menu')
    countrySelect.changed(flightDraw)
}

function flightDraw() {
    clear()
    var rows = table.getRows()
    var land = countrySelect.selected()
    for (var i = 0; i < rows.length; i++) {
        var long = rows[i].getNum('from_long')
        var lat = rows[i].getNum('from_lat')
        var country = rows[i].getString('from_country')
        var distance = rows[i].getNum('distance')
        var x = map(long, -190, 190, 0, width)
        var y = map(lat, -90, 90, height, 0)

        if (country == land) {
            fill(255, 0, 0, 7)
        } else {
            fill(100, 0, 255, 15)
        }
        var radius = map(distance, 1, 15406, 2, 6)
        ellipse(x, y, radius, radius)
    }
}

function draw() {}
