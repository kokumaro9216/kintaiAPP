const columnOrder = ['date', 'week', 'startTime', 'endTime', 'restTime', 'workTime', 'overTime', 'remarks']

class Preset {
    constructor(date, week, startTime, endTime, restTime, workTime, overTime, remarks) {
        this.date = date
        this.week = week
        this.startTime = startTime
        this.endTime = endTime
        this.restTime = restTime
        this.workTime = workTime
        this.overTime = overTime
        this.remarks = remarks
    }

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

var now = new Date();
const year = now.getFullYear()
let month = now.getMonth() + 1;
month = ('0' + month).slice(-2)

//カレンダーの月のデフォルトを当月に変更する
const monthControl = document.querySelector('input[type="month"]');
monthControl.value = year.toString() + '-' + month.toString();

document.addEventListener('DOMContentLoaded', domFinished);

function domFinished() {
    const presetTable = document.getElementById("tbl");
    getTimeTable().forEach((pd, index) => {

        const newTr = pd.toTr(columnOrder)
        const topCell = newTr.insertCell(0)

        topCell.appendChild(Object.assign(document.createElement('input'), { type: "checkbox", name: "ch", value: index }))
        presetTable.appendChild(newTr)
    })
}

function getTimeTable() {
    const presetDemoData = [
        new Preset('12/01', '木', '09:00', '18:00', '01:00', '08:00', '01:00', ''),
        new Preset('12/02', '金', '09:00', '19:00', '01:00', '09:00', '01:00', '残業あり'),
        new Preset('12/03', '土', '', '', '', '', '', ''),
        new Preset('12/04', '日', '', '', '', '', '', ''),
        new Preset('12/05', '月', '09:00', '19:00', '01:00', '09:00', '01:00', '残業あり'),
        new Preset('12/06', '火', '', '', '', '', '', ''),
        new Preset('12/07', '水', '', '', '', '', '', ''),
        new Preset('12/08', '木', '', '', '', '', '', ''),
        new Preset('12/09', '金', '', '', '', '', '', ''),
        new Preset('12/10', '土', '', '', '', '', '', ''),
        new Preset('12/11', '日', '', '', '', '', '', ''),
        new Preset('12/12', '月', '', '', '', '', '', ''),
        new Preset('12/13', '火', '', '', '', '', '', ''),
        new Preset('12/14', '水', '', '', '', '', '', ''),
        new Preset('12/15', '木', '', '', '', '', '', ''),
        new Preset('12/16', '金', '', '', '', '', '', ''),
        new Preset('12/17', '土', '', '', '', '', '', ''),
        new Preset('12/18', '日', '', '', '', '', '', ''),
        new Preset('12/19', '月', '', '', '', '', '', ''),
        new Preset('12/20', '火', '', '', '', '', '', ''),
        new Preset('12/21', '水', '', '', '', '', '', ''),
        new Preset('12/22', '木', '', '', '', '', '', ''),
        new Preset('12/23', '金', '', '', '', '', '', ''),
        new Preset('12/24', '土', '', '', '', '', '', ''),
        new Preset('12/25', '日', '', '', '', '', '', ''),
        new Preset('12/26', '月', '', '', '', '', '', ''),
        new Preset('12/27', '火', '', '', '', '', '', ''),
        new Preset('12/28', '水', '', '', '', '', '', ''),
        new Preset('12/29', '木', '', '', '', '', '', ''),
        new Preset('12/30', '金', '', '', '', '', '', ''),
        new Preset('12/31', '土', '', '', '', '', '', ''),
    ]
    return presetDemoData
}