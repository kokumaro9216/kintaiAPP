const start = document.getElementById('start');
const end = document.getElementById('end');
let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', bottunClick);

function diffMonth(d1, d2){
	let d1Month, d2Month;
   
	d1Month = d1.slice( 0, 4 ) * 12 + d1.slice(-2);
	d2Month = d2.slice( 0, 4 ) * 12 + d2.slice(-2);
   
	return d2Month - d1Month;
  }

function bottunClick(){
	msg.innerText = '開始 : ' + start.value + ' 終了 : ' + end.value + '期間 : ' + diffMonth(start.value, end.value);
	var sumWorkTime = document.getElementById("sumWorkTime");
	sumWorkTime.innerHTML = getSumWorkTime();
	var averageWorkTime = document.getElementById("averageWorkTime");
	averageWorkTime.innerHTML = getAverageWorkTime();
	var sumOvertimeWorkTime = document.getElementById("sumOvertimeWorkTime");
	sumOvertimeWorkTime.innerHTML = getSumOvertimeWorkTime();
	var averageOvertimeWorkTime = document.getElementById("averageOvertimeWorkTime");
	averageOvertimeWorkTime.innerHTML = getAverageOvertimeWorkTime();
  }

var date1 = new Date(2022, 12, 30, 9, 00, 00);
var date2 = new Date(2022, 12, 30, 18, 00, 00);
var rest = 1
var date3 = new Date(2022, 12, 31, 9, 00, 00);
var date4 = new Date(2022, 12, 31, 18, 00, 00);
var array = [[date1, date2, rest], [date3, date4, rest]]


function getSumWorkTime(){
	var sum = 0
	for(i=0; i<array.length; i++){
		sum = sum + array[i][1].getTime()-array[i][0].getTime()-array[i][2]*60*60*1000
	}
	return sum/(1000 * 60 * 60)
}

function getAverageWorkTime(){
	var sum = getSumWorkTime();
	return sum/(diffMonth(start.value, end.value))
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
	return sum/(diffMonth(start.value, end.value)*60*60*1000)
}