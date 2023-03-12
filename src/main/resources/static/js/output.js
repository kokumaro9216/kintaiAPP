var start = document.getElementById('start');
var end = document.getElementById('end');
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
	var endValue = end.value;
	var endYear = endValue.substr(0,4)
	var endMonth = endValue.substr(5)
	var startYear = start.value.substr( 0, 4 )
	var startMonth = start.value.substr( 5 )
	var startDate = new Date(startYear, startMonth -1, "01")
	var endDate = new Date(endYear, endMonth, "01") -1
	var array = getDBData(startDate, endDate);
	var sumWorkTime = document.getElementById("sumWorkTime");
	sumWorkTime.innerHTML = getSumWorkTime(array);
	var averageWorkTime = document.getElementById("averageWorkTime");
	averageWorkTime.innerHTML = getAverageWorkTime(array);
	var sumOvertimeWorkTime = document.getElementById("sumOvertimeWorkTime");
	sumOvertimeWorkTime.innerHTML = getSumOvertimeWorkTime(array);
	var averageOvertimeWorkTime = document.getElementById("averageOvertimeWorkTime");
	averageOvertimeWorkTime.innerHTML = getAverageOvertimeWorkTime(array);
	generate_table(array);
  }

  //DBから入力された期間の出勤情報を取得する
  function getDBData(startDate, endDate){
	var date1 = new Date(2022, 12, 30, 9, 00, 00);
	var date2 = new Date(2022, 12, 30, 18, 00, 00);
	var rest = 1
	var bikou1 = "備考1"
	var date3 = new Date(2022, 12, 31, 9, 00, 00);
	var date4 = new Date(2022, 12, 31, 18, 00, 00);
	var bikou2 = "備考2"
	var array = [[date1, date2, rest, bikou1], [date3, date4, rest, bikou2]]
	return array
  }

function getSumWorkTime(array){
	var sum = 0
	for(i=0; i<array.length; i++){
		sum = sum + array[i][1].getTime()-array[i][0].getTime()-array[i][2]*60*60*1000
	}
	return sum/(1000 * 60 * 60)
}

function getAverageWorkTime(array){
	var sum = getSumWorkTime(array);
	return sum/(diffMonth(start.value, end.value))
}

function getSumOvertimeWorkTime(array){
	var sum = 0;
	for(i=0; i<array.length; i++){
		overtimeworkPerDay = array[i][1].getTime()-array[i][0].getTime()-array[i][2]*60*60*1000-1000*60*60*9
		if(overtimeworkPerDay > 0){
			sum = sum + overtimeworkPerDay;
		}
	}
	return sum;
}

function getAverageOvertimeWorkTime(array){
	var sum = getSumOvertimeWorkTime(array);
	return sum/(diffMonth(start.value, end.value)*60*60*1000)
}

function generate_table(array) {
	// body の参照を取得
	var body = document.getElementsByTagName("body")[0];
  
	// <table> 要素と <tbody> 要素を作成
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	var row = document.createElement("tr");
	var cell = document.createElement("td");
		var cellText = document.createTextNode("日時");
		cell.appendChild(cellText);
		row.appendChild(cell);
		var cell = document.createElement("td");
		var cellText = document.createTextNode("出勤時間");
		cell.appendChild(cellText);
		row.appendChild(cell);
		var cell = document.createElement("td");
		var cellText = document.createTextNode("退勤時間");
		cell.appendChild(cellText);
		row.appendChild(cell);
		var cell = document.createElement("td");
		var cellText = document.createTextNode("休憩時間");
		cell.appendChild(cellText);
		row.appendChild(cell);
		var cell = document.createElement("td");
		var cellText = document.createTextNode("備考");
		cell.appendChild(cellText);
		row.appendChild(cell);
  
	  // 表の本体の末尾に行を追加
	  tblBody.appendChild(row);
  
	// すべてのセルを作成
	array.forEach (function(arrayElement) {
	  // 表の行を作成
	  var row = document.createElement("tr");
	  var formattedDate = `
	  ${arrayElement[0].getFullYear()}-
	  ${arrayElement[0].getMonth()+1}-
	  ${arrayElement[0].getDate()}
	  `.replace(/\n|\r/g, '');
		var cell = document.createElement("td");
		var cellText = document.createTextNode(formattedDate);
		cell.appendChild(cellText);
		row.appendChild(cell);
		var cell = document.createElement("td");
		var cellText = document.createTextNode(arrayElement[0].getHours()+":"+arrayElement[0].getMinutes());
		cell.appendChild(cellText);
		row.appendChild(cell);
		var cell = document.createElement("td");
		var cellText = document.createTextNode(arrayElement[1].getHours()+":"+arrayElement[1].getMinutes());
		cell.appendChild(cellText);
		row.appendChild(cell);
		var cell = document.createElement("td");
		var cellText = document.createTextNode(arrayElement[2]);
		cell.appendChild(cellText);
		row.appendChild(cell);
		var cell = document.createElement("td");
		var cellText = document.createTextNode(arrayElement[3]);
		cell.appendChild(cellText);
		row.appendChild(cell);
  
	  // 表の本体の末尾に行を追加
	  tblBody.appendChild(row);
	});
  
	// <tbody> を <table> の中に追加
	tbl.appendChild(tblBody);
	// <table> を <body> の中に追加
	body.appendChild(tbl);
	tbl.setAttribute("border", "1");
  }