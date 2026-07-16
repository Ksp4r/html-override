setTimeout( async() => {
    let btn = document.querySelector('#btn-main');
    while(!btn){ 
      await new Promise(resolve => setTimeout(resolve, 1000));
      btn = document.querySelector('#btn-main');
    }
    btn.click();
}, 1000);
