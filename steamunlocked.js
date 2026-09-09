const style = document.createElement('style');style.textContent = `
.link{
    padding:10px;
    background:#fff;
    color:#00e;
    border:2px solid #888;
    border-radius: 6px;
    font: 14px sans-serif;
}
.steam-link{
    font-size: 1.5rem !important;
}
.steam-link:before{
    content:'Steam: ';
}
.steam-frame{
    width: 230px;
    height:100vh;
}
.auto-link{
    color: lightgrey !important;
    font-size: 0.5rem !important;
}
.auto-link::before{
    content:"Download me Daddy-o!";
    display:block;
    color: blue !important;
    font-size: 1.5rem !important;
}`;
document.head.append(style);
const u=new URL(location.href);
u.searchParams.set('auto','true');
const container = document.createElement('div');
Object.assign(container.style, {display:'flex', 'flex-flow':'column', gap:'3px', position:'fixed', top:'10px', left:'10px', zIndex:99999, font:'14px sans-serif'});
document.body.append(container);
const a = document.createElement('a');
a.classList.add('link', 'auto-link');
a.href=u.href;
a.textContent = `(${document.querySelector(".su-hchip--size").textContent}) ${document.querySelector(".su-hero__title").textContent}`;
const b = document.createElement('button');
b.classList.add('link', 'steam-link');
b.onclick = ()=>{
    window.open(`https://store.steampowered.com/search?term=${encodeURIComponent(document.title.split(" Free Download")[0])}`, "_blank");
}
container.append(a, b);
