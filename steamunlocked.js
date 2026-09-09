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
.steam-frame{
    display:none;
    width: 150px;
}
.show{
    display:block;
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
Object.assign(container.style, {display:'flex', 'flex-flow':'column', position:'fixed', top:'10px', left:'10px', zIndex:99999, font:'14px sans-serif'});
document.body.append(container);
const a = document.createElement('a');
a.classList.add('link', 'auto-link');
a.href=u.href;
a.textContent = `(${document.querySelector(".su-hchip--size").textContent}) ${document.querySelector(".su-hero__title").textContent}`;
const i = document.createElement('iframe');
i.classList.add('steam-frame');
i.href = `https://store.steampowered.com/search?term=${encodeURIComponent(document.title.splie(" Free Download")[0])}`;
const b = document.createElement('button');
b.classList.add('link', 'steam-link');
b.onclick = ()=>{i.classList.toggle('show');}
b.textContent = "Steam Page";
container.append(a, b, i);
