window.addEventListener('message', async(event)=>{
    if (event.data.type == 'kspar-query'){
        const title = event.data.title;
        const search = await fetch(`https://store.steampowered.com/api/storesearch?cc=AU&term=${title}`);
        const appid = (await search.json()).items[0].id;
        const storepage = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}&cc=AU`);
        const app = await storepage.json();
        event.source.postMessage({type:'query-result', title:title, appData:app[appid].data}, "*");
    }
});
window.opener.postMessage({type:'query-ready'}, "*");
