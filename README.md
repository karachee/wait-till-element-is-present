# Wait Till Element Is Present

JavaScript async await utility that uses a MutationObserver to watch for new elements. 

Useful for single page apps that do not reload

[Stackblitz Example](https://waittillelementispresent.stackblitz.io/)

```javascript
import { waitTillElementIsPresent } from './waitTillElementIsPresent.js';


(async()=>{
    try {
        var element = await waitTillElementIsPresent('prolonged-button', 'ID', 10000, null);
        if (element) {
            console.log("Found the element");
        }else{
            console.log("Element not found");
        }
    } catch (exception) {
        console.log("Error trying to wait for element, "+exception);
    }
}
)(); 

let existingProlongedButton = document.getElementById('prolonged-button');
if(existingProlongedButton){
  existingProlongedButton.parentNode.removeChild(existingProlongedButton);
}
setTimeout( ()=>{
  let prolongedButton = document.createElement("button");
  prolongedButton.id = 'prolonged-button';
  let t = document.createTextNode("Prolonged");
  prolongedButton.appendChild(t);
  document.body.appendChild(prolongedButton);
}, 5000);

```