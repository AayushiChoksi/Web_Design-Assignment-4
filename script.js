function enableSubmit() {
    let inputs = document.getElementsByClassName('required');
    let btn = document.querySelector('input[type="submit"]');
    let isValid = true;
    for (var i = 0; i < inputs.length; i++) {
        let changedInput = inputs[i];
        if (changedInput.value.trim() === "" || changedInput.value === null) {
            isValid = false;
        }
    }
    btn.disabled = !isValid;
}
let isFormValid = true;
const checkboxContainer = document.getElementById("checkboxContainer");
const textFieldContainer = document.getElementById("textFieldContainer");

function checkAllValidations() {
    isFormValid = true;
    validateField('firstName', 'First Name is required.', 2, 30, true);
    validateField('lastName', 'Last Name is required.', 2, 30, true);
    validateEmail('emailId', 'Invalid Email Address. Only @northeastern.edu is allowed.');
    validatePhoneNumber('phoneNumber', 'Invalid Phone Number (use xxx-xxx-xxxx format).');
    validateField('streetAddress1', 'Street Address is required.', 2, 130, true);
    validateField('city', 'City is required.', 2, 30, true);
    validateField('state', 'State is required.', 2, 30, true);
    validateZipCode('zipcode', 'Invalid Zip Code');
    validateFeedbackType();
    updateSubmitButton();
    return isFormValid;
}

function updateSubmitButton() {
    var submit = document.getElementById('submit');
    submit.disabled = !isFormValid;
}

function displaySubmittedData() {
    var tableBody = document.getElementById("tableData");
    clearFormFields();

    var title = document.querySelector('input[name="title"]:checked').value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("emailId").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var streetAddress1 = document.getElementById("streetAddress1").value;
    var streetAddress2 = document.getElementById("streetAddress2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zipcode = document.getElementById("zipcode").value;
    var category = document.getElementById("category").value;
    var additionalInfo = document.getElementById("category").value;
    var comments = document.getElementById("comments").value;

    var newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${title}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${phoneNumber}</td>
        <td>${streetAddress1}</td>
        <td>${streetAddress2}</td>
        <td>${city}</td>
        <td>${state}</td>
        <td>${zipcode}</td>
        <td>${category}</td>
       
        <td>${comments}</td>
    `;
}

function validateForm() {
    var titleOptions = document.querySelectorAll('input[name="title"]');
    var isSelected = Array.from(titleOptions).some(function (option) {
        return option.checked;
    });

    if (!isSelected) {
        displayError("title", "Please select a title.");
        isFormValid = false;
    } else {
        clearError("title");
    }

    validateField('firstName', 'First Name is required.', 2, 30, true);
    validateField('lastName', 'Last Name is required.', 2, 30, true);
    validateField('city', 'City is required.', 2, 30, true);
    validateField('state', 'State is required.', 2, 30, true);
    validateField('comments', 'Comments are required.', 2, 30, true);
    validateEmail('emailId', 'Invalid Email Address. Only @northeastern.edu is allowed.');
    validatePhoneNumber('phoneNumber', 'Invalid Phone Number (use xxx-xxx-xxxx format).');
    validateZipCode('zipcode', 'Invalid Zip Code.');
    validateFeedbackType();

    if (!isFormValid) {
        return false; // Prevent form submission if validation fails
    }

    showTable();
    displaySubmittedData();
    clearFormFields();

    return false; // Prevent default form submission behavior
}

function validateField(elementId, errorMessage, minLength, maxLength, alphanumeric) {
    clearError(elementId);

    var value = document.getElementById(elementId).value;
    if (value === "") {
        displayError(elementId, errorMessage);
        isFormValid = false;
        return;
    }

    if (alphanumeric) {
        var alphanumericRegex = /^[a-zA-Z0-9]+$/;
        if (!alphanumericRegex.test(value)) {
            displayError(elementId, "Field should not contain special characters.");
            isFormValid = false;
            return;
        }
    }
    var nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(value)) {
        displayError(elementId, "Name should contain only letters.");
        isFormValid = false;
        return;
    }

    if (value.length < minLength || value.length > maxLength) {
        displayError(elementId, `${elementId.charAt(0).toUpperCase() + elementId.slice(1)} must be between ${minLength} and ${maxLength} characters.`);
        isFormValid = false;
        return;
    }
}

function validateEmail(elementId, errorMessage) {
    clearError(elementId);

    var value = document.getElementById(elementId).value;
    var emailRegex = /^[^\s@]+@northeastern\.edu$/;
    if (!emailRegex.test(value)) {
        displayError(elementId, errorMessage);
        isFormValid = false;
    }
}

function validatePhoneNumber(elementId, errorMessage) {
    clearError(elementId);

    var value = document.getElementById(elementId).value;
    var phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(value)) {
        displayError(elementId, errorMessage);
        isFormValid = false;
    }
}

function validateZipCode(elementId, errorMessage) {
    clearError(elementId);

    var value = document.getElementById(elementId).value;
    var zipRegex = /^\d{6}$/;
    if (!zipRegex.test(value)) {
        displayError(elementId, errorMessage);
        isFormValid = false;
    }
}

function validateFeedbackType() {
    var feedbackOptions = document.querySelectorAll('input[name="feedbackType"]');
    var isSelected = Array.from(feedbackOptions).some(function (option) {
        return option.checked;
    });

    if (!isSelected) {
        displayError("category", "Please select a feedback type.");
        isFormValid = false;
    } else {
        clearError("category");
    }
}

function showTable(){
    var table = document.getElementById("tableData");
    table.style.display = "block";
}
function showCaption() {
    var caption = document.getElementById("tableCaption");
    caption.style.display = "table-caption"; // Display the caption
}

function updateCheckbox() {
    var category = document.getElementById("category").value;
    checkboxContainer.innerHTML = "";
    textFieldContainer.innerHTML = "";

    if (category === "foodPortion") {
        addCheckbox("Large", "largePrice");
        addCheckbox("Medium", "mediumPrice");
        addCheckbox("Small", "smallPrice");
    } else if (category === "service") {
        addCheckbox("Excellent", "excellentService");
        addCheckbox("Good", "goodService");
        addCheckbox("Average", "averageService");
    } else if (category === "ambiance") {
        addCheckbox("Cozy", "cozyAmbiance");
        addCheckbox("Modern", "modernAmbiance");
        addCheckbox("Traditional", "traditionalAmbiance");
    } else if (category === "cleanliness") {
        addCheckbox("Excellent", "excellentcleanliness");
        addCheckbox("Good", "goodcleanliness");
        addCheckbox("Average", "aaveragecleanliness");
    } else if (category === "value for money") {
        addCheckbox("Satisfactory", "satisfactory");
        addCheckbox("Not Satisfactory", "notSatisfactory");
    }
}

function addCheckbox(label, value) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "feedbackType";
    checkbox.value = value;
    checkbox.id = value;

    var checkboxLabel = document.createElement("label");
    checkboxLabel.htmlFor = value;
    checkboxLabel.appendChild(document.createTextNode(label));

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);
    checkboxContainer.appendChild(document.createElement("br"));
}

function addTextField(label) {
    var textField = document.createElement("input");
    textField.type = "text";
    textField.name = "textField";
    textField.id = "textField";
    textField.placeholder = label;
    textField.required = true;
    textFieldContainer.appendChild(textField);
    textFieldContainer.appendChild(document.createElement("br"));
}

function displayError(elementId, errorMessage) {
    document.getElementById(elementId + "Error").innerHTML = errorMessage;
}

function clearError(elementId) {
    document.getElementById(elementId + "Error").innerHTML = "";
}

document.addEventListener('change', function (event) {
    var target = event.target;
    if (target.type === 'checkbox' && target.name === 'feedbackType') {
        var textFieldContainer = document.getElementById("textFieldContainer");
        if (target.checked) {
            addTextField("Additional Info");
        } else {
            textFieldContainer.innerHTML = "";
        }
    }

    return false;
});

document.getElementById("submit").onclick = function () {
    document.getElementById("tableData").style.display = "block";

    var tableData = document.getElementById("tableData");
    var row = tableData.insertRow(-1);
    var title = row.insertCell(0);
    var firstName = row.insertCell(1);
    var lastName = row.insertCell(2);
    var emailId = row.insertCell(3);
    var phoneNumber = row.insertCell(4);
    var streetAddress1 = row.insertCell(5);
    var streetAddress2 = row.insertCell(6);
    var city = row.insertCell(7);
    var state = row.insertCell(8);
    var zipcode = row.insertCell(9);
    var category = row.insertCell(10);
  
    var comments = row.insertCell(11);

    title.innerHTML = document.querySelector('input[name="title"]:checked').value;
    firstName.innerHTML = document.getElementById("firstName").value;
    lastName.innerHTML = document.getElementById("lastName").value;
    emailId.innerHTML = document.getElementById("emailId").value;
    phoneNumber.innerHTML = document.getElementById("phoneNumber").value;
    streetAddress1.innerHTML = document.getElementById("streetAddress1").value;
    streetAddress2.innerHTML = document.getElementById("streetAddress2").value;
    city.innerHTML = document.getElementById("city").value;
    state.innerHTML = document.getElementById("state").value;
    zipcode.innerHTML = document.getElementById("zipcode").value;
    category.innerHTML = document.getElementById("category").value;
    comments.innerHTML = document.getElementById("comments").value;
};

let submit = document.getElementById('submit');
const formToReset = document.getElementById('myForm');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    formToReset.reset();
});
