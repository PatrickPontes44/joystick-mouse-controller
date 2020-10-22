
document.querySelector("#arrow-up").addEventListener("click",()=>{postMove('up')})
document.querySelector("#arrow-right").addEventListener("click",()=>{postMove('right')})
document.querySelector("#arrow-bottom").addEventListener("click",()=>{postMove('down')})
document.querySelector("#arrow-left").addEventListener("click",()=>{postMove('left')})

document.querySelector("#click").addEventListener("click",()=>{postClick('left-click')})
document.querySelector("#right-click").addEventListener("click",()=>{postClick('right-click')})

document.querySelector("#page-up").addEventListener("click",()=>{postPage('page-up')})
document.querySelector("#page-down").addEventListener("click",()=>{postPage('page-down')})

document.querySelector("#send-cmd").addEventListener("click",postCommand)

document.querySelector("#trackpad").addEventListener("click",moveTrackpad)

document.querySelector("#mouseRange").addEventListener("input",(e)=>{
    document.querySelector("#mouseRangeSpan").innerText = `Mouse range: ${e.currentTarget.value}`

})



async function postMove(direction){
    const checkbox = document.querySelector("#keyboard");
    const url = checkbox.checked ? 'http://192.168.0.16:5000/keyboard' : 'http://192.168.0.16:5000/mouse';
    const mouseDistance = document.querySelector("#mouseRange").value
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify([direction, mouseDistance])
    })
    // let data = await res.text();
    // console.log(data);
}

async function postClick(click){
    await fetch(`http://192.168.0.16:5000/${click}`, {
        method: 'POST'
    })
    // let data = await res.text();
    // console.log(data);
}
async function postPage(page){
    await fetch(`http://192.168.0.16:5000/${page}`, {
        method: 'POST'
    })
    // let data = await res.text();
    // console.log(data);
}

async function moveTrackpad(e){
    const direction = [e.offsetX, e.offsetY, e.currentTarget.clientWidth, e.currentTarget.clientHeight];
    await fetch('http://192.168.0.16:5000/trackpad', {
        method: 'POST',
        body: JSON.stringify(direction)
    })

}

async function postCommand(){
    const command = document.querySelector("#input-txt").value;
    await fetch(`http://192.168.0.16:5000/command`, {
        method: 'POST',
        body: JSON.stringify(command)
    })
    // let data = await res.text();
    // console.log(data);

    document.querySelector("#input-txt").value = "";
}