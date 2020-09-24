var API = "http://api.aoikujira.com/kawase/get.php?code=USD&format=json"
var RSS = "https://kr.fxexchangerate.com/usd/krw.xml"

var request = require('request')
var fs = require('fs')

var xml2js = require('xml2js')
var parseString = xml2js.parseString

request( RSS, (err, response, body) => {
    if (err && response.statusCode !== 200) {
        console.log(err)
        return
    }

    parseString(body, (err, obj) => {
        if (err) {
            console.log(err)
            return
        }

        var t = new Date()
        var fname = `USD_KRW_${t.getFullYear()}-${t.getMonth() + 1}-${t.getDay()}.txt`
        var text = obj.rss.channel[0].item[0]
            .description[0]
            .split('\n')[1]
            .replace('<br/>', '')
            .trim();

        console.log(text)

        fs.writeFileSync(fname, text)
    })
})