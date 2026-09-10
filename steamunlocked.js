const style = document.createElement('style');style.textContent = `
.link{
    padding:10px;
    background:#fff;
    color:#00e;
    border:2px solid #888;
    border-radius: 6px;
    font: 14px sans-serif;
}
.steam-frame{
    display:flex;
    flex-flow:column;
    border: 2px solid gray;
    padding: 5px;
    border-radius: 6px;
    width: 230px;
    height:fit-content;
    color: white;
    background:#1b2838;
}
.steam-link{
    cursor: pointer;
}
.steam-link:hover{
    color: #b0e015;
}
.steam-link:before{
    content:'app ID: ';
    color: grey;
}
.steam-pub{
    color: grey;
}
.steam-list{
    white-space:break-spaces;
    color: lightskyblue;
}
.steam-price{
    color:#b0e015;
}
.steam-price:before{
    content: var(--initial);
    padding-right: 0.5em;
    color: grey;
    text-decoration: line-through;
}
.auto-link{
    color: blue !important;
    font-size: 1.5rem !important;
}
.auto-link::after{
    content:"Prepare to Board, Matey!";
    display:block;
    color: grey !important;
    font-size: 1rem !important;
}`;
document.head.append(style);
const title = encodeURIComponent(document.title.split(" Free Download")[0]);
var appData;
const u=new URL(location.href);
u.searchParams.set('auto','true');
const container = document.createElement('div');
Object.assign(container.style, {display:'flex', 'flex-flow':'column', gap:'3px', position:'fixed', top:'10px', left:'10px', zIndex:99999, font:'14px sans-serif'});
document.body.append(container);
const a = document.createElement('a');
a.classList.add('link', 'auto-link');
a.href=u.href;
a.textContent = `(${document.querySelector(".su-hchip--size").textContent}) ${document.querySelector(".su-hero__title").textContent}`;
const b = document.createElement('div');
b.classList.add('steam-frame');
b.image = document.createElement('img');
b.appid = document.createElement('h3');
b.appid.classList.add('steam-link');
b.appid.onclick = ()=>{
    window.open(`https://store.steampowered.com/app/${b.appid.textContent}/`);
}
b.append(b.appid, b.image);
for (const cat of ['dev','publisher','release','genres','price']){
    b[cat] = document.createElement('p');
    b.append(b[cat]);
}
b.publisher.classList.add('steam-pub');
b.price.classList.add('steam-price');
b.render = ()=>{
    b.image.src = appData['capsule_imagev5'];
    b.appid.textContent = appData['steam_appid'];
    b.dev.textContent = appData['developers'].join(', ');
    b.publisher.textContent = appData['publishers'].join(', ');
    b.release.textContent = appData['release_date']['date'];
    b.genres.textContent = appData['categories'].map(c => c.description).join('\n');
    b.price.style.setProperty('--initial',`"${appData['price_overview']['initial_formatted']} "`);
    b.price.textContent = appData['price_overview']['final_formatted'];
}
container.append(a, b);
let steamWin = false, win;
const channel = new BroadcastChannel('kspar-steam');
channel.onmessage = event =>{
    if (win?.closed) win = undefined;
    if (win){
        if (event.data.type == 'steam-ping') {
            console.log('ping recieved, Sending response');
            channel.postMessage({type:'ping-response'});
        }
        else if (event.data.type == 'kspar-query'){
            console.log('request recieved, querying...');
            win.postMessage({type:'kspar-query', title:event.data.title}, "*");
        }
    }
    else if (!steamWin && event.data.type == 'ping-response'){
        console.log('ping response recieved, requesting...');
        channel.postMessage({type:'kspar-query',title:title});
        steamWin = true;
    }
    else if (event.data.type == title){
        appData = event.data.appData;
        b.render();
        channel.onmessage = ()=>{};
    }
};
channel.postMessage({type:'steam-ping'});
setTimeout(()=>{
    if (!steamWin){
        window.addEventListener('message', (event)=>{
            if (event.data.type == 'query-ready'){
                win.postMessage({type:'kspar-query', title:title}, "*");
            }
            if (event.data.type == 'query-result'){
                console.log('query result recieved, posting...');
                channel.postMessage({type:event.data.title, appData:event.data.appData});
                if (event.data.title == title){
                    appData = event.data.appData;
                    b.render();
                }
            }
        });
        win = window.open(`https://store.steampowered.com?kspar=steam_query`);
        window.beforeunload = ()=>{win.close();};
    }
}, 100);
