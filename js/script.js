var Name = document.getElementById('name');
var Url = document.getElementById('URL');

var Websites = [];

if(localStorage.getItem("URLS") != null){
    Websites = JSON.parse(localStorage.getItem("URLS"));
    DisplayWebsites(Websites);
}


function DisplayWebsites(Arr){

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


function AddSite(){
    var site = {
        Name : Name.value,
        Url : Url.value
    }

    Websites.push(site);
    localStorage.setItem("URLS" , JSON.stringify(Websites));
    DisplayWebsites(Websites);
    ClearForm();
}

function ClearForm(){
    Name.value = "";
    Url.value = "";
}

function DeleteSite(index){
    Websites.splice(index,1);
    localStorage.setItem("URLS",JSON.stringify(Websites));
    DisplayWebsites(Websites);
}




function VisitSite(URL){
    window.open(URL , "_blank");
}
