const start = document.getElementById('start');
const end = document.getElementById('end');

var date1 = new Date(2022, 12, 30, 9, 00, 00);
var date2 = new Date(2022, 12, 30, 18, 00, 00);
var rest = 1
var date3 = new Date(2022, 12, 31, 9, 00, 00);
var date4 = new Date(2022, 12, 31, 18, 00, 00);
var array = [[date1, date2, rest], [date3, date4, rest]]

//合計実働時間
var sumWorkTime = document.getElementById("sumWorkTime");
sumWorkTime.innerHTML = getSumWorkTime() ;
//月平均実働時間
let averageWorkTime = document.getElementById("averageWorkTime");
averageWorkTime.innerHTML = getAverageWorkTime() ;
//合計時間外労働時間
let sumOvertimeWorkTime = 0;
//月平均時間外労働時間
let averageOvertimeWorkTime = 0;


function getSumWorkTime(){
	var sum = 0
	for(i=0; i<array.length; i++){
		sum = sum + array[i][1].getTime()-array[i][0].getTime()-array[i][2]*60*60*1000
	}
	return sum/(1000 * 60 * 60)
}

function getAverageWorkTime(){
	var sum = getSumWorkTime();
	return sum/((end.getTime()-start.getTime())*60*60*1000)
}

function getSumOvertimeWorkTime(){
	var sum = 0;
	for(i=0; i<array.length; i++){
		overtimeworkPerDay = array[i][1].getTime()-array[i][0].getTime()-array[i][2]*60*60*1000-1000*60*60*9
		if(overtimeworkPerDay > 0){
			sum = sum + overtimeworkPerDay;
		}
	}
	return sum;
}

function getAverageOvertimeWorkTime(){
	var sum = getSumOvertimeWorkTime();
	return sum/((end.getTime()-start.getTime())*60*60*1000)
}