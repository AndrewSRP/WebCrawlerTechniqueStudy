var client = require('cheerio-httpcli');
var urlTypeFn = require('./url-test');

var url = 'http://jpub.tistory.com';
var param = {};

client.fetch(url, param, function (err, $, res) {
    if (err) {
        console.log("Error:", err);
        return;
    }

    // 링크를 추출하여 표시
    $('a').each(function (idx) {
        var text = $(this).text();
        var href = $(this).attr('href');
        if(!href) return;

        var href2 = urlTypeFn(url, href);
        console.log(`${text}:${href}`);
        console.log(`  => ${href2}\n`);
    })
});
