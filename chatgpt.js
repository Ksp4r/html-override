
function rip(){
    let content = ``;
    let chat = document.querySelectorAll('.user-message-bubble-color, .markdown');

    for (let c of chat){
        if (c.matches('.user-message-bubble-color')){
            content += `_${c.innerText}`;
        } else if (c.matches('.markdown')){
            let response = c.querySelectorAll(':scope > hr, :scope > h1, :scope > h2, :scope > p, :scope > ul, pre');
            for (node of response){
                if (node.matches('hr')){
                    content += `\n--------------------------------------------\n`;
                } else if (node.matches('h1')){
                    content += `\n#${node.innerText}\n`;
                } else if (node.matches('h2')){
                    content += `\n##${node.innerText}\n`;
                } else if (node.matches('p')){
                    content += `\n${node.innerText}\n`;
                } else if (node.matches("ul")){
                    const items = [...node.querySelectorAll('li')].map(li => ` • ${li.innerText}`).join('\n');
                    content += `\n${items}\n`;
                } else if (node.matches('pre')){
                    let header = node.querySelector('svg').parentElement?.innerText ?? '';
                    let code = node.querySelector('code');
                    content += `\n\`\`\`${header}\n${code.innerText}\n\`\`\``;
                }
            }
        }
    }
    const blob = new Blob([content], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'chat_output.md';
    URL.revokeObjectURL(url);
}

const a = document.createElement('a');
document.querySelector('#page-header').append(a);
a.textContent = "output";
a.addEventListener("click", rip);
