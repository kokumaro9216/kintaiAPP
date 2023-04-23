const start = document.getElementById('start');
const end = document.getElementById('end');
const checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', bottunClick);




function diffMonth(d1, d2){
	const d1Month = d1.slice( 0, 4 ) * 12 + d1.slice(-2);
	const d2Month = d2.slice( 0, 4 ) * 12 + d2.slice(-2);
   
	return d2Month - d1Month;
  }

function bottunClick(){
	msg.innerText = '開始 : ' + start.value + ' 終了 : ' + end.value + '期間 : ' + diffMonth(start.value, end.value);
	const endValue = end.value;
	const endYear = endValue.substr(0,4)
	const endMonth = endValue.substr(5)
	const startYear = start.value.substr( 0, 4 )
	const startMonth = start.value.substr( 5 )
	const startDate = new Date(startYear, startMonth -1, "01")
	const endDate = new Date(endYear, endMonth, "01") -1
	console.log("a")
	const array = getDBData(startDate, endDate);
	console.log("b")
	console.log(array[0][0])
	const sumWorkTime = document.getElementById("sumWorkTime");
	sumWorkTime.innerHTML = getSumWorkTime(array);
	const averageWorkTime = document.getElementById("averageWorkTime");
	averageWorkTime.innerHTML = getAverageWorkTime(array);
	const sumOvertimeWorkTime = document.getElementById("sumOvertimeWorkTime");
	sumOvertimeWorkTime.innerHTML = getSumOvertimeWorkTime(array);
	const averageOvertimeWorkTime = document.getElementById("averageOvertimeWorkTime");
	averageOvertimeWorkTime.innerHTML = getAverageOvertimeWorkTime(array);
	generate_table(array);
  }

  //DBから入力された期間の出勤情報を取得する
  function getDBData(startDate, endDate){
	// const date1 = new Date(2022, 12, 30, 9, 00, 00);
	// const date2 = new Date(2022, 12, 30, 18, 00, 00);
	// const rest = 1
	// const bikou1 = "備考1"
	// const date3 = new Date(2022, 12, 31, 9, 00, 00);
	// const date4 = new Date(2022, 12, 31, 18, 00, 00);
	// const bikou2 = "備考2"
	// const array = [[date1, date2, rest, bikou1], [date3, date4, rest, bikou2]]
	//Jsonを仮に定義

	const data1 = {date:"2023/03/01",
	start:"09:00:00",
	end:"19:00:00",
	rest:"1",
	bikou:"備考"};

	const data2 = {date:"2023/03/02",
	start:"09:00:00",
	end:"20:30:00",
	rest:"1.5",
	bikou:"備考2"};

	const arrayData = [data1, data2];

	const arrayDateData = new Array();
	for(i=0; i<arrayData.length; i++){
		var tempStart = new Date(arrayData[i].date + " " + arrayData[i].start);
		var tempEnd = new Date(arrayData[i].date + " " + arrayData[i].end);
		const array = [tempStart, tempEnd, arrayData[i].rest, arrayData[i].bikou];
		arrayDateData.push(array);
	}

	return arrayDateData
  }

function getSumWorkTime(array){
	var sum = 0
	for(i=0; i<array.length; i++){
		sum = sum + array[i][1].getTime()-array[i][0].getTime()-array[i][2]*60*60*1000
	}
	return sum/(1000 * 60 * 60)
}

function getAverageWorkTime(array){
	const sum = getSumWorkTime(array);
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
	const sum = getSumOvertimeWorkTime(array);
	return sum/(diffMonth(start.value, end.value)*60*60*1000)
}

function generate_table(array) {
	// body の参照を取得
	const body = document.getElementsByTagName("body")[0];
  
	// <table> 要素と <tbody> 要素を作成
	const tbl = document.createElement("table");
	const tblBody = document.createElement("tbody");
	const row = document.createElement("tr");
	var cell = document.createElement("td");
		var cellText = document.createTextNode("日時");
		cell.appendChild(cellText);
		row.appendChild(cell);
		cell = document.createElement("td");
		cellText = document.createTextNode("出勤時間");
		cell.appendChild(cellText);
		row.appendChild(cell);
		cell = document.createElement("td");
		cellText = document.createTextNode("退勤時間");
		cell.appendChild(cellText);
		row.appendChild(cell);
		cell = document.createElement("td");
		 cellText = document.createTextNode("休憩時間");
		cell.appendChild(cellText);
		row.appendChild(cell);
		 cell = document.createElement("td");
		 cellText = document.createTextNode("備考");
		cell.appendChild(cellText);
		row.appendChild(cell);
  
	  // 表の本体の末尾に行を追加
	  tblBody.appendChild(row);
  
	// すべてのセルを作成
	array.forEach (function(arrayElement) {
	  // 表の行を作成
	  const row = document.createElement("tr");
	  const formattedDate = `
	  ${arrayElement[0].getFullYear()}-
	  ${arrayElement[0].getMonth()+1}-
	  ${arrayElement[0].getDate()}
	  `.replace(/\n|\r/g, '');
		 cell = document.createElement("td");
		 cellText = document.createTextNode(formattedDate);
		cell.appendChild(cellText);
		row.appendChild(cell);
		 cell = document.createElement("td");
		 cellText = document.createTextNode(arrayElement[0].getHours()+":"+arrayElement[0].getMinutes());
		cell.appendChild(cellText);
		row.appendChild(cell);
		 cell = document.createElement("td");
		 cellText = document.createTextNode(arrayElement[1].getHours()+":"+arrayElement[1].getMinutes());
		cell.appendChild(cellText);
		row.appendChild(cell);
		 cell = document.createElement("td");
		 cellText = document.createTextNode(arrayElement[2]);
		cell.appendChild(cellText);
		row.appendChild(cell);
		 cell = document.createElement("td");
		 cellText = document.createTextNode(arrayElement[3]);
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

