export function waitTillElementIsPresent(elementSelector, selectorType, waitTime, parentElement) {
    return (elementSelector && selectorType) ?  new Promise((resolve,reject)=>{
       selectorType = selectorType.toUpperCase().split(' ').join(' ', '');
       let element = getElement(elementSelector, selectorType);
        if (element) {
            resolve(element);
        } else {
            var waitTillElementIsPresentTimeout = setTimeout(()=>{
                console.log(`The ${waitTime} ms wait till element is present timeout has been reached`);
                resolve(null);
                observer.disconnect();
            }
            , (waitTime) ? waitTime : 10000);
 
            var observer = new MutationObserver((mutations)=>{
                mutations.forEach((mutation)=>{
                    let element = [].slice.call(mutation.addedNodes).find(addedNode=>getElementFromMutation(addedNode, elementSelector, selectorType));
                    if (element) {
                        clearTimeout(waitTillElementIsPresentTimeout);
                        observer.disconnect();
                        resolve(element);
                    }
                });
            });

            observer.observe((parentElement) ? parentElement : document.body, {
                childList: true,
                subtree: true,
                attributes: false,
                characterData: false
            });
        }
    }
    ) : null;
}
 
function getElementFromMutation(node, elementSelector, selectorType) {
    let found = false;
    if (node) {
        switch (selectorType) {
        case 'ID':
            found = node.id == elementSelector;
            break;
        case 'CLASSNAME':
            found = node.classList.includes(elementSelector);
            break;
        case 'QUERYSELECTOR':
            found = node.matches(elementSelector);
            break;
        default:
            console.log(`Unknown selector type: ${selectorType}`);
        }
    }
 
    return found;
}
 
function getElement(elementSelector, selectorType) {
    let element = null;
    switch (selectorType) {
    case 'ID':
        element = (elementSelector) ? document.getElementById(elementSelector) : null;
        break;
    case 'CLASSNAME':
        element = (elementSelector) ? document.getElementsByClassName(elementSelector) : null;
        break;
    case 'QUERYSELECTOR':
        element = (elementSelector) ? document.querySelector(elementSelector) : null;
        break;
    default:
        console.log(`Unknown selector type: ${selectorType}`);
    }
 
    return element;
}