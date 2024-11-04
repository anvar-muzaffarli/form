const formEl = document.querySelector("#form")
const usernameEl = document.getElementById("username")
const emailEl = document.getElementById("email")
const passwordEl = document.getElementById("password")
const confirmPasswordEl = document.getElementById("confirm-password")



function showError(input, mesaj){
    const formElement = input.parentElement

    // formElement.classList.add("error")
    formElement.className= "form-control error"
    const smallTeqi = formElement.querySelector("small")
    smallTeqi.innerText = mesaj
}


function showSuccess(input) {
    const formElement = input.parentElement
    // formElement.classList.add("success")
    formElement.className = "form-control success"
}

// yoxlanishlar olan hisse


function checkEmailValidity(epoct) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(re.test(epoct.value.trim())) {
        showSuccess(epoct)
        return true 
    } else {
        showError(epoct, "Elektron poct standartlara uygun deyil")
        return false
    }
   
}

function checkUsernameLength(username){

    if(username.value.trim().length >= 2) {
       showSuccess(username)
        return true
    }
    else {
        showError(username, "Istifadeci adi minimum 2 simvol olmalidir")
        return false
    }
}

function checkPassword(shifre) {
    const shifreUcunQayda = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if(shifreUcunQayda.test(shifre.value.trim())) {
        showSuccess(shifre)
        return true
    }

    else {
        showError(shifre,"Shifrede en az 1 simvol, 1 herf ve 1 reqem olmalidir ve shifre 8 simvol olmalidir")
        return false
    }
}


function shifrelerinUygunlugunuYoxla(input1, input2) {
    if(input1.value === input2.value) {
        showSuccess(input2)
        return true
    }
    else {
        showError(input2, "Shifreler uygun deyil")
        return false
    }
}

// shifre kriteriyaya uygundurmu? bir dene herf bir dene reqem

//formlar uzerinde bash veren hadise tipleridir: blur, input,change, focus, submit
usernameEl.addEventListener("input", ()=> {
    if(usernameEl.value.trim()=== "") {
        showError(usernameEl, "Istifadeci adi bosh ola bilmez")
    }
    else {
       checkUsernameLength(usernameEl)
    }
})

emailEl.addEventListener("input", ()=> {
    if(emailEl.value.trim()=== "") {
        showError(emailEl, "Elektron poct bosh ola bilmez")
    }
    else {
        checkEmailValidity(emailEl)
    }
})

passwordEl.addEventListener("input", ()=> {
    if(passwordEl.value.trim()=== "") {
        showError(passwordEl, "Shifre bosh ola bilmez")
    }
    else {
        checkPassword(passwordEl)
    }
})


confirmPasswordEl.addEventListener("input", ()=> {
    if(confirmPasswordEl.value.trim()=== "") {
        showError(confirmPasswordEl, "Shifre tesdiqlenmesi bosh ola bilmez")
    }
    else {
        shifrelerinUygunlugunuYoxla(passwordEl,confirmPasswordEl)
    }
})


formEl.addEventListener("submit", function(e){
    //
    e.preventDefault()

    const istifadeciAdiDogrudurMu = checkUsernameLength(usernameEl)
    const elektronPoctunDogrudurMu = checkEmailValidity(emailEl)
    const shifreDogrudurMu = checkPassword(passwordEl)
    const shifrelerUygunGelir = shifrelerinUygunlugunuYoxla(passwordEl, confirmPasswordEl)

    if(istifadeciAdiDogrudurMu && elektronPoctunDogrudurMu && shifreDogrudurMu && shifrelerUygunGelir) {
        Swal.fire({
            title: "Ela",
            text: "Form tesdiqlendi",
            icon: "success"
          });
    }

    else {
        Swal.fire({
            title: "Oops",
            text: "Form gonderilmedi",
            icon: "error"
          });
    }

})