// navigation logic
const nextButton = document.querySelector(".next-step-btn");
const prevButton = document.querySelector(".go-back-btn");
const sections = document.querySelectorAll(".sections");
let currentSection = 0;

function initNavigation (n, item) {
    item.forEach((slide, index) => {
      slide.style.display = "none";
    });
    item[n].style.display = "grid";

    // show user in which section he is 
    const steps = document.querySelectorAll(".step-index");
    steps.forEach((step) => {
        step.style.backgroundColor = "transparent";
        step.style.color = "white";
    });
    steps[n].style.backgroundColor = "hsl(206, 94%, 87%)";
    steps[n].style.color = "black";
}

initNavigation(currentSection, sections);

const next = () => {
    // validate input before activate navigation
    const nameInput = document.querySelector(".name-input");
    const mailInput = document.querySelector(".mail-input");
    const numberInput = document.querySelector(".number-input");
    const errorMessages = document.querySelectorAll(".error-message");

    // remove navigation if user reaches end
    if(currentSection == 3){
        const navigation = document.querySelector(".navigation").style.display = "none";
    }

    if(nameInput.value === ""){
        nameInput.style.borderColor = "hsl(354, 84%, 57%)";
        errorMessages[0].style.display = "block";
    }
    if(mailInput.value === ""){
        mailInput.style.borderColor = "hsl(354, 84%, 57%)";
        errorMessages[1].style.display = "block"; 
    }
    if(numberInput.value === ""){
        numberInput.style.borderColor = "hsl(354, 84%, 57%)";
        errorMessages[2].style.display = "block";
    }
    else{
        prevButton.style.visibility = "visible";
        currentSection >= sections.length - 1 ? currentSection = 4 : currentSection++;
        initNavigation(currentSection, sections);

        if(currentSection == 3){
            calcTotal_costs();
            nextButton.innerText = "Submit";
        }
        else{
            nextButton.innerText = "Next Step";
        }

        // set border color and error messages to default
        nameInput.style.borderColor = "hsl(229, 24%, 87%)";
        errorMessages[0].style.display = "none";
        mailInput.style.borderColor = "hsl(229, 24%, 87%)";
        errorMessages[1].style.display = "none"; 
        numberInput.style.borderColor = "hsl(229, 24%, 87%)";
        errorMessages[2].style.display = "none";
    }
}
const prev = () => {
    currentSection == 1 ? prevButton.style.visibility = "hidden" : prevButton.style.visibility = "visible";
    currentSection <= 0 ? currentSection = 0 : currentSection--;
    initNavigation(currentSection, sections);
}

nextButton.addEventListener("click", next);
prevButton.addEventListener("click", prev);

// toggle between monthly and yearly billing option
const toggleSwitch = document.querySelector(".toggle-switch");
toggleSwitch.addEventListener("click", switchBilling_option);

function switchBilling_option () {
    const circle = document.querySelector(".toggle-circle");
    circle.classList.toggle("transform-circle");

    const monthlyText = document.querySelector(".monthly");
    const yearlyText = document.querySelector(".yearly");

    if(circle.classList.contains("transform-circle")){
        // this styles the text if user uses the switch
        yearlyText.classList.add("change-color-marine-blue");
        yearlyText.classList.remove("change-color-cool-gray");

        monthlyText.classList.remove("change-color-marine-blue");
        monthlyText.classList.add("change-color-cool-gray");

        // change the values if user switches
        changeBilling_amounts("$90/yr", "$120/yr", "$150/yr", "+$10/yr", "+$20/yr", "+$20/yr", "year");

        // display discount offer
        displayDiscount("block");

        // change summary amounts to yr if user clicks toggle 
        changeSummary_amounts(`+$${10}/yr`, `+$${20}/yr`, `+$${20}/yr`, `+$${90}/yr`, `+$${120}/yr`, `+$${150}/yr`);
    }
    else{
        // this styles the text if user uses the switch
        yearlyText.classList.remove("change-color-marine-blue");
        yearlyText.classList.add("change-color-cool-gray");

        monthlyText.classList.remove("change-color-cool-gray");
        monthlyText.classList.add("change-color-marine-blue");

        // change the values if user switches
        changeBilling_amounts("$9/mo", "$12/mo", "$15/mo", "+$1/mo", "+$2/mo", "+$2/mo", "month");

        // hide discount offer
        displayDiscount("none");

        // change summary amounts to mo if user clicks toggle 
        changeSummary_amounts(`+$${1}/mo`, `+$${2}/mo`, `+$${2}/mo`, `+$${9}/yr`, `+$${12}/yr`, `+$${15}/yr`);
    }
}

// avoid mistakes if user switches toggle while elements are in summary list
function changeSummary_amounts(value1, value2, value3, value4, value5, value6) {
    const summaryList_elements = document.querySelectorAll(".element");
    summaryList_elements.forEach((element) => {
        const addOn_name = element.children[0]; 
        const addOn_amount = element.children[1]; 

        if(addOn_name.innerText == "Online Service"){
            addOn_amount.innerText = value1;
        }
        if(addOn_name.innerText == "Larger storage"){
            addOn_amount.innerText = value2;
        }
        if(addOn_name.innerText == "Customizable Profile"){
            addOn_amount.innerText = value3;
        }
    });

    const planTypes = document.querySelectorAll(".plan-type");
    const summaryHeader_amount = document.querySelector(".plan-amount"); 

    planTypes.forEach((type) => {
        if(type.innerText == "Arcade"){
            summaryHeader_amount.innerText = value4;
        }
        if(type.innerText == "Advanced"){
            summaryHeader_amount.innerText = value5;
        }
        if(type.innerText == "Pro"){
            summaryHeader_amount.innerText = value6;
        }

    });
}

function displayDiscount (displayType){
    const discounts = document.querySelectorAll(".year-discount");

    discounts.forEach((discount) => {
        discount.style.display = displayType;
    });
}

function changeBilling_amounts(value1, value2, value3, value4, value5, value6, value7) {
    const arcadeAmount = document.querySelector(".arcade-value");
    const advancedAmount = document.querySelector(".advanced-value");
    const proAmount = document.querySelector(".pro-value");
    const onlineService_amount = document.querySelector(".online-service-amount");
    const largerStorage_amount = document.querySelector(".larger-storage-amount");
    const customProfile_amount = document.querySelector(".custom-profile-amount");
    const total_month_year = document.querySelector(".month-year");

    arcadeAmount.innerText = value1;
    advancedAmount.innerText = value2;
    proAmount.innerText = value3;
    onlineService_amount.innerText = value4;
    largerStorage_amount.innerText = value5;
    customProfile_amount.innerText = value6;
    total_month_year.innerText = value7;
}

function calcTotal_costs() {
    // only number
    const planAmount = document.querySelector(".plan-amount");
    const newPlan_Amount = parseInt(planAmount.innerText.replace("$","").replace("/mo","").replace("/yr",""));
    const storeAddOn_amounts = [];

    const addOn_amounts = document.querySelectorAll(".add-on-amount");
    addOn_amounts.forEach((amount) => {
        const newAddOn_amount = parseInt(amount.innerText.replace("+$","").replace("/mo","").replace("/yr",""));
        storeAddOn_amounts.push(newAddOn_amount)
    });
    const newStoredAddOn_amounts = storeAddOn_amounts.reduce((a, b) => a + b, 0);

    // calc total and render in summary section
    const total = newPlan_Amount + newStoredAddOn_amounts;
    const container = document.querySelector(".total-amount");
    container.innerText = 
    `
    +$${total}
    `    
}

// change style of plan buttons if clicked and get plan with values
const planButtons = document.querySelectorAll(".billing-option");
planButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // get values and render in summary section
        const planName = button.children[1].childNodes[1].innerText;
        const summaryHeader = document.querySelector(".plan-option");
        summaryHeader.innerText = planName;

        const summaryHeader_amount = document.querySelector(".plan-amount");        
        const planAmount = button.children[1].childNodes[3].innerText;
        summaryHeader_amount.innerText = planAmount;
    });
});

//change add ons style and get values
const addOn_buttons = document.querySelectorAll(".add-on");
addOn_buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const checkBox = document.querySelectorAll(".checkbox");

        const addOn_name = addOn_buttons[index].children[0].children[1].children[0].innerText;
        const addOn_amount = addOn_buttons[index].children[1].children[0].innerText;

        const containerList = document.querySelector(".selected-add-ons-container");

        if(checkBox[index].checked == true){
            checkBox[index].checked = false;

            const summaryList_elements = document.querySelectorAll(".element");
            summaryList_elements.forEach((element) => {

                // check wich element user wants to remove and remove it then in summary section
                const addOn = element.children[0].innerText; 
                if(index == 0 && addOn  == "Online Service"){
                    element.remove();
                }
                if(index == 1 && addOn  == "Larger storage"){
                    element.remove();
                }
                if(index == 2 && addOn  == "Customizable Profile"){
                    element.remove();
                }
            });
        }
        else{

            // render add ons
            checkBox[index].checked = true;

            containerList.innerHTML +=
            `
            <div class="add-on element">
                <p class="add-on-name">${addOn_name}</p>
                <p class="add-on-amount">${addOn_amount}</p>
            </div>  
            `
        }
    });
});

// change button in summary
const changeButton = document.querySelector(".change-button");
changeButton.addEventListener("click", () => {
    location.reload();
});