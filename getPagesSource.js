
function DOMtoArray(document_root) {
    let array = [];

    let url = window.location.href;

    if(url.includes("ica")){

        let nodesArray = Array.prototype.slice.call(document_root.querySelectorAll(".ingredients__list__item"));

        let option1 = nodesArray[0].querySelector('.ingredient');
        let option2 = nodesArray[0].querySelector('span');

        if(option1) {
            array = nodesArray.map((node) => {
                return {
                    name: node.querySelector('.ingredient').innerText,
                    amount: node.querySelector('.ingredient').dataset.amount,
                    type: node.querySelector('.ingredient').dataset.type
                } 
            }); 
        }
        else if (option2) {
            array = nodesArray.map((node) => {
                let name = '';
                let amount = '';
                for(var i = 0; i < node.childNodes.length; i++){
                    if(node.childNodes[i].nodeName === '#text'){
                        name = node.childNodes[i].textContent;
                    }
                    else if(node.childNodes[i].nodeName === 'SPAN'){
                        amount = node.childNodes[i].textContent;
                    }
                }
                return {
                    name,
                    amount
                } 
            }); 
        }

    }
    else if(url.includes("koket")){
        let nodesArray = Array.prototype.slice.call(document_root.querySelectorAll(".ingredient"));

        array = nodesArray.map((node) => {
          return {
            name: node.lastChild.innerText,
            amount: node.firstChild.innerText,
          } 
        }); 
    }
    else if(url.includes("coop")){
        let nodesArray = Array.prototype.slice.call(document_root.querySelectorAll(".Recipe-ingredient"));

        array = nodesArray.map((node) => {
            
            return {
                name: node.querySelector('.Recipe-ingredientType').innerHTML,
                amount: node.querySelector('.Recipe-ingredientAmount').innerHTML
            } 

        });
    }

    return array;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoArray(document)
});