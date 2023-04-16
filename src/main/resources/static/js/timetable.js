var mytable = document.getElementById("tbl");

// JavaScriptで以下json形式を元に勤怠をテーブル表示する
const timeTableDate = {
    tableDate: [{
            "date": "12/01",
            "week": "木",
            "startTime": "09:00",
            "endTime": "18:00",
            "restTime": "01:00",
            "workTime": "08:00",
            "overTime": "00:00",
            "remarks": ""
        },
        {
            "date": "12/02",
            "week": "金",
            "startTime": "09:00",
            "endTime": "19:00",
            "restTime": "01:00",
            "workTime": "09:00",
            "overTime": "01:00",
            "remarks": "残業あり"
        },
        {
            "date": "12/05",
            "week": "月",
            "startTime": "09:00",
            "endTime": "19:00",
            "restTime": "01:00",
            "workTime": "09:00",
            "overTime": "01:00",
            "remarks": "残業あり"
        }
    ]
}
for (var i in timeTableDate.tableDate) {
    var mytr = mytable.insertRow(1 + parseInt(i)); // 表を1行追加

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

    //textContentでもいいしinnnerHTMLでもいい
    mycell1.textContent = timeTableDate.tableDate[i].date;
    mycell2.textContent = timeTableDate.tableDate[i].week;
    mycell3.textContent = timeTableDate.tableDate[i].startTime;
    mycell4.textContent = timeTableDate.tableDate[i].endTime;
    mycell5.textContent = timeTableDate.tableDate[i].restTime;
    mycell6.textContent = timeTableDate.tableDate[i].workTime;
    mycell7.textContent = timeTableDate.tableDate[i].overTime;
    mycell8.textContent = timeTableDate.tableDate[i].remarks;

}