var xml2js = require('xml2js')
var parseString = xml2js.parseString
var Builder = xml2js.Builder;

var xml = `<fruits shop='AAA'>
    <item price='140'>Banana</item>
    <item price='200'>Apple</item>
</fruits>`

parseString(xml, function (err, result) {
    // fruites 를 제공하는 가게 이름
    var shop = result.fruits.$.shop;
    console.log('shop=' + shop);

    // furits 의 이름과 가격을 표시
    var items = result.fruits.item
    for (var i in items) {
        var item = items[i]
        console.log('-- name=' + item._)
        console.log('   price=' + item.$.price)
    }
})

var xml2 = `<items>
    <item><name>Banana</name><price>130</price></item>
    <item><name>Apple</name><price>300</price></item>
    <item><name>Pear</name><price>250</price></item>
</items>`

parseString(xml2, function (err, result) {
    console.log(JSON.stringify(result))

    console.log('---')
    console.log(result.items.item[0].name[0])
    console.log(result.items.item[0].price[0])
})

var obj = {
    item: {
        name: 'Banana',
        price: 150,
    }
}

console.log(
    new Builder().buildObject(obj)
)