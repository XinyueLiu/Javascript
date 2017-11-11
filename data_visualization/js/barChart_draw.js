var state_global = "";
var chart = null;
function redrawMap(state){
	state_global = state;
	var options={
        chart:{
            type:'column'
        },
        title:{
            text: state + " chart"
        },
        xAxis: {
            categories: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8'
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
         plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<span style="font-size:10px">Score: {point.y:.1f}</span>',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">id: {point.key}</span><table>',
            pointFormat: '<tr><td color:{series.color};padding:0">proportion: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        series: []
    };

    chart = new Highcharts.Chart('allstate_barchar',options);
    var currState = new Array();
    $.getJSON("jsonData/join_state.json",function(data){//获取Json文件,并创建Json对象
        $.each(data,function(i, field){     //遍历json数组
        	if(field.state_abb == state){
        		currState.push(field.proportions);
        	}
            
        });
        chart.addSeries({       //每次添加一个Series
        			type: 'column',
	                data: currState,
	                // colorByPoint: true,
	                showInLegend: false
        });
    });
	// Set type
    $.each(['line', 'column', 'spline', 'area', 'areaspline', 'scatter', 'pie'], function (i, type) {
        $('#' + type).click(function () {
                chart.series[0].update({
                    type: type
                });
        });
    });

}


function addProperties(proporty){
	var options={
        chart:{
            type:'column'
        },
        title:{
            text: state_global + " " + proporty + " chart"
        },
        xAxis: {
            categories: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8'
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
         plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<span style="font-size:10px">{point.y:.1f}</span>',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">id: {point.key}</span><table>',
            pointFormat: '<tr><td color:{series.color};padding:0">'+proporty+': </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        series: []
    };

    chart = new Highcharts.Chart('allstate_barchar',options);
    
	var currState = new Array();
    $.getJSON("jsonData/join_state.json",function(data){//获取Json文件,并创建Json对象
        $.each(data,function(i, field){     //遍历json数组
        	if(field.state_abb == state_global){
        		currState.push(field[proporty]);
        	}
            
        });
        chart.addSeries({       //每次添加一个Series
        			type: 'column',
	                data: currState,
	                // colorByPoint: true,
	                showInLegend: false
        });
    });
	// Set type
    $.each(['line', 'column', 'spline', 'area', 'areaspline', 'scatter', 'pie'], function (i, type) {
        $('#' + type).click(function () {
                chart.series[0].update({
                    type: type
                });
        });
    });

}