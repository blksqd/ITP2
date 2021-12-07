function FlightMap() {
    let countrySelect

    this.name = 'FlightMap'

    this.id = 'flight-map'

    this.title = 'Flight Map'

    this.loaded = false

    this.preload = function () {
        var self = this
        this.data = loadTable(
            './data/flight-info/flights.csv',
            'csv',
            'header',
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true
            }
        )
    }

    this.setup = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded')
            return
        }

        this.countrySelect = createSelect()
        this.countrySelect.position(350, 40)

        this.countrySelect.addClass('dropdown')
        this.countrySelect.parent('app')

        // submit = createButton('Submit')
        // submit.addClass('btn')
        // submit.parent('app')

        // flight = createButton('Density')
        // flight.addClass('btn')
        // flight.parent('app')

        let lands = this.data.getColumn(2)
        let uniqueCountries = [...new Set(lands)]
        let countries = [...uniqueCountries]

        //assign data to drop-down menu
        for (i = 0; i < countries.length; i++) {
            this.countrySelect.option(countries[i])
        }
        this.countrySelect.changed(this.draw)
    }

    this.destroy = function () {
        countrySelect.remove()
    }

    this.draw = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded')
            return
        }

        let rows = this.data.getRows()
        for (var i = 0; i < rows.length; i++) {
            let long = rows[i].getNum('from_long')
            let lat = rows[i].getNum('from_lat')
            let land = this.countrySelect.selected()
            let country = rows[i].getString('from_country')
            let distance = rows[i].getNum('distance')
            let x = map(long, -190, 190, 0, width)
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
