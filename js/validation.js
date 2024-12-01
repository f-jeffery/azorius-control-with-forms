let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/;

const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
]

document.addEventListener("DOMContentLoaded", function() {
    initValidation("logform");
  });

let form = null;
let successMsg = null;

function initValidation(formID, successID){

    form = document.getElementById(formID);
    succussMsg = document.getElementById(successID);

    let inputs = document.querySelectorAll("input");
    for (input of inputs)
    {
        input.addEventListener("change", inputChanged);
    }
    form.addEventListener("submit", submitForm);
}

function inputChanged(ev)
{
    console.log("form was changed");
    let el = ev.currentTarget;
    validateForm();

    //Todo add was validated
}

function submitForm(ev)
{
    let form=ev.currentTarget;

    ev.preventDefault();
    ev.stopPropagation();

    validateForm();

    if(!form.checkValidity())
    {
        console.log("invalid");
    }
    else
    {
        console.log("valid");
    }
}

function validateForm() {

    checkRequired("first_name", "First Name is Required");
    checkRequired("last_name", "Last Name is Required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is Required");
    
    if(checkRequired("state", "State is Required")){
      validateState("state", "Enter two digit code e.g., UT");
    }
   
    if (checkRequired("email", "Email Address is required")) {
      checkFormat("email", "The email is not in a recognizable format", emailRegex)
    }
    if (checkRequired("zip", "Zip Code is Required")) {
      checkFormat("zip", `Please use either "#####", or "#####-#### format.`, zipCodeRegex)
    }
    if (checkRequired("cellphone", "Phone is required")) {
      checkFormat("cellphone", "Your phone format is bad", phoneRegex)
    }
    checkRequired("denny", "You must heard about us from somewhere!");
  }

function validateState(id, msg)
{
    let el = document.getElementById(id);
    let valid = false;

    let state = el.value.toUpperCase();

    if(stateAbbreviations.indexOf(state) > -1)
    {
        valid = true;
    }

    setElementValidity(id, valid, msg);
}

function checkRequired(id, message){
    let el = document.getElementById(id);
    let valid = false;
    let type = el.type;
    switch(type)
    {
        case 'text':
        case 'password':
        case 'email':
            if(el.value != ""){valid = true};
            break;

        case 'checkbox':
        case 'radio':
            for(el of document.querySelectorAll('input[name="found_page"]'))
            {
                if(el.checked)
                {
                    valid = true;
                    break;
                }
            }
            break;
            //todo validate if any of the checkboxes were checked
    }

    setElementValidity(id, valid, message);
    return valid;
}

function checkFormat(id, msg, regex)
{
    let valid = regex.test(document.getElementById(id).value);
    setElementValidity(id, valid, msg);
    return valid;
}

function setElementValidity(id, valid, message)
{
    let el = document.getElementById(id);
    el.classList.add("was-validated");

    if(valid)
    {
        el.setCustomValidity('');
    }
    else
    {
        el.setCustomValidity(message);
    }

    let nextOfKin = el.nextElementSibling;
    while(!nextOfKin.classList.contains("error_msg"))
    {
        nextOfKin = nextOfKin.nextElementSibling;
    }
    nextOfKin.innerText = message;
}