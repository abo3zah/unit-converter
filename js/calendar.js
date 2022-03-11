const getDatesBetween = (startDate, endDate, includeEndDate) => {
    const dates = [];
    const currentDate = startDate;
    while (currentDate < endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    if (includeEndDate) dates.push(endDate);
    return dates;
};

const createArr = (m) => {
    let num = m.day();
    var arr = [];
    if (num == 0){return arr};
    for (let i = 0; i < num-1; i++) {
        arr.push([' ']);        
    }
    arr.push(["*"])
    return arr;
};

const twoDigit = (str) => {
    return str.length == 1 ? "0" + str : str;
}

var replaceDigits = function (str) {
    return str.replace(/\d(?=[^<>]*(<|$))/g, function ($0) {return map[$0]});
}

var selectedYear = new Date().getFullYear();
var startDate = new Date(selectedYear + "-01-01");
var endDate = new Date(selectedYear + "-12-31");
var dates = getDatesBetween(startDate, endDate, true);
var hYear = [];
var map = [
    "&#1632;", "&#1633;", "&#1634;", "&#1635;", "&#1636;",
    "&#1637;", "&#1638;", "&#1639;", "&#1640;", "&#1641;"
]

const weekday = ["أ","ث","ث","ر","خ","ج","س"];
const MonthName = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أوكتوبر","نوفمبر","ديسمبر"];
const hColors = ['#32CD32', '#0000CD', '#FFA500'];

for (let i = 0; i <= 11; i++) {

    d3.select('[data-month="'+ (i+1) +'"]')
        .selectAll('span.dayName')
            .data(weekday)
            .enter()
            .append('span')
                .attr('class','dayName')
                .text(d => d)

    let hMonths = [];
    d3.select('[data-month="'+ (i+1) +'"]')
        .selectAll('div.day')
            .data(d3.merge([createArr(moment(selectedYear + "-" + (i+1) + "-01")),d3.filter(dates,d => d.getMonth() == i)]))
            .enter()
            .append('div')
                .attr('class', (d)=> {
                    if (d == " "){ return "empty"};
                    if (d =="*") { return "lastEmpty"};

                    let m = moment(d);

                    classes = 'day ';

                    m.isSame(moment(),'day')? classes+="today ":null;
                    m.day()>4? classes+="weekEnd " : classes+='weekDay ';
                    m.day()==0? classes+="sundays " : null;
                    m.date()==1? classes+="startOfMonth " : null;
                    
                    m.format('iMM')==9?classes+="ramadan " : null;
                    return classes;
                })
                .attr('style',(d) => {

                    if (d == " "){ return ""};
                    if (d =="*") { return ""};

                    let styleString = ""

                    let m = moment(d);
                    for (let z = 0; z < vacationData.length; z++){
                        if(m.isBetween(vacationData[z].start, moment(vacationData[z].end).add(1,'days'))){
                            styleString = vacationData[z].style;
                        }
                    }
                    return styleString;
                })
                .attr('data-date', d => d.toLocaleString().split(',')[0])
                .html((d) => {
                    let text = '';
                    if (d == " " || d == "*"){
                        text = " ";
                    }else{
                        let m = moment(d);
                        text = m.date();
                        hMonths.includes(m.format('iMMM'))?null: hMonths.push(m.format('iMMM'));
                        hYear.includes(m.format('iYYYY'))?null: hYear.push(m.format('iYYYY'));
                    }
                    return text;
                })
                .append('span')
                    .html((d) => {
                        let text = '';
                        if (d == " " || d == "*"){
                            text = " ";
                        }else{
                            let m = moment(d.toISOString().slice(0,10), 'YYYY/MM/DD');
                            text = '<span style="color:' + hColors[hMonths.indexOf(m.format('iMMM'))] + '">'+ replaceDigits(String(m.iDate())) +'</span>';
                        }
                        return text;
                    });

    d3.select('[data-month="'+ (i+1) +'"] div.monthHeader')
        .text(() => {
            return MonthName[i];
        })
        .append('span')
            .html(() => {
                let text = '';
                for (let j = 0; j<hMonths.length;j++){
                    text += '<span style="color:'+ hColors[j] + '">'+ hMonths[j] +'</span>'
                    j == (hMonths.length - 1) ? null: text += ' - '
                }
                return text;
            })
}

let str = 'تقويم سنة ' + selectedYear + ' (' + replaceDigits(hYear.reduce((p,c)=> p + " - " + c)) + ")";
d3.select('.mainBox > h2').html(str);