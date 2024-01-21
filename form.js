        // Load existing data from local storage
        window.onload = function () {
            loadDataFromLocalStorage();
        };

        function validateForm() {
            var name1 = document.getElementById("fname").value;
            var name2 = document.getElementById("lname").value;
            var num = document.getElementById("phoneNumber").value;
            var email = document.getElementById("mail").value;
            var gender = document.querySelector('input[name="gender"]:checked');
            var hobbies = getCheckedValue();
            var country = document.getElementById("country").value;
            var state = document.getElementById("state").value;
           

            // Check if data is already in local storage
            var existingData = JSON.parse(localStorage.getItem("formData")) || [];

            // Add new data
            var newData = {
                firstname: name1+' '+name2,
                lastname: name2,
                contactNo: num,
                email: email,
                gender: gender ? gender.value : "",
                hobbies : hobbies,
                country : country,
                state : state

            };
            existingData.push(newData);

            // Save data to local storage
            localStorage.setItem("formData", JSON.stringify(existingData));

            // Reload table
            loadDataFromLocalStorage();

            // Optionally, you can reset the form
            document.getElementById("dataForm").reset();
            return true;
        }

        function loadDataFromLocalStorage() {
            var tableBody = document.getElementById("dataBody");
            var existingData = JSON.parse(localStorage.getItem("formData")) || [];

            // Clear table
            tableBody.innerHTML = "";

            // Populate table with existing data
            existingData.forEach(function (data, index) {
                var row = tableBody.insertRow(tableBody.rows.length);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                var cell8 = row.insertCell(7);
                cell1.innerHTML = data.firstname;
                cell2.innerHTML = data.contactNo;
                cell3.innerHTML = data.email;
                cell4.innerHTML = data.gender;
                cell5.innerHTML = data.hobbies;
                cell6.innerHTML = data.country;
                cell7.innerHTML = data.state;
                cell8.innerHTML = '<button onclick="editData(' + index + ')">Edit</button> ' +
                '<button onclick="deleteData(' + index + ')">Delete</button>';
          });
        }

     
        // To modify data
        function editData(index) {
            // Retrieve existing data from local storage
            var existingData = JSON.parse(localStorage.getItem("formData")) || [];

            // Get the data to be edited
            var dataToEdit = existingData[index];
            
            // Set the form values to the data being edited
            document.getElementById("fname").value = dataToEdit.firstname;
            document.getElementById("lname").value = dataToEdit.lastname;
            document.getElementById("phoneNumber").value = dataToEdit.contactNo;
            document.getElementById("mail").value = dataToEdit.email;
            var genderRadio = document.querySelector('input[name="gender"][value="' + dataToEdit.gender + '"]');
            if (genderRadio) {
                genderRadio.checked = true;
            }
            var checkboxes = document.getElementsByName("hobbies");
            var hobbiesArray = dataToEdit.hobbies.split(",");
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = hobbiesArray.includes(checkboxes[i].value);
            }
            

            document.getElementById("country").value = dataToEdit.country           
            document.getElementById("state").value = dataToEdit.state;
            

            

            // Save the modified data back to local storage
            localStorage.setItem("formData", JSON.stringify(existingData));

            // Reload table
            loadDataFromLocalStorage();
        }
        // to delete record
        function deleteData(index)
        {
        var existingData1 = JSON.parse(localStorage.getItem("formData")) || [];
        existingData1.splice(index,1);
        localStorage.setItem("formData", JSON.stringify(existingData1));
        loadDataFromLocalStorage();
        }

        // for checkbox value
        function getCheckedValue() {
            let checkboxes =
                document.getElementsByName("hobbies");
            let result = "";
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    result += checkboxes[i].value + ",";
                }
            }
            return result;
        }
        

      // Function to populate the state dropdown based on the selected country
      function updateStateDropdown() {
          var countryDropdown = document.getElementById("country");
          var stateDropdown = document.getElementById("state");

          // Clear the existing options in the state dropdown
          stateDropdown.innerHTML = "";

          // Get the selected country
          var selectedCountry = countryDropdown.value;

          // Add options to the state dropdown based on the selected country
          if (selectedCountry === "India") {
              addOptions(stateDropdown, ["--Select a State--","Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]);
          } else if (selectedCountry === "Australia") {
              addOptions(stateDropdown, ["--Select a State--","Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"]);
          }
          else if (selectedCountry === "Canada") {
              addOptions(stateDropdown,["--Select a State--","Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"]
);
          }
      }

      // Function to add options to a dropdown
      function addOptions(dropdown, options) {
          for (var i = 0; i < options.length; i++) {
              var option = document.createElement("option");
              option.text = options[i];
              dropdown.add(option);
          }
      }
 