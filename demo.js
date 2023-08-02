var form = document.getElementById('my-form');
var itemList = document.getElementById('items');
// form submit
form.addEventListener('submit', onsubmit);
// delete event
itemList.addEventListener('click', deleteItem);
// edit event
itemList.addEventListener('click', editItem);

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
     li.appendChild(document.createTextNode(" "+newEmail));
     li.appendChild(document.createTextNode(" "+newNum));

     //create a button
     var deleteBtn = document.createElement('button');
     deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

     deleteBtn.appendChild(document.createTextNode('delete'));
     li.appendChild(deleteBtn)

     //  create edit btn 
     var editBtn = document.createElement('button');
     editBtn.className='btn btn-danger btn-sm float-right edit';
     editBtn.appendChild(document.createTextNode('edit'));
       li.appendChild(editBtn);
     itemList.appendChild(li);

     var userDetails = {
        newName: newName,
        newEmail: newEmail,
        newNum:newNum,
     }
     axios.post("https://crudcrud.com/api/34bfefee9843579b67f6acb13cf1b6/appointmentData", userDetails)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err)
    })
    // Clear input fields after submission
    form.reset();
   
}
function deleteItem(e){
   if(e.target.classList.contains('delete')){
      if(confirm('Are you Sure?')){
         var li =e.target.parentElement;
         itemList.removeChild(li);
         
         
        
      }
   } 
   
}
function editItem(e) {
   if (e.target.classList.contains('edit')) {
       var li = e.target.parentElement;

       var nameInput = li.childNodes[0];
       var emailInput = li.childNodes[1];
       var numberInput =li.childNodes[2];

       var newNa = prompt('Edit Name:', nameInput.textContent);
       var newE = prompt('Edit Email:', emailInput.textContent);
       var newN = prompt('Edit Phone Number:', numberInput.textContent);

       if (newN !== null && newE !== null && newN !== null) {
           li.childNodes[0].textContent = newNa;
           li.childNodes[1].textContent = " " + newE;
           li.childNodes[2].textContent = " " + newN;
           
       }
   }
  
}
