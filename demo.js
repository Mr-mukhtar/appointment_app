
var form = document.getElementById('my-form');
var itemList = document.getElementById('items');
var userDetailsList = []; // JavaScript variable to store the data

// form submit
form.addEventListener('submit', onsubmit);
// delete event
itemList.addEventListener('click', deleteItem);
// edit event
itemList.addEventListener('click', editItem);

// Load items on initial page load
loadItems();

function onsubmit(e) {
    e.preventDefault();
    // get the value
    var newName = document.getElementById('name').value;
    var newEmail = document.getElementById('email').value;
    var newNum = document.getElementById('number').value;

    // Create and append the list item
    var li = createListItem(newName, newEmail, newNum);
    itemList.appendChild(li);

    var userDetails = {
        newName: newName,
        newEmail: newEmail,
        newNum: newNum,
    };

    // Save the new item to the API
    axios.post("https://crudcrud.com/api/652bafa0ddc34a3d9dae34d9f2b9c5be/appointmentData", userDetails)
        .then((res) => {
            console.log(res);
            // Update the JavaScript variable with the new data
            userDetailsList.push(userDetails);
        })
        .catch((err) => {
            console.log(err);
        });

    // Clear input fields after submission
    form.reset();
}

function deleteItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you Sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);

   
            // Delete the item from the API
            var itemId = li.dataset.itemId;
            axios.delete(`https://crudcrud.com/api/652bafa0ddc34a3d9dae34d9f2b9c5be/appointmentData/${itemId}`)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });

           
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
            // Update the JavaScript variable after editing
            var index = Array.from(itemList.children).indexOf(li);
            if (index !== -1) {
                userDetailsList[index].newName = newNa;
                userDetailsList[index].newEmail = newE;
                userDetailsList[index].newNum = newN;
            }

           
        }
    }
}

function createListItem(name, email, number) {
   var li = document.createElement('li');
    li.className = 'list-group';
    // Add text node with input value
    li.appendChild(document.createTextNode(name));
    li.appendChild(document.createTextNode(" " + email));
    li.appendChild(document.createTextNode(" " + number));

    // Create a delete button
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('delete'));
    li.appendChild(deleteBtn);

    // Create an edit button
    var editBtn = document.createElement('button');
    editBtn.className = 'btn btn-danger btn-sm float-right edit';
    editBtn.appendChild(document.createTextNode('edit'));
    li.appendChild(editBtn);

    return li;
}
function loadItems() {
   // Fetch data from the API and display the list items
   axios.get("https://crudcrud.com/api/652bafa0ddc34a3d9dae34d9f2b9c5be/appointmentData")
       .then((response) => {
           var data = response.data;
           userDetailsList = data; // Update the JavaScript variable with the fetched data
           // Create and append list items using a for loop
           for (var i = 0; i < data.length; i++) {
               var user = data[i];
               var li = createListItem(user.newName, user.newEmail, user.newNum);
               itemList.appendChild(li);
           }
       })
       .catch((error) => {
           console.error("Error loading items from API:", error);
       });
}



