var RSS = 'http://www.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109'

var xml2js = require('xml2js')
var parseString = xml2js.parseString
var Builder = xml2js.Builder;

var client = require('cheerio-httpcli');
var request = require('request')

request( RSS, (err, response, body) => {
    if (err) {
        console.log(err)
        return
    }

    if (!err && response.statusCode === 200) {
        analyzeRSS(body)
    }
});

function analyzeRSS(xml) {
    parseString(xml, (err, obj) => {
        if (err) {
            console.log(err)
            return
        }

        console.log('analyzeRSS')
        // 기상 예보 정보 출력
        var datas = obj.rss.channel[0].item[0].description[0].body[0].location[0].data;
        var city = obj.rss.channel[0].item[0].description[0].body[0].location[0].city;

        for (var i in datas) {
            var data = datas[i]
            console.log(
                `${city} ${data.tmEf} ${data.wf} ${data.tmn}-${data.tmx}`
            )
        }
    })
}

client.fetch(RSS, {}, function (err, $, res) {
    if (err) {
        console.log("Error:", err);
        return;
    }

    console.log('cheerio-httpcli')

    // 링크를 추출하여 표시
    var city = $('location:nth-child(1) > city').text()
    $('location:nth-child(1) > data').each(function (idx) {
        var tmEf = $(this).find('tmEf').text()
        var wf = $(this).find('wf').text()
        var tmn = $(this).find('tmn').text()
        var tmx = $(this).find('tmx').text()

        console.log(
            `${city} ${tmEf} ${wf} ${tmn}-${tmx}`
        )
    })
});
