function FlightMap() {
    let countrySelect

    this.name = 'FlightMap'
    this.id = 'flight-map'
    this.title = 'Campaign Data'
    this.loaded = false

    let long = []
    let lat = []
    let country = []
    let distance = []
    let rows

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

        noStroke()

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

        //extract data and push it to arrays
        rows = this.data.getRows()
        for (var i = 0; i < rows.length; i++) {
            long.push(rows[i].getNum('to_long'))
            lat.push(rows[i].getNum('from_lat'))
            country.push(rows[i].getString('from_country'))
            distance.push(rows[i].getNum('distance'))
        }
        console.log(long)
        console.log(lat)
    }

    this.destroy = function () {
        this.countrySelect.remove()
        long = []
        lat = []
        country = []
        distance = []
    }

    this.draw = function () {
        for (i = 0; i < rows.length; i++) {
            let x = floor(map(long[i], -180, 180, 0, width))
            let y = floor(map(lat[i], -90, 90, height, 0))
            let radius = map(distance[i], 1, 15406, 2, 10)

            if (country[i] == this.countrySelect.selected()) {
                fill(255, 255, 0, 70)
                ellipse(x, y, random(radius, random), radius)
            } else {
                fill(100, 0, 255, 45)
            }
            ellipse(x, y, radius, radius)
        }
    }
}
