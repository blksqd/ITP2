function FlightMap() {
    let countrySelect

    this.setup = function () {
        canvasContainer = select('#app')
        var canvas = createCanvas(1000, 500)
        canvas.parent('app')

        countrySelect = createSelect()
        countrySelect.addClass('dropdown')
        countrySelect.parent('app')

        submit = createButton('Submit')
        submit.addClass('btn')
        submit.parent('app')

        flight = createButton('Density')
        flight.addClass('btn')
        flight.parent('app')

        let lands = table.getColumn(2)
        let uniqueCountries = [...new Set(lands)]
        let countries = [...uniqueCountries]

        //assign data to drop-down menu
        for (i = 0; i < countries.length; i++) {
            countrySelect.option(countries[i])
        }
        countrySelect.changed(this.drawMap)
    }

    this.drawMap = function () {
        let rows = table.getRows()
        for (var i = 0; i < rows.length; i++) {
            let long = rows[i].getNum('from_long')
            let lat = rows[i].getNum('from_lat')
            let land = countrySelect.selected()
            let country = rows[i].getString('from_country')
            let distance = rows[i].getNum('distance')
            let x = map(long, -180, 180, 0, width)
            let y = map(lat, -90, 90, height, 0)
            //console.log(lat)
            if (country == land) {
                fill(255, 0, 0, 70)
            } else {
                fill(100, 0, 255, 15)
            }
            let radius = map(distance, 1, 15406, 4, 10)
            ellipse(x, y, radius, radius)
        }
    }
}
