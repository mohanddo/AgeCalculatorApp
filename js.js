let button = document.querySelector('button');
let day = document.querySelectorAll("input")[0];
let month = document.querySelectorAll("input")[1];
let year = document.querySelectorAll("input")[2];
let days = document.querySelectorAll("p:nth-child(1)")[2];
let months = document.querySelectorAll("p:nth-child(1)")[1];
let years = document.querySelectorAll("p:nth-child(1)")[0];
let invisibleP = document.querySelectorAll("p:nth-child(2)");
let P = document.querySelectorAll("input ~ p");
const error_invalid = (i) => {
    document.querySelectorAll("input ~ p")[i].classList.replace('hidden','p');
    document.querySelectorAll("input ~ p")[i].textContent = "Must be a valid date";
    document.querySelectorAll("label")[i].style.color = "red";
    document.querySelectorAll("input")[i].style.borderColor = "red";
    document.querySelectorAll("input")[i].style.caretColor = "red";
    document.querySelectorAll("input")[i].style.outlineWidth = 0;
};
const error_empty = (i) => {
    document.querySelectorAll("input ~ p")[i].classList.replace('hidden','p');
    document.querySelectorAll("input ~ p")[i].textContent = "This field is required";
    document.querySelectorAll("label")[i].style.color = "red";
    document.querySelectorAll("input")[i].style.borderColor = "red";
    document.querySelectorAll("input")[i].style.caretColor = "red";
    document.querySelectorAll("input")[i].style.outlineWidth = 0;
};
const restore = () => {
    for(let i = 0; i < document.querySelectorAll("input").length; i++) {
        document.querySelectorAll("input ~ p")[i].classList.replace('p','hidden');
        document.querySelectorAll("input ~ p")[i].textContent = "";
        document.querySelectorAll("label")[i].style.color = "hsl(0, 1%, 44%)";
        document.querySelectorAll("input")[i].style.borderColor = "hsl(0, 0%, 86%)";
        document.querySelectorAll("input")[i].style.caretColor = "hsl(259, 100%, 65%)";
        document.querySelectorAll("input")[i].style.outlineWidth = "px";
    }
}

button.addEventListener("click", () => {

    let validDate = true;

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    if(day.value.length === 0 || month.value.length === 0 || year.value.length === 0) {

        for(let i = 0; i < document.querySelectorAll("input").length; i++) {
            if(document.querySelectorAll("input")[i].value.length === 0) {
                error_empty(i);
            }
        }
        validDate = false;            
    } 

    if(parseInt(day.value) > 31 || 0 >= parseInt(day.value)) {
        error_invalid(0);
        validDate = false;       
    } 
    if(parseInt(month.value) > 12 || 0 >= parseInt(month.value)) {
        error_invalid(1);
        validDate = false;       
    } 
    if(parseInt(year.value) > currentYear) {
        error_invalid(2)
        validDate = false;
    } 
    
    if(validDate) {  

        restore();
        for(let i = 0; i < invisibleP.length; i++) {
            invisibleP[i].style.display = 'none';
        }

        days.classList.replace('parallelogram','small-p');
        months.classList.replace('parallelogram','small-p');
        years.classList.replace('parallelogram','small-p');
        
        years.textContent = ((parseInt(month.value) < currentMonth) 
        ? (currentYear - year.value) : ((parseInt(day.value) <= currentDay) && (parseInt(month.value) == currentMonth)) 
        ? (currentYear - year.value) : (currentYear - year.value - 1));

        months.textContent = (parseInt(day.value) > currentDay) ? ((parseInt(month.value) < currentMonth) ? currentMonth - parseInt(month.value) - 1 : 12 - parseInt(month.value) + currentMonth - 1) : ((parseInt(month.value) < currentMonth) ? currentMonth - parseInt(month.value) : 12 - parseInt(month.value) + currentMonth); 

        days.textContent = (currentDay < parseInt(day.value)) ? (30 + currentDay - parseInt(day.value)) : currentDay - parseInt(day.value); 
    }
})


