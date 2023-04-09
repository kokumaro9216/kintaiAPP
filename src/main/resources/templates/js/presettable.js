var mytable = document.getElementById("presetTbl");

// JavaScriptで以下json形式を元にプリセットをテーブル表示する
const presetTableDate = {
        tableDate: [{
                "startTime": "09:00",
                "endTime": "18:00",
                "restTime": "01:00",
                "remarks": "残業なし",
                "presetName": "早出勤務"
            },
            {
                "startTime": "10:00",
                "endTime": "19:00",
                "restTime": "01:00",
                "remarks": "残業なし",
                "presetName": "通常勤務",
            },
            {
                "startTime": "10:00",
                "endTime": "19:00",
                "restTime": "01:00",
                "remarks": "残業なし",
                "presetName": "通常勤務",
            }
        ]
    }
    //alert(mytable);

for (var i in presetTableDate.tableDate) {

    var ch = Object.assign(document.createElement('input'), { type: "checkbox", name: "ch", value: i });
    var mytr = mytable.insertRow(1 + parseInt(i)); // 表を1行追加

    //thセルの追加
    var myth = document.createElement("th");
    myth.innerHTML = " ";
    mytr.appendChild(myth);

    //tdセルの追加
    var mycell0 = mytr.insertCell(0).appendChild(ch);
    var mycell1 = mytr.insertCell(1);
    var mycell2 = mytr.insertCell(2);
    var mycell3 = mytr.insertCell(3);
    var mycell4 = mytr.insertCell(4);
    var mycell5 = mytr.insertCell(5);

    //textContentでもいいしinnnerHTMLでもいい
    //mycell0.textContent = mycell0.appendChild(ch);
    mycell1.textContent = presetTableDate.tableDate[i].startTime;
    mycell2.textContent = presetTableDate.tableDate[i].endTime;
    mycell3.textContent = presetTableDate.tableDate[i].restTime;
    mycell4.textContent = presetTableDate.tableDate[i].remarks;
    mycell5.textContent = presetTableDate.tableDate[i].presetName;
}