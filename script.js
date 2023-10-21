function validateForm() {
    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var quantity = document.getElementById("quantity");
    var address = document.getElementById("address");
    var errorName = document.getElementById('errorName');
    var errorPhone = document.getElementById('errorPhone');
    var errorQuantity = document.getElementById('errorQuantity');
    var errorAddress = document.getElementById('errorAddress');
    
    // Reset error messages
    errorName.textContent = '';
    errorPhone.textContent = '';
    errorQuantity.textContent = '';
    errorAddress.textContent = '';

    if (name.value === "") {
        errorName.textContent = 'Please insert your name';
        name.focus();
        return false;
    }
    
    if (phone.value === "") {
        errorPhone.textContent = 'Please insert your phone number';
        phone.focus();
        return false;
    }
    
    // Use a regular expression to validate the phone number
    var phonePattern = /^(62\d{10,13})$/; // Assumes a valid Indonesian phone number
    if (!phonePattern.test(phone.value)) {
        errorPhone.textContent = "Please insert a valid phone number started with 62";
        phone.focus();
        return false;
    }

    if (isNaN(quantity.value) || quantity.value === "") {
        errorQuantity.textContent = 'Please enter a valid quantity';
        quantity.focus();
        return false;
    }

    if (address.value === "") {
        errorAddress.textContent = 'Please tell us where you want it delivered';
        address.focus();
        return false;
    }

    return true;
}

function generateWhatsAppLink() {
    if (validateForm()) {
        var phone = document.getElementById("phone").value;
        var name = document.getElementById("name").value;
        var order = document.getElementById("orders").value;
        var quantity = document.getElementById("quantity").value;
        var message = document.getElementById("subject").value;
        var address = document.getElementById("address").value;

        var text = "Hi, DouxButter! My name is " + name +
                   " reaching out to make a delightful order. and here is the form:" + "%0A" +
                   "Phone: " + phone + "%0A" +
                   "Order: " + order + "%0A" +
                   "Quantity: " + quantity + "%0A" +
                   "Custom Message: " + message + "%0A" +
                   "Address: " + address + "%0A" +
                   "I am expecting the order pretty soon!";

        var whatsappLink = "https://wa.me/6285695781433?text=" + text;
        window.location.href = whatsappLink; // Redirect the user to WhatsApp with the generated link
    }
}
