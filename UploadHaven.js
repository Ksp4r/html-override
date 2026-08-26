setTimeout(()=>{
    const sButton = document.querySelector('#submitFree');
    if (sButton){
        setInterval(()=>{
            if (sButton.textContent.includes("Free Download")){
                sButton.click();
            }
        }, 1000);
        return;
    }
}, 500);
