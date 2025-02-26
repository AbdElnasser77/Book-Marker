var nameInput = document.getElementById('name');
var urlInput = document.getElementById('URL');
var closeButton = document.querySelector('.validation-div .close');
var validationModal = document.querySelector('.validation-container');


var Websites = [];

if(localStorage.getItem("URLS") != null)
{
    Websites = JSON.parse(localStorage.getItem("URLS"));
    DisplayWebsites(Websites);
}


function DisplayWebsites(Arr)
{

    var container = ``;
    for(var i = 0 ;i < Arr.length; i++){
        container += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${Arr[i].Name}</td>
                        <td><button class="btn1" onclick="VisitSite('${Arr[i].Url}')"><i class="fa-regular fa-eye "></i> Visit</button></td>
                        <td><button class="btn2" onclick="DeleteSite(${i})"><i class="fa-solid fa-trash "></i> Delete</button></td>
                    </tr>   
        `
    }
    document.getElementById('Table-Body').innerHTML = container;
}


function AddSite()
{
    if(Validation(nameInput.value,urlInput.value))
    {
        var site = {
            Name : nameInput.value,
            Url : urlInput.value
        }
        
        Websites.push(site);
        localStorage.setItem("URLS" , JSON.stringify(Websites));
        DisplayWebsites(Websites);
        ClearForm();
            
    }else{
        validationModal.style.display = "block";   
    }
}

function ClearForm()
{
        nameInput.value = "";
        urlInput.value = "";
}

function DeleteSite(index){
    Websites.splice(index,1);
    localStorage.setItem("URLS",JSON.stringify(Websites));
    DisplayWebsites(Websites);
}

function VisitSite(URL){
    var protocol = "https://";
    if(URL.includes(protocol))
        window.open(URL , "_blank");
    else
        window.open(protocol + URL , "_blank");

}

function Validation(name , url){
    var nameRegex = /^[a-zA-Z0-9]{3}/;
    var urlRegex = /^(https\:\/\/){0,1}(www.){0,1}[a-zA-Z0-9]+((\.com)|(\.co)){1}$/;
    if(nameRegex.test(name)&&urlRegex.test(url)) return true;
    else return false;
}

    var nameRegex = /^[a-zA-Z0-9]{3}/;
    var urlRegex = /^(https\:\/\/){0,1}(www.){0,1}[a-zA-Z0-9]+((\.com)|(\.co)){1}$/;

    nameInput.addEventListener('input', function(){
        if(nameRegex.test(nameInput.value)){
            nameInput.classList.replace("invalid", "valid");
            console.log("valid");
        }
        else {
            nameInput.classList.add("invalid");
        }
    })
   urlInput.addEventListener('input', function(){
        if(urlRegex.test(urlInput.value)){
            urlInput.classList.replace("invalid", "valid");
            console.log("valid");
        }
        else {
            urlInput.classList.add("invalid");
        }
    })

closeButton.addEventListener('click', function(){
     validationModal.style.display = "none";
});
document.querySelector('.validation-container .overlay').addEventListener('click',function (){
    validationModal.style.display = "none";
})
