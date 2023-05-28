const columnOrder = ['startTime', 'endTime', 'restTime', 'remarks', 'presetName']

class Preset {
    constructor(presetName, startTime, endTime, restTime, remarks) {
        this.presetName = presetName
        this.startTime = startTime
        this.endTime = endTime
        this.restTime = restTime
        this.remarks = remarks
    }

    // クラス内にオーダーを持たせないことで、若干汎用性が高くなる
    toTr(order) {
        const tr = document.createElement('tr')
        order.forEach((col, i) => {
            const td = document.createElement('td')
            td.textContent = this[col]
            tr.appendChild(td)
        })
        return tr
    }
}

const presetTable = document.getElementById("presetTbl");
getPreset().forEach((pd, index) => {
    // 型を意識、HTMLElementList, Element, Nodelist
    const newTr = pd.toTr(columnOrder)
    const topCell = newTr.insertCell(0)
        // チェックボックスはプリセットとの関係が薄いから、Presetとは別で定義してみるとか
    topCell.appendChild(Object.assign(document.createElement('input'), { type: "checkbox", name: "ch", value: index }))
    presetTable.appendChild(newTr)
})

// 関数にしておけばデモデータと本物の差し替えがしやすくなるかな？
function getPreset() {
    const presetDemoData = [
        new Preset('早出勤務', '09:00', '18:00', '01:00', '残業なし'),
        new Preset('通常勤務', '10:00', '19:00', '01:00', '残業なし'),
        new Preset('通常勤務', '10:00', '19:00', '01:00', '残業なし'),
    ]
    return presetDemoData
}

// 選択を反映ボタンの処理(プリセット使用)
document.getElementById('reflect').onclick = function() {

        let element = document.getElementById('reflect');
        alert("テスト");

    }
    // 全平日に反映ボタンの処理(プリセット使用)
document.getElementById('reflectAll').onclick = function() {
    alert('全平日に反映ボタンの処理');
}

// 選択を削除ボタンの処理(プリセット使用)
document.getElementById('delete').onclick = function() {
    alert('選択を削除ボタンの処理');
}

// 登録して反映ボタンの処理(プリセット未使用)
document.getElementById('entryReflect').onclick = function() {
    alert('登録して反映ボタンの処理');
}

// 登録せず反映ボタンの処理(プリセット未使用)
document.getElementById('notEntryReflect').onclick = function() {
    alert('登録せず反映ボタンの処理');
}

// 登録のみボタンの処理(プリセット未使用)
document.getElementById('entry').onclick = function() {
    alert('登録のみボタンの処理');
}