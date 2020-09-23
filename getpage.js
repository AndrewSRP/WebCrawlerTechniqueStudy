var client = require('cheerio-httpcli');

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
        console.log(`${text}:${href}`);
    })
});
