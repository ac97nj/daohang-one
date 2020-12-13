console.log($)
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const X = localStorage.getItem('x')
const xObject = JSON.parse(X)
const hashMap = xObject || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    },
]
const simplifyurl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')   // 删除 / 开的头的内容 ,用正则
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        console.log(index);
        const $li = $(`<li >
            <div class = "site" >
                <div class = "logo" >${node.logo}</div >
                <div class = "link" >${simplifyurl(node.url)}</div >
                <div class="close">
                 <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-edit"></use>
                        </svg>
                    </div>
            </div >
        </li >`).insertBefore($lastLi)
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            console.log(hashMap);
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是什么?')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyurl(url)[0].toUpperCase(),
        url: url
    })
    render()
})
window.onbeforeunload = () => {
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)
    console.log(typeof hashMap)
    console.log(typeof string)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    console.log(e.key)
    const key = (e.key)
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})


