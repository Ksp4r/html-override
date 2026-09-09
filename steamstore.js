const data = JSON.parse(document.body.textContent);

window.opener?.postMessage(data.items?[0] ?? null, "*");
