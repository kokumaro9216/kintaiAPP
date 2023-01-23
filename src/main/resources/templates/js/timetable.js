var mytable = document.getElementById("tbl");

// JavaScriptオブジェクトへ変換
//let objData = JSON.parse(jsonData);
// JavaScriptオブジェクト※今はべた書き

// const timeTableDate = {
//     tableDate: [{
//             "date": "12/01",
//             "week": "木",
//             "startTime": "09:00",
//             "endTime": "18:00",
//             "restTime": "01:00",
//             "workTime": "08:00",
//             "overTime": "00:00",
//             "remarks": ""
//         },
//         {
//             "date": "12/02",
//             "week": "金",
//             "startTime": "09:00",
//             "endTime": "19:00",
//             "restTime": "01:00",
//             "workTime": "09:00",
//             "overTime": "01:00",
//             "remarks": "残業あり"
//         }
//     ]
// }
// const values = Object.values(tableDate);
// for (var key in obj) {
//     console.log(obj[key]);
// }
//1つ目のやり方
var mytr = mytable.insertRow(1); //引数1 : 表の1行目に追加

//thセルの追加
var myth = document.createElement("th");
myth.innerHTML = " ";
mytr.appendChild(myth);

//tdセルの追加
var mycell1 = mytr.insertCell(1);
var mycell2 = mytr.insertCell(2);
var mycell3 = mytr.insertCell(3);
var mycell4 = mytr.insertCell(4);
var mycell5 = mytr.insertCell(5);
var mycell6 = mytr.insertCell(6);
var mycell7 = mytr.insertCell(7);
var mycell8 = mytr.insertCell(8);

//textContentでもいいしinnnerHTMLでもいいし
mycell1.textContent = "12/01";
mycell2.textContent = "木";
mycell3.textContent = "09:00";
mycell4.textContent = "18:00";
mycell5.textContent = "01:00";
mycell6.textContent = "08:00";
mycell7.textContent = "0:00";
mycell8.textContent = "";