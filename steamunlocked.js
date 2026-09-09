const style = document.createElement('style');
style.textContent = `
.steam-link{
    font-size: 1.5rem !important;
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
Object.assign(container.style, {position:'fixed', top:'10px', left:'10px', zIndex:99999, font:'14px sans-serif'});
document.body.append(container);
const a = document.createElement('a');
a.classList.add('auto-link');
a.href=u.href;
a.textContent = `(${document.querySelector(".su-hchip--size").textContent}) ${document.querySelector(".su-hero__title").textContent}`;
Object.assign(a.style,{padding:'10px',background:'#fff',color:'#00e',border:'2px solid #888',borderRadius:'6px',font:'14px sans-serif'});
const b = document.createElement('a');
b.classList.add('steam-link');
b.href = `www.steam.storepowered.com/search?term=${encodeURIComponent(document.title.split(" Free Download")[0])}`;
b.setAttribute('target','_blank');
b.textContent = "Steam Page";
container.append(a, b);
