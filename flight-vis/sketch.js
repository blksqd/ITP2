function preload() {
    table = loadTable('data/flights.csv', 'csv', 'header')
}

function setup() {
    chart = new FlightMap()
    background(0)
    chart.setup()
    chart.drawMap()
}

function draw() {}
