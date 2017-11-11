$(function(){
    var options={
        chart:{
            type:'column'
        },
        title:{
            text:"General Bar Chart"
        },
        xAxis: {
            categories: [
                'AL',
                'AR',
                'AZ',
                'CA',
                'CO',
                'CT',
                'DC',
                'DE',
                'FL',
                'GA',
                'IA',
                'ID',
                'IL',
                'IN',
                'KS',
                'KY',
                'LA',
                'MA',
                'MD',
                'ME',
                'MI',
                'MN',
                'MO',
                'MS',
                'MT',
                'NC',
                'ND',
                'NE',
                'NH',
                'NJ',
                'NM',
                'NV',
                'NY',
                'OH',
                'OK',
                'OR',
                'PA',
                'RI',
                'SC',
                'SD',
                'TN',
                'TX',
                'UT',
                'VA',
                'VT',
                'WA',
                'WI',
                'WV',
                'WY'
            ],
            crosshair: true
        },
        yAxis:{
            title: {
                text:null
            },
            plotLines: [{
                value: 0,
                width: 1,
            }]
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">State: {point.key}</span><table>',
            pointFormat: '<tr><td color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        series: []
    }
    var chart = new Highcharts.Chart('allstate_barchar',options);
    $.getJSON("jsonData/barChart_all_state.json",function(data){//获取Json文件,并创建Json对象
        $.each(data,function(i, field){     //遍历json数组
            chart.addSeries({       //每次添加一个Series
                type: 'column',
                name:'score',
                data:field.data
            });
        })
    });

})


