var client = require('cheerio-httpcli');
var request = require('request');
var fs = require('fs');
var path = require('path');
var urlType = require('url');

// --- 공통 설정 ---
// 링크 탐색 단계 지정
var LINK_LEVEL = 3
// 기준 URL 페이지
var TARGET_URL = 'http://nodejs.jp/nodejs.org_ja/docs/v0.10/api/'
var list = []

// 메인 처리
downloadRec(TARGET_URL, 0)

// 지정 URL 을 최대 level 단계까지 다운로드
function downloadRec(url, level) {
    // 최대 level 확인
    if (level >= LINK_LEVEL) return;

    // 이미 다운받은 사이트는 무시
    if (list[url]) return;
    list[url] = true;

    // 외부 페이지는 무시
    var us = TARGET_URL.split('/');
    us.pop();
    var base = us.join('/');

    if (url.indexOf(base) < 0) return;

    // HTML 을 취득
    var param = {}
    client.fetch(url, param, function (err, $, res) {
        if (err) {
            console.log("Error:", err);
            return;
        }

        // 링크된 페이지 취득
        $('a').each(function (idx) {
            var href = $(this).attr('href');
            if(!href) return;

            // 절대 경로로 변환
            href = urlType.resolve(url, href);

            // '#' 이후를 무시
            href = href.replace(/\#.+$/, '');
            downloadRec(href, level + 1)
        });

        // 페이지 저장(파일명 지정)
        if (url.substr(url.length - 1, 1) == '/') {
            url += "index.html"
        }
        var savepath = url.split('/').slice(2).join('/');
        checkSaveDir(savepath);
        console.log(savepath);
        fs.writeFileSync(savepath, $.html());
    });
}

// 저장할 디렉터리 존재 유무 확인
function checkSaveDir(fname) {
    // 디렉터리 부분만 검출
    var dir = path.dirname(fname);

    // 디렉터리를 재귀적으로 생성
    var dirlist = dir.split('/');
    var p = '';
    for ( var i in dirlist ) {
        p += dirlist[i] + '/';
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
}

