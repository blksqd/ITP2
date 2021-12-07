function FlightMap() {
    let countrySelect
    let rows
    let long
    let lat
    let land
    let country
    let distance
    let x
    let y
    let drawInit = false

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
        this.countrySelect = createSelect()
        this.countrySelect.position(350, 610)

        this.countrySelect.addClass('dropdown')
        this.countrySelect.parent('app')

        let lands = this.data.getColumn(2)
        let uniqueCountries = [...new Set(lands)]
        let countries = [...uniqueCountries]

        //assign data to drop-down menu
        for (i = 0; i < countries.length; i++) {
            this.countrySelect.option(countries[i])
        }
    }

    this.destroy = function () {
        this.countrySelect.remove()
    }

    this.draw = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded')
            return
        }
        if (!drawInit) {
            rows = this.data.getRows()
            for (var i = 0; i < rows.length; i++) {
                long = rows[i].getNum('from_long')
                lat = rows[i].getNum('from_lat')
                land = this.countrySelect.selected()
                country = rows[i].getString('from_country')
                distance = rows[i].getNum('distance')
                x = map(long, -180, 180, 0, width)
                y = map(lat, -90, 90, height, 0)
                //console.log(lat)
                if (country == land) {
                    fill(255, 0, 0, 70)
                } else {
                    fill(100, 0, 255, 15)
                }
                let radius = map(distance, 1, 15406, 4, 10)
                ellipse(x, y, radius, radius)
                drawInit = true
            }
        }
    }
}
