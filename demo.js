var form = document.getElementById('my-form');
var itemList = document.getElementById('items');
form.addEventListener('submit', onsubmit);
function onsubmit(e){
    e.preventDefault();
     // get the value
    var newName = document.getElementById('name').value;
    var newEmail = document.getElementById('email').value;
    var newNum = document.getElementById('number').value;
     var li = document.createElement('li');
     li.className= 'list-group';
     // Add text node with input value
     li.appendChild(document.createTextNode("name: "+newName));
     li.appendChild(document.createTextNode(" Email: "+newEmail));
     li.appendChild(document.createTextNode(" number: "+newNum));
     itemList.appendChild(li);

     var userDetails = {
        newName: newName,
        newEmail: newEmail,
        newNum:newNum,
     }
     localStorage.setItem("userDetails", JSON.stringify(userDetails));
}