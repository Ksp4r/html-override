const style = document.createElement('style');
style.textContent = `
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
const a=document.createElement('a');
a.classList.add('auto-link');
a.href=u.href;
a.textContent = `(${document.querySelector(".su-hchip--size").textContent}) ${document.querySelector(".su-hero__title").textContent}`;
Object.assign(a.style,{position:'fixed',top:'10px',left:'10px',zIndex:99999,padding:'10px',background:'#fff',color:'#00e',border:'2px solid #888',borderRadius:'6px',font:'14px sans-serif'});
document.body.append(a);
