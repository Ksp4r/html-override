const tabsbar = document.querySelector(".su-tabsbar").cloneNode(true)
const tabsbody = document.querySelector(".most-popular-body").cloneNode(true)

for (let link of tabsbar.querySelectorAll("a")){
    link.setAttribute("onclick", "hit(this);");
}

setTimeout(()=>{
document.querySelector(".su-tabsbar").replaceWith(tabsbar)
document.querySelector('.most-popular-body').replaceWith(tabsbody)
}, 1000)

function hit(a){
    for (let link of tabsbar.querySelectorAll("a")){
        link.classList.remove('active');
    }
    a.classList.add('active');
    for (let link of tabsbody.querySelectorAll(".su-tab-panel")){
        if (link.getAttribute("data-panel") == a.getAttribute('data-tab')){
            link.style.display = "";
        } else {
            link.style.display = "none";
        }
    }
}
