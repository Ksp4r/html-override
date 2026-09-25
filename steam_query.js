window.addEventListener('message', async(event)=>{
    if (event.data.type == 'kspar-query'){
        console.log(`Request "${event.data.title}" recieved, querying...`);
        const title = event.data.title;
        const search = await fetch(`https://store.steampowered.com/api/storesearch?cc=AU&term=${title}`);
        const appid = (await search.json()).items[0].id;
        const storepage = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}&cc=AU`);
        const app = await storepage.json();
        if (Object.values(app)[0]?.data == undefined){
            console.error("Query Error: Search returned Nothing");
            console.log('Search results: ', search);
            return;
        }
        if (app[appid]){
            console.log('Response found: ', app[appid]);
            event.source.postMessage({type:'query-result', title:title, appData:app[appid].data}, "*");
            return;
        }
        console.log('AppID match not found: iterating search results');
        let found;
        for (const item of Object.values(app)){
            if (item.data.name == title){
                found = item.data;
                break;
            }
        }
        if (found == undefined){
            console.warn('Title Match not found, Returning first result');
            found = Object.values(app)[0].data;
        }
        event.source.postMessage({type:'query-result', title:title, appData:found}, "*");
        console.log('Search result: ', search);
        console.log('appid: ', appid);
        console.log('app: ', app);
    }
});
window.opener.postMessage({type:'query-ready'}, "*");
