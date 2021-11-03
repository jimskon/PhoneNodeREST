// JavaScript for PprocessDeletehone Application Demo Program Using Express and REST
// Jim Skon, Kenyon College, 2020
const port='9002' // Must match port used on server, port>8000
const Url='http://jimskon.com:'+port
var operation;	// operation
var selectid;
var recIndex
var rows;
var saveRecord; // Place to store record for add varification
// Set up events when page is ready

// For this program thiis will be a reponse to a request from this page for an action

operation = "Last"; // Default operation

// Clear everything on startup
document.getElementsByClassName('editdata')[0].style.display = 'none';
// Add a click event for the search button                                                                  
document.querySelector("#search-btn").addEventListener("click", (e) => {
    e.preventDefault();
    getMatches();
});

document.querySelector("#add-btn").addEventListener("click", (e) => {
    e.preventDefault();
    addEntry();
});


// Add an event listener for each item in the pull down menu      
document.querySelectorAll('.dropdown-menu a').forEach(item => {
    item.addEventListener('click', event => {

        element = event.target;
        operation_all=element.textContent;
	operation = operation_all.split(" ").pop();
        console.log("pick: "+operation_all);
        // Get the pulldown parent                                
        pullDown = element.parentElement.parentElement.parentElement;
        // Get and set the selection displayed                    
        selection = pullDown.getElementsByClassName('selection')[0];
        selection.innerHTML = operation_all;
	changeOperation(operation);
    })
})

document.querySelector(".completeDelete").addEventListener("click", (e) => {
    e.preventDefault();
    element = e.target;

    processDelete();
});
changeOperation(operation);

// This processes the results from the server after we have sent it a lookup request.
// This clears any previous work, and then calls buildTable to create a nice
// Tabeditmessagele of the results, and pushes it to the screen.
// The rows are all saved in "rows" so we can later edit the data if the user hits "Edit"
function processResults(results) {

    document.getElementById('searchresults').innerHTML += buildTable(results);

    document.querySelectorAll('.edit').forEach(item => {
	item.addEventListener('click', event => {
	    processEdit(item);
	})
    })

    document.querySelectorAll('.delete').forEach(item => {
	item.addEventListener('click', event => {
	    DeleteConfirm(item);
	})
    })
	
}

// This function is called when an option is selected in the pull down menu
// If the option is "Add New" the shows the add form, and hides the others
// Otherwise it shows the results div
function changeOperation(operation){
    if(operation=="New"){
	document.getElementById('editfirst').value = "";
	document.getElementById('editlast').value = "";
	document.getElementById('editphone').value = "";
	document.getElementById('edittype').value = "";

	console.log("Enter new");
	document.getElementsByClassName('inputdata')[0].style.display = 'block';
	document.getElementsByClassName('searchbox')[0].style.display = 'none';
	document.getElementsByClassName('results')[0].style.display = 'none';
	document.getElementsByClassName('editdata')[0].style.display = 'none';
    }else{
	console.log("other");
	document.getElementsByClassName('editdata')[0].style.display = 'none';
	document.getElementsByClassName('inputdata')[0].style.display = 'none';
	document.getElementsByClassName('results')[0].style.display = 'block';
	document.getElementsByClassName('searchbox')[0].style.display = 'block';
    }
}

// Build output table from comma delimited data list from the server (a list of phone entries)
function buildTable(data) {
    rows=JSON.parse(data);
    if (rows.length < 1) {
	return "<h3>Nothing Found</h3>";
    } else {
	var result = '<table class="w3-table-all w3-hoverable" border="2"><tr><th>First</th><th>Last</th><th>Phone</th><th>Type</th><th>Action</th><tr>';
	var i=0
	rows.forEach(function(row) {
	    result += "<tr><td class='first'>"+row.First+"</td><td class='last'>"+row.Last+"</td><td class='phone'>"+row.Phone+"</td><td class='type'>"+row.Type+"</td>";
	    result += "<td><button type='button' ID='"+row.ID+"' class='btn btn-primary btn-sm edit'>Edit</button> ";
	    result += "<button type='button' ID='"+row.ID+"' Index='"+i+"' class='btn btn-primary btn-sm delete'>Delete</button></td></tr>";
	    i++;
	})
	result += "</table>";

	return result;
    }
}
// Called when the user clicks on the Edit button on the results list from a search
// This clears the search  results and shows the edit form, filling it in with the data from the associated record.
// The record ID is then saved in selectID so we know which record to update with the save button is pushed
// We fill in the edit form with the data from the record from this row.
function processEdit(item){
    console.log("editdata:");
    document.getElementById('searchresults').innerHTML = "";
    document.getElementsByClassName('editdata')[0].style.display = 'block';

    document.querySelector("#edit-btn").addEventListener("click", (e) => {
	e.preventDefault();
	var element = e.target.parentElement;
	updateEntry();
    });
	
    console.log("Edit Record: " + item.id);
    row = item.id;
    var record=item.parentElement.parentElement;
    var first = record.getElementsByClassName('first')[0].innerHTML;
    var last = record.getElementsByClassName('last')[0].innerHTML;
    var phone = record.getElementsByClassName('phone')[0].innerHTML;
    var type = record.getElementsByClassName('type')[0].innerHTML;
    document.getElementById('editfirst').value = first;
    document.getElementById('editlast').value = last;
    document.getElementById('editphone').value = phone;
    document.getElementById('edittype').value = type;
    selectid = item.id;
}

// This is called when the "Save" button in the edit form is pressed.
// It takes the updated data, and the saves "selectid", and sends the record to the server
// ot update the database.
function updateEntry(){
    //console.log("Edit: Firstname:" + $('#editfirst').val() + "ID:" + selectid);
    var first = document.getElementById('editfirst').value;
    var last = document.getElementById('editlast').value;
    var phone = document.getElementById('editphone').value;
    var type = document.getElementById('edittype').value;
    console.log(first,last,phone,type,selectid);
    recAdded = first+' '+last+', '+phone+', '+type;
    console.log("URL:",Url);
    var message = Url+"/update?ID="+selectid+"&First="+first+"&Last="+last+"&Phone="+phone+"&Type="+type+"&recno="+selectid;
    console.log("Message:",message);
    fetch(message, {
	method: 'get'
    })
	.then (response => response.text() )
        .then (data => processUpdate(data))
	.catch(error => {
	    {alert("Error: Something went wrong:"+error);}
	})
}

// Process a completed update process
function processUpdate(results) {
    // Look up the record and display it
    document.getElementsByClassName('editdata')[0].style.display = 'none';

    fetch(Url+'/'+selectid, {
	method: 'get'
    })
	.then (response => response.text() )
        .then (data => processResults(data))
	.catch(error => {
	    {alert("Error: Something went wrong:"+error);}
	})


}

// Process a completed add process
function processAdd(results) {
    // Look up the record and display it
    console.log("Add success:"+saveRecord);
    document.getElementsByClassName('editdata')[0].style.display = 'none';
    
    $('#addchangemodal').modal();
    document.getElementById('modalMessage').innerHTML = "Record added: "+saveRecord;
    document.getElementById('messageTitle').innerHTML = "Record added";

}

// This is called when the user hits the "Add button" in the add screen.
// It calls the server with the fields they entered.
function addEntry(){
    var first = document.getElementById('addfirst').value;
    var last = document.getElementById('addlast').value;
    var phone = document.getElementById('addphone').value;
    var type = document.getElementById('addtype').value;
    console.log("Add:"+last);
    saveRecord = first+' '+last+', '+phone+', '+type;

    var message = Url+"/addrec?First="+first+"&Last="+last+"&Phone="+phone+"&Type="+type+"&recno="+selectid;
    console.log("Message:",message);
    fetch(message, {
	method: 'get'
    })
	.then (response => response.text() )
        .then (data => processAdd(data))
	.catch(error => {
	    {alert("Add Error: Something went wrong:"+error);}
	})

}

// This is called when the user clicks on a "Delete" button on a row matches from a search.
// It puts up a modal asking the user to confirm if they really want to delete this record.  If they
// hit "Delete record", the processDelete function is called to do the delete.
function DeleteConfirm(item) {
    selectid=item.id;
    recIndex=item.getAttribute("index");
    console.log("Delete:",selectid,recIndex);
    saveRecord=rows[recIndex].First+" "+rows[recIndex].Last;
    clearResults();
    document.getElementById('deleteMessage').innerHTML = "Delete: "+rows[recIndex].First+" "+rows[recIndex].Last+"?";
    $('#deleteconfirm').modal('show');

}
// Calls the server with a recordID of a row to delete
function processDelete(){
    var message = Url+'/delete?ID='+selectid;
    console.log("DELETE:",message);
    fetch(message, {
	method: 'delete'
    })
	.then (response => response.text() )
        .then (data => deleteComplete(data))
	.catch(error => {
	    {alert("Delete Error: Something went wrong:"+error);}
	})
}

// Process a completed delete
function deleteComplete(results) {
    console.log("Delete success:"+saveRecord);
    document.getElementsByClassName('editdata')[0].style.display = 'none';
    $('#addchangemodal').modal();
    document.getElementById('modalMessage').innerHTML = "Record Deleted: "+saveRecord;
    document.getElementById('messageTitle').innerHTML = "Record Deleted";
}

function displayError(error) {
    console.log('Error ${error}');
}

// Clears the search results area on the screen
function clearResults() {
    document.getElementById('searchresults').innerHTML = "";
}

// Called when the user hits the "Search" button.
// It sends a request to the server (operation,search string),
// Where operation is one of (Last, First, Type)
function getMatches(){
    document.getElementsByClassName('editdata')[0].style.display = 'none';
    var search = $('#search').val();
    $('#searchresults').empty();
    $.ajax({
	     url: Url+'/find?field='+operation+'&search='+search,
	     type:"GET",
	     success: processResults,
	     error: displayError
    })

}
