var client = require('cheerio-httpcli');
var request = require('request');
var fs = require('fs');
var urlType = require('url');

var savedir = __dirname + '/img';
if (!fs.existsSync(savedir)) {
    fs.mkdirSync(savedir);
}

var url = `https://ko.wikipedia.org/wiki/${encodeURIComponent("강아지")}`;
var param = {};

client.fetch(url, param, function (err, $, res) {
    if (err) {
        console.log("Error:", err);
        return;
    }

    // 링크를 추출하여 표시
    $('img').each(function (idx) {
        var src = $(this).attr('src');
        if(!src) return;

        // 절대 경로로 변환
        src = urlType.resolve(url, src);

        // 저장 파일 이름 결정
        var fname = urlType.parse(src).pathname;
        fname = `${savedir}/${fname.replace(/[^a-zA-Z0-9\.]+/g, '_')}`;

        // 다운로드
        request(src).pipe(fs.createWriteStream(fname));
    })
});
