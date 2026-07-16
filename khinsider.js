window.addEventListener('keydown', (event)=>{
    if (event.ctrlKey && event.key == 's'){
        event.preventDefault();
        Assault();
    }
});
function Assault(){
    var album = {
        links:[],
        filenames:[],
    };
    let arr = [], ival = 0;

    album.title = document.querySelector('h2').innerHTML;

    console.log('Gathering List...');
    for (let i of document.getElementById('songlist').getElementsByTagName('tr')){
        try{
            let input = i.querySelector('.clickable-row').querySelector('a');
            arr.push(input);
            album.filenames.push(`${input.innerHTML}.mp3`);
            console.log(input.innerHTML);
        } catch {}
    }

    let intervalId = setInterval(()=>{
        let a = document.getElementById('audio1');
        if (album.links.includes(a.src)){
            foot();
            clearInterval(intervalId);
        } else {
            album.links.push(a.src);
            arr[ival].scrollIntoView();
            ival++;
            document.getElementById('btnNext').click();
        }
    }, 100);

    function foot(){
        const links = album.filenames.map((name, index)=>{
            let a = document.createElement('a');
            a.textContent = name;
            a.href = album.links[index];
            return a;
        });
        document.body.replaceChildren(...links);
    }
}
