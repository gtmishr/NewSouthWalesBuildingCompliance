var isProjectExpandedArray = [false];
var tempProjectData;
var tempContractorData;

function addWrittenContractors(file) {

    var rawFile = new XMLHttpRequest(); // Create a new XML HTTP request to GET objects from any imported file
    var splitWritten = [];
    
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) { // If the status of the request is positive...
                var allText = rawFile.responseText;
                splitWritten = allText.split("\n"); // Split the response by line, and append all items to an array
            }
        }
    }
    
    rawFile.send(null);
    
    var i;
    for (i = 0; i < splitWritten.length; i++) { // Loop through all of the classes that come through...
        
        var postContractorRequest = new XMLHttpRequest();
        postContractorRequest.open('POST', 'http://localhost:8080/api/contractor', true); // Create a new XML HTTP request to POST objects

        postContractorRequest.setRequestHeader("Content-Type", 'application/json');
        postContractorRequest.send(splitWritten[i]); // POST the newfound objects to the local server

    }
}

function addWrittenProjects(file) {

    var rawFile = new XMLHttpRequest();
    var splitWritten = [];
    
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                splitWritten = allText.split("\n");
            }
        }
    }
    
    rawFile.send(null);
    
    var i;
    for (i = 0; i < splitWritten.length; i++) {
        
        var postContractorRequest = new XMLHttpRequest();
        postContractorRequest.open('POST', 'http://localhost:8080/api/project', true);

        postContractorRequest.setRequestHeader("Content-Type", 'application/json');
        postContractorRequest.send(splitWritten[i]);

        postContractorRequest.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
            }
        }     
    }

}

function addNewHTMLElements() {

    getContractor();
    getProject();
    
    var newDivCreated = document.createElement("div");
    newDivCreated.id = "project" + isProjectExpandedArray + "Div";
    document.getElementById("searchMenu").appendChild(newDivCreated); // Creates a new searchable HTML "div" class such that added items can be appended

    // Gets an array of everything that needs to be duplicated from template project (project0)
    var elementsToDuplicate = [document.getElementById("project0"), document.getElementById("building0ProjectTitle"), document.getElementById("building0ProjectDescription"), document.getElementById("project0Table"), document.getElementById("project0ContractorTable")];
    
    var i;
    for (i = 0; i < elementsToDuplicate.length; i++) { // Loops through everything that needs to be duplicated from template project (project0)
        
        var clone = elementsToDuplicate[i].cloneNode(true); // Create a clone of the HTML id required as defined in elementsToDuplicate[i]
        
        if (elementsToDuplicate[i].id == "project0") {
            clone.id = "project" + isProjectExpandedArray.length; // Change ID such that there is no duplicate HTML IDs
            clone.setAttribute("onclick", "expandProject(" + isProjectExpandedArray.length + ")");
            isProjectExpandedArray.push(false);         // As new project is created but not expanded, add "false" to isProjectExpanded Array
            document.getElementById(newDivCreated.id).appendChild(clone); // Add to earlier programmatically created "div" element
        }
        
        if (elementsToDuplicate[i].id == "building0ProjectTitle") { // As above, change ID to avoid duplicates and add to new "div" element
            clone.id = "building" + isProjectExpandedArray.length + "ProjectTitle";
            document.getElementById(newDivCreated.id).appendChild(clone);
        }
        
        if (elementsToDuplicate[i].id == "building0ProjectDescription") { // As above, change ID to avoid duplicates and add to new "div" element
            clone.id = "building" + isProjectExpandedArray.length + "ProjectDescription";
            document.getElementById(newDivCreated.id).appendChild(clone);
        }

        if (elementsToDuplicate[i].id == "project0Table") { // As above, change ID to avoid duplicates and add to new "div" element
            clone.id = "project" + isProjectExpandedArray.length + "Table";
            document.getElementById(newDivCreated.id).appendChild(clone);
        }
        
        if (elementsToDuplicate[i].id == "project0ContractorTable") { // As above, change ID to avoid duplicates and add to new "div" element
            clone.id = "project" + isProjectExpandedArray.length + "ContractorTable";
            document.getElementById(newDivCreated.id).appendChild(clone);
        }
                
    }

}

function searchBar() {

  var query = document.getElementById("searchBar").value.toUpperCase();
  var searchMenu = document.getElementById("searchMenu");
  var searchList = searchMenu.getElementsByTagName("li");
  var i;

  for (i = 0; i < searchList.length; i++) {
    var link = searchList[i].getElementsByTagName("a")[0];

    if (link.innerHTML.toUpperCase().indexOf(query) > - 1) {
      searchList[i].style.display = "";
    } else {
      searchList[i].style.display = "none";
    }

  }

}

function createNewProject() {

    var projectIDInput = document.getElementById("projectIDInput").value; // Gets all values that user inputs into website and stores as variables
    var clientNameInput = document.getElementById("clientNameInput").value;
    var streetAddressInput = document.getElementById("streetAddressInput").value;
    var suburbInput = document.getElementById("suburbInput").value;
    var descriptionInput = document.getElementById("descriptionInput").value;

    var rawProjectInput = {projectID: projectIDInput, clientName: clientNameInput, streetAddress: streetAddressInput, suburb: suburbInput, description: descriptionInput};
    var inputProjectParsed = JSON.stringify(rawProjectInput); // Creates Javascript object with input, and converts into JSON using library

    var postProjectRequest = new XMLHttpRequest();
    postProjectRequest.open('POST', 'http://localhost:8080/api/project', true); // Creates a new XMLHttpRequest to post new contractor object

    postProjectRequest.setRequestHeader("Content-Type", 'application/json');
    postProjectRequest.send(inputProjectParsed);

}

function deleteProject() {

    var projectIDInputToDelete = document.getElementById("projectIDInputToDelete").value; // Gets the value of projectID user defined

    var deleteProjectRequest = new XMLHttpRequest();
    deleteProjectRequest.open('DELETE', 'http://localhost:8080/api/project/' + projectIDInputToDelete);
    deleteProjectRequest.send(projectIDInputToDelete); // Creates new XMLHttpRequest to delete project from local server

}

function createNewContractor() {

    var contractorLicenceID = document.getElementById("contractorLicenceID").value; // Gets all values that user inputs into website and stores as variables
    var contractorLicenceNumber = document.getElementById("contractorLicenceNumber").value; 
    var contractorBusinessNames = document.getElementById("contractorBusinessNames").value;
    var contractorCategories = document.getElementById("contractorCategories").value;
    var contractorClasses = document.getElementById("contractorClasses").value;
    var contractorLicenceName = document.getElementById("contractorLicenceName").value;
    var contractorLicenceType = document.getElementById("contractorLicenceType").value;
    var contractorLicensee = document.getElementById("contractorLicensee").value;
    var contractorPostcode = document.getElementById("contractorPostcode").value;
    var contractorStatus = document.getElementById("contractorStatus").value;
    var contractorSuburb = document.getElementById("contractorSuburb").value;

    var rawContractorInput = {licenceID: contractorLicenceID, licenceNumber: contractorLicenceNumber, businessNames: contractorBusinessNames, categories: contractorCategories, classes: contractorClasses, licenceName: contractorLicenceName, licenceType: contractorLicenceType, licensee: contractorLicensee, postcode: contractorPostcode, status: contractorStatus, suburb: contractorSuburb};
    var inputContractorParsed = JSON.stringify(rawContractorInput); // Creates Javascript object with input, and converts into JSON using library
    
    var postContractorRequest = new XMLHttpRequest();
    postContractorRequest.open('POST', 'http://localhost:8080/api/contractor', true); // Creates a new XMLHttpRequest to post new contractor object

    postContractorRequest.setRequestHeader("Content-Type", 'application/json');
    postContractorRequest.send(inputContractorParsed);
    
}

function deleteContractor() {

    var contractorLicenceIDToDelete = document.getElementById("contractorLicenceIDToDelete").value; // Gets the value of contractorLicenceID user defined

    var deleteContractorRequest = new XMLHttpRequest();
    deleteContractorRequest.open('DELETE', 'http://localhost:8080/api/contractor/' + contractorLicenceIDToDelete);
    deleteContractorRequest.send(contractorLicenceIDToDelete); // Creates new XMLHttpRequest to delete contractor from local server

}

function expandProject(projectNumber) {

  if (isProjectExpandedArray[projectNumber] == false) {
    document.getElementById("project" + projectNumber).style.height = "700px";
    document.getElementById("project" + projectNumber).style.width = "700px";
    document.getElementById("project" + projectNumber + "Table").style.display = "inherit";
    document.getElementById("project" + projectNumber + "ContractorTable").style.display = "inherit";
    isProjectExpandedArray[projectNumber] = true;
  } else {
    document.getElementById("project" + projectNumber).style.height = "500px";
    document.getElementById("project" + projectNumber).style.width = "400px";
    document.getElementById("project" + projectNumber + "Table").style.display = "none";
    document.getElementById("project" + projectNumber + "ContractorTable").style.display = "none";
    isProjectExpandedArray[projectNumber] = false;
  }

}

function getContractor() {

    var getContractorRequest = new XMLHttpRequest();
    getContractorRequest.open('GET', 'http://localhost:8080/api/contractor', true); // Creates a new XMLHttpRequest to get JSON data stored on local server

    getContractorRequest.onload = () => {
        var getContractorData = JSON.parse(getContractorRequest.response); // Parses response using JSON library into JavaScript object
        console.log(getContractorData);
    }

}

function getProject() {

    var getProjectRequest = new XMLHttpRequest();
    getProjectRequest.open('GET', 'http://localhost8080/api/project', true) // Creates a new XMLHttpRequest to get JSON data stored on local server

    getProjectRequest.onload = () => {
        var getProjectData = JSON.parse(getContractorRequest.response); // Parses response using JSON library into JavaScript object
        console.log(getProjectData);
    }

}

// NOT CURRENTLY WORKING
function populateProjectTable() {
    var i;
    var j;

    for (i = 1; i < table.rows.length; i++) {
      for (j = 0; j < table.rows[i].cells.length; j++) {
           table.rows[i].cells[j].innerHTML = array[i - 1][j];
      }
    }
}

addWrittenContractors("contractorData.txt");
addWrittenProjects("projectData.txt");