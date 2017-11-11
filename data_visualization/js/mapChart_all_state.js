/*
TODO:
- Check data labels after drilling. Label rank? New positions?
- Not US Mainland text
- Separators
*/
var stateScore = {
    AL  :-0.001571285,
    AR  :3.47881045,
    AZ  :-0.082932403,
    CA  :1.412481923,
    CO  :3.113018742,
    CT  :2.080998724,
    DC  :6.207154294,
    DE  :1.012993046,
    FL  :4.135534654,
    GA  :2.019023856,
    IA  :3.830157889,
    ID  :6.082819593,
    IL  :1.535481026,
    IN  :3.120827554,
    KS  :3.483852684,
    KY  :1.253171434,
    LA  :4.755052603,
    MA  :2.853621475,
    MD  :3.942056021,
    ME  :3.181253462,
    MI  :2.342649192,
    MN  :3.172217508,
    MO  :4.105012834,
    MS  :0.656786895,
    MT  :4.468815046,
    NC  :2.035939678,
    ND  :4.965782704,
    NE  :3.411529186,
    NH  :2.768999758,
    NJ  :1.457464563,
    NM  :0.162186124,
    NV  :1.188126039,
    NY  :5.023746664,
    OH  :3.266841109,
    OK  :1.781410856,
    OR  :1.810653867,
    PA  :5.027351722,
    RI  :5.349386927,
    SC  :0.781571193,
    SD  :0.54976872,
    TN  :3.356775597,
    TX  :5.075649956,
    UT  :4.853666316,
    VA  :1.827468937,
    VT  :5.249305567,
    WA  :2.431672646,
    WI  :4.865116214,
    WV  :2.646435483,
    WY  :3.46720701
};

var data = Highcharts.geojson(Highcharts.maps['countries/us/us-all']),
    // Some responsiveness
    small = $('#allstate_map').width() < 400;

// Set drilldown pointers
$.each(data, function (i) {
    this.drilldown = this.properties['hc-key'];
    var postcode = this.properties['postal-code'];
    this.value = stateScore[postcode]; // Non-random bogus data
});

// Instanciate the map
Highcharts.mapChart('allstate_map', {
    chart: {
        events: {
            drilldown: function (e) {

                if (!e.seriesOptions) {
                    var chart = this,
                        mapKey = 'countries/us/' + e.point.drilldown + '-all',
                        // Handle error, the timeout is cleared on success
                        fail = setTimeout(function () {
                            if (!Highcharts.maps[mapKey]) {
                                chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);

                                fail = setTimeout(function () {
                                    chart.hideLoading();
                                }, 1000);
                            }
                        }, 3000);

                    // Show the spinner
                    chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                    // Load the drilldown map
                    $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function () {

                        data = Highcharts.geojson(Highcharts.maps[mapKey]);

                        // Set a non-random bogus value
                        $.each(data, function (i) {
                            this.value = i;
                        });

                        // Hide loading and add series
                        chart.hideLoading();
                        clearTimeout(fail);
                        chart.addSeriesAsDrilldown(e.point, {
                            name: e.point.name,
                            data: data,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        });
                    });
                }


                this.setTitle(null, { text: e.point.name });
            },
            drillup: function () {
                this.setTitle(null, { text: 'State' });
            }
        }
    },

    title: {
        text: 'General Map Chart'
    },

    subtitle: {
        text: 'State',
        floating: true,
        align: 'right',
        y: 50,
        style: {
            fontSize: '16px'
        }
    },

    legend: small ? {} : {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    colorAxis: {
        min: 0,
        minColor: '#e8eef4',
        maxColor: '#7cb5ec'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    plotOptions: {
        map: {
            states: {
                hover: {
                    color: '#EEDD66'
                }
            }
        }
    },

    series: [{
        data: data,
        name: 'State',
        dataLabels: {
            enabled: true,
            format: '{point.properties.postal-code}'
        }
    }],

    drilldown: {
        activeDataLabelStyle: {
            color: '#FFFFFF',
            textDecoration: 'none',
            textOutline: '1px #000000'
        },
        drillUpButton: {
            relativeTo: 'spacingBox',
            position: {
                x: 0,
                y: 60
            }
        }
    }
});