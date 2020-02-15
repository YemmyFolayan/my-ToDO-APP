

///CHANGE ALL THE FUNC TO ARROW FUNCTION











// Initializing the getToDoItems function
if (JSON.parse(localStorage.getItem('toDos')) !== null) {
    window.onload = getToDoItems();
}

// Add an Event listener to the form to listen for a submit event
// Getting the form from the HTML
let myForm = document.getElementById("toDoApp");

// Add an event listener to the form
myForm.addEventListener('submit', validateInput);


// Validate User Input
function validateInput(event) {
    // Stops form from submitting to the page
    event.preventDefault();
    
    // Form Variables...
    let toDoItem = document.getElementById('toDoItem').value;
   

    if (toDoItem.length === 0) {
        alert("Hey !..Input is Empty, Kindly enter your Todo.")
    } else {
        saveToDoItem(toDoItem)

    }
}




// Creating the SaveToDoItem function
function saveToDoItem(toDoItem) {
            
        let isCompleted = false;
        // ToDo Object
        function ToDo(id,item,isCompleted) {
            this.id = id;
            this.item = item;
            this.isCompleted = isCompleted;
        }
        // Checks if localStorage is empty and also adds to it
        if (localStorage.getItem('toDos') === null) {
        
            // Create an array of ToDo items and add each toDo to it and then also save it to localStorage
            let toDos = [];
            // Create the toDo Object from ToDo
            let id = toDos.length + 1;
            let toDo = new ToDo(id,toDoItem,isCompleted);
            // Append each toDo item to it
            toDos.push(toDo);
            // Save to localStorage by converrting the array to a JSON
            localStorage.setItem('toDos', JSON.stringify(toDos));
            
            } 
            else {
                // Fetch data from LocalStorage, convert it to an array
                let toDos = JSON.parse(localStorage.getItem('toDos'));
                // Create the toDo Object from ToDo
                let id = toDos.length + 1;
                let toDo = new ToDo(id,toDoItem,isCompleted);
                // Append toDo to the array of toDos
                toDos.push(toDo);
                // Convert back to JSON and Save to localStorage
                localStorage.setItem('toDos', JSON.stringify(toDos));
                //console.log("I can see localstorage with length not equals to 0");
            }
    
  



    // Re-fetch ToDo Items
    getToDoItems();
    // Clear form after submission
    myForm.reset();
}

// Deleting the toDoItem
function deleteToDoItem(toDoText) {
    // Fetch toDos from LocalStorage, loop through it and delete if each toDo Item corelate
    let toDos = JSON.parse(localStorage.getItem('toDos'));
    toDos.map((toDo, index) => {
        let item = toDo.item;

        if (item === toDoText) {
            toDos.splice(index, 1);
        }
    });
    // Append the new Arrays of toDo Items to LocalStorage
    localStorage.setItem('toDos', JSON.stringify(toDos));
    // Re-fetch ToDo Items
    getToDoItems();
}

// Function to mark each toDo Item completed
function checkCompleted(toDoId,toDoText) {
    let toDoToMark = document.getElementById(toDoId);
    // Fetch data from LocalStorage, check for it's truthy value and assign a new truthy value to it onClick
    let toDos = JSON.parse(localStorage.getItem('toDos'));
    toDos.forEach((toDo) => {
        let item = toDo.item;
        let isCompleted = toDo.isCompleted;
        if (item === toDoText) {
            // console.log(toDo);
            if (isCompleted === false) {
                toDo.isCompleted = true;
                // Change the CSS class for the toDo Text
                toDoToMark.className = "completed";
                // Append the new Arrays of toDo Items to LocalStorage
                localStorage.setItem('toDos', JSON.stringify(toDos));
            }
            if (isCompleted === true) {
                toDo.isCompleted = false;
                // Change the CSS class for the toDo Text
                toDoToMark.className = "notCompleted";
                // Append the new Arrays of toDo Items to LocalStorage
                localStorage.setItem('toDos', JSON.stringify(toDos));
            }
        }
    });
}

// Function to Mark Completed toDoItems
function markCompleted() {
    // Fetch data from LocalStorage, convert it to an array
    let toDos = JSON.parse(localStorage.getItem('toDos'));
    // Adds CSS textDecoration to the completed tODoItem
    toDos.forEach(toDo => {
        toDoId = toDo.id;
        isCompleted = toDo.isCompleted;
        let toDoToMark = document.getElementById(toDoId)
        if (isCompleted === true) {
            toDoToMark.className = "completed";
        } else {
            toDoToMark.className = "notCompleted";
        }
    });
}

// Displaying the saved toDo Items to the page
// Fetch the toDoItems
function getToDoItems() {

    let toDoContents = document.getElementById("toDoContents");
    // Loop through the toDos
    // Sets the present toDoContents on the GUI to empty and appends new items to it....
    toDoContents.innerHTML = '';


    // Checks if localStorage is empty and also adds to it
    if (localStorage.getItem('toDos') !== null) {

    // Fetch data from LocalStorage, convert it to an array
    let toDos = JSON.parse(localStorage.getItem('toDos'));
    // Get output ID from the HTML page

    // Reverse the toDo Array
    toDos.reverse();
    toDos.forEach(toDo => {
        let id = toDo.id;
        let item = toDo.item;
        let isCompleted = toDo.isCompleted;
        // Checks and Unchecks the input element if isCompleted or not
        if (isCompleted === true) {
            markMe = "checked";
        } else {
            markMe = "unchecked";
        }
        // Output the HTML structure to the page, still planning on upgrading this very soon...
        toDoContents.innerHTML += `<div class="well">
                                    <span id="${id}">${item}</span>
                                    <div class="pull-right">
                                    <input onchange="checkCompleted('${id}','${item}')" type="checkbox" ${markMe}>
                                    <button onclick="deleteToDoItem('${item}')" class="btn btn-danger">Delete</button>
                                    </div>
                                 </div>`        
    });
    // Calling function to mark the completed toDoItems
    markCompleted();
} else {
    toDoContents.innerHTML = '';
    //console.log('empty....');
}
}

function removeAll(){
    localStorage.clear();
    getToDoItems();
}





// Set the CopyRight dynamically...
let year = document.getElementById('year');
year.innerHTML = new Date().getFullYear();


