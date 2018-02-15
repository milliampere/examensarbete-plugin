
function DOMtoArray(document_root) {
    let array = [];
    let url = window.location.href;

    if(url.includes("ica")){
        let nodesArray = Array.from(document_root.querySelectorAll(".ingredients__list__item"));
        let option1 = nodesArray[0].querySelector('.ingredient');
        let option2 = nodesArray[0].querySelector('span');
        if(option1) {
            array = nodesArray.map((node) => {
                return useRegex(node.querySelector('.ingredient').innerText);
            });
        }
        else if (option2) {
            array = nodesArray.map((node) => {
                return useRegex(node.innerText);
            });
        }
    }
    else if(url.includes("koket")){
        let nodesArray = Array.from(document_root.querySelectorAll(".ingredient"));
        array = nodesArray.map((node) => {
            return useRegex(node.innerText);
        });
    }
    else if(url.includes("coop")){
        let nodesArray = Array.from(document_root.querySelectorAll(".Recipe-ingredient"));
        array = nodesArray.map((node) => {
            return useRegex(node.innerText);
        });
    }
    return array;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoArray(document)
});


function useRegex(inputString) {

    inputString.trim();
    let ingObj = {};

    const re1 = /(\d+)\s*(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s(\D+)/;
    const re2 = /\d+\s+\D+/;
    const re3 = /^\D+/;

    if(inputString.match(re1)){
        //dela upp i siffra, mått, ingrediens
        ingredient = inputString.split(/(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s/);
        ingObj.amount = ingredient[0].match(/[^a-z+å+ä+ö ]+/);
        ingObj.type = ingredient[1];
        ingObj.name = ingredient[2];

    } else if (inputString.match(re2)) {
        //dela upp i siffra och ingrediens
        index = inputString.search(/\d\s+\D/);
        ingObj.amount = inputString.substring(0,index+1);
        ingObj.name = inputString.slice(index+2);

    } else if (inputString.match(re3)) {
        //dela inte upp, sök direkt på ingrediens
        ingObj.name = inputString;
    }
    return ingObj;
}

