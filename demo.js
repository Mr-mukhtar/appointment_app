var form = document.getElementById('my-form');
var itemList = document.getElementById('items');
// form submit
form.addEventListener('submit', onsubmit);
// delete event
itemList.addEventListener('click', deleteItem)
function onsubmit(e){
    e.preventDefault();
     // get the value
    var newName = document.getElementById('name').value;
    var newEmail = document.getElementById('email').value;
    var newNum = document.getElementById('number').value;
    //create li
     var li = document.createElement('li');
     li.className= 'list-group';
     // Add text node with input value
     li.appendChild(document.createTextNode(newName));
     li.appendChild(document.createTextNode(" ="+newEmail));
     li.appendChild(document.createTextNode(" ="+newNum));

     //create a button
     var deleteBtn = document.createElement('button');
     deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

     deleteBtn.appendChild(document.createTextNode('delete'));
     li.appendChild(deleteBtn)
     itemList.appendChild(li);

     var userDetails = {
        newName: newName,
        newEmail: newEmail,
        newNum:newNum,
     }
     localStorage.setItem("userDetails", JSON.stringify(userDetails));
}
function deleteItem(e){
   if(e.target.classList.contains('delete')){
      if(confirm('Are you Sure?')){
         var li =e.target.parentElement;
         itemList.removeChild(li);
      }
   }
}