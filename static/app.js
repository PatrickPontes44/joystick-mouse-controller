
document.querySelector("#arrow-up").addEventListener("click",()=>{postMove('up')})
document.querySelector("#arrow-right").addEventListener("click",()=>{postMove('right')})
document.querySelector("#arrow-bottom").addEventListener("click",()=>{postMove('down')})
document.querySelector("#arrow-left").addEventListener("click",()=>{postMove('left')})

document.querySelector("#click").addEventListener("click",()=>{postClick('left-click')})
document.querySelector("#right-click").addEventListener("click",()=>{postClick('right-click')})

document.querySelector("#page-up").addEventListener("click",()=>{postPage('page-up')})
document.querySelector("#page-down").addEventListener("click",()=>{postPage('page-down')})

document.querySelector("#send-cmd").addEventListener("click",()=>{postCommand()})

document.querySelector("#trackpad").addEventListener("click",()=>{postCommand()})


async function postMove(direction){
    const checkbox = document.querySelector("#keyboard");
    const url = checkbox.checked ? 'http://192.168.0.16:5000/keyboard' : 'http://192.168.0.16:5000/mouse';
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(direction)
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