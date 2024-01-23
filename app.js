function submitForm(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const mobileNo = document.getElementById("mobileNo").value;
  const gender = document.querySelector('input[type="radio"]:checked').value;
  const hobbies = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  )
    .map((hobby) => hobby.value)
    .join(", ");
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;

  if (validation(email, mobileNo, hobbies) == "true") {
    //Insert a new row in table
    const DataTable = document
      .getElementById("userData")
      .getElementsByTagName("tbody")[0];
    const newRow = DataTable.insertRow();

    //Data which are we want to insert in a above row
    const cells = [
      { fullname: firstName + " " + lastName },
      mobileNo,
      email,
      gender,
      hobbies,
      country,
      state,
    ];

    addCellsInRow(newRow, cells);

    addButtons(newRow, cells);

    clearForm();
  } else {
    displayAlertMessage(email, mobileNo, hobbies);
  }
}

//Validation function
function validation(existingEmail, existingMobileNo, existingHobbies) {
  var ans;

  //Email Validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailPattern.test(existingEmail);

  //Mobile Number Validation
  const mobileNoPattern = /^\d{10}$/;
  const isValidMobileNo = mobileNoPattern.test(existingMobileNo);

  if (existingHobbies.length > 0 && isValidEmail && isValidMobileNo) {
    ans = "true";
  } else {
    ans = "false";
  }

  return ans;
}

//Display alert function
function displayAlertMessage(existingEmail, existingMobileNo, existingHobbies) {
  //Email Validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailPattern.test(existingEmail);
  if (!isValidEmail) {
    alert("Please enter valid format email Id");
  }

  //Mobile Number Validation
  const mobileNoPattern = /^\d{10}$/;
  const isValidMobileNo = mobileNoPattern.test(existingMobileNo);
  if (!isValidMobileNo) {
    alert("Please enter only 10 digit number");
  }

  //Select Atleast one hobby
  if (existingHobbies.length == 0) {
    alert("Please select atleast one hobby");
  }
}

//For loop for inserting a each cells in each cell
function addCellsInRow(existingRow, existingCells) {
  for (let i = 0; i < existingCells.length; i++) {
    const cell = existingRow.insertCell(i);
    if (i == 0) {
      cell.appendChild(document.createTextNode(existingCells[i].fullname));
    } else {
      cell.appendChild(document.createTextNode(existingCells[i]));
    }
  }
}

// Create & Add Update/Delete buttons for the row
function addButtons(existingRow, existingCells) {
  const actionsCell = existingRow.insertCell(existingCells.length);
  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.style.backgroundColor = "green";
  updateButton.addEventListener("click", function () {
    updateRow(existingRow);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.backgroundColor = "orange";
  deleteButton.addEventListener("click", function () {
    deleteRow(existingRow);
  });

  actionsCell.appendChild(updateButton);
  actionsCell.appendChild(deleteButton);
}

// Populate the state dropdown based on the selected country
function updateStateDropdown() {
  var countryDropdown = document.getElementById("country").value;
  var stateDropdown = document.getElementById("state");

  // Clear the existing options in the state dropdown
  stateDropdown.innerHTML = "";

  // Add options to the state dropdown based on the selected country
  if (countryDropdown === "India") {
    addStateNameOptions(stateDropdown, [
      "--Select a State--",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ]);
  } else if (countryDropdown === "Australia") {
    addStateNameOptions(stateDropdown, [
      "--Select a State--",
      "Australian Capital Territory",
      "New South Wales",
      "Northern Territory",
      "Queensland",
      "South Australia",
      "Tasmania",
      "Victoria",
      "Western Australia",
    ]);
  } else if (countryDropdown === "Canada") {
    addStateNameOptions(stateDropdown, [
      "--Select a State--",
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Northwest Territories",
      "Nova Scotia",
      "Nunavut",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Yukon",
    ]);
  }
}

// Function to add options to a state dropdown
function addStateNameOptions(dropdown, options) {
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.text = options[i];
    dropdown.add(option);
  }
}

function updateRow(row) {
  const countryValue = row.cells[5].textContent;
  const stateValue = row.cells[6].textContent;

  document.getElementById("country").value = countryValue;
  document.getElementById("state").value = stateValue;

  var fullname = row.cells[0].textContent.split(" ");

  document.getElementById("firstName").value = fullname[0];
  document.getElementById("lastName").value = fullname[1];
  document.getElementById("mobileNo").value = row.cells[1].textContent;
  document.getElementById("email").value = row.cells[2].textContent;

  // Set the gender radio button
  const gender = row.cells[3].textContent.toLowerCase();
  var genderInputs = document.querySelectorAll('input[type="radio"]');
  console.log(genderInputs);
  for (var i = 0; i < genderInputs.length; i++) {
    if (genderInputs[i].value === gender) {
      genderInputs[i].checked = true;
      break;
    }
  }

  //set hobbies checkbox
  const hobbies = row.cells[4].textContent.split(", ");
  console.log(hobbies);
  var hobbyInputs = document.querySelectorAll('input[type="checkbox"]');
  console.log(hobbyInputs);
  for (let i = 0; i < hobbyInputs.length; i++) {
    for (let j = 0; j < hobbies.length; j++) {
      if (hobbyInputs[i].value === hobbies[j]) {
        hobbyInputs[i].checked = true;
      }
    }
  }

  // Remove the row from the table before updating the form
  row.parentNode.removeChild(row);
}

function deleteRow(row) {
  row.parentNode.removeChild(row);
}

function clearForm() {
  document.getElementById("registrationForm").reset();
}
  
