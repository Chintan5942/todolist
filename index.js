   function getAndUpdate(e) {
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (localStorage.getItem('items') == null) {
        if(tit===""||desc===""){
            alert("There Are No Data To Add")
        }
        else{
            itemJsonArray = [];
            itemJsonArray.push({ id: new Date().getTime().toString().slice(9, 12), tit, desc });
            localStorage.setItem('items', JSON.stringify(itemJsonArray))
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
        }
    }
    else {
        if(tit===""||desc===""){
            alert("There Are No Data To Add")
        }
        else{
            itemJsonArrayStr = localStorage.getItem('items')
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            itemJsonArray.push({ id: new Date().getTime().toString().slice(9, 12), tit, desc });
            localStorage.setItem('items', JSON.stringify(itemJsonArray))
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
        }
    }
    update();
    }
    function update() { //upadate into local storage
    if (localStorage.getItem('items') == null) {
        itemJsonArray = [];
        localStorage.setItem('items', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('items')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    let tableBody = document.getElementById("tableBody");    // Populate the table of the items
    let str = "";
    itemJsonArray.map((element, index) => {
        str += `<tr>
        <th scope="row">${index + 1}</th>
        <td  id="e_tit" class="fw-bold">${element.tit.slice(0, 20)}</td>
        <td id="e_desc" class="fw-bold">${element.desc.slice(0, 50)}</td> 
        <td><button class="btn btn-sm btn-outline-danger" onclick="deleted(${index})">Delete</button></td> 
        <td><button class="btn btn-sm btn-outline-warning" onclick="edited(${element.id})">Edit</button></td> </tr>`;
    });
    tableBody.innerHTML = str;    
    if (itemJsonArray.length == 0) { //if condition for the itemjsonarray is empty then hide clear button
        $("#clear").removeClass('hide');
        $("#clear").hide();
         }
    else {
        $("#clear").removeClass("hide");
        $("#clear").show();
        }
    }
//add button click event 
     $('#add').click(getAndUpdate);
    function deleted(itemIndex) {                      //delete the element
    itemJsonArrayStr = localStorage.getItem('items')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);     // Delete itemIndex element from the array
    localStorage.setItem('items', JSON.stringify(itemJsonArray));
    document.getElementById('title').value = '';
    document.getElementById('description').value = ''; 
    update();
    }
    function clearStorage() {       //clear all the data
    itemJsonArrayStr = localStorage.getItem('items')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    if (confirm("Do you really want to clear?")) {
        localStorage.clear();
        update()
    }
    }
    let ed = {};
    const edited = (id) => {           //edit button for edit in localstorage
    tit = document.getElementById('title');
    desc = document.getElementById('description');
    newedit = itemJsonArray.filter(ele => {
    return ele.id == id;
    })
    ed = newedit;
    tit.value = ed[0].tit;
    desc.value = ed[0].desc;
    $("#save").removeClass("hide");
    $("#save").show();
    $('#add').hide();
    $("#clear").removeClass("hide");
    $('#clear').hide();
    }
const saved = () => {       //after edit save in localstorage
    let id = ed[0].id;
    tit = document.getElementById('title');
    desc = document.getElementById('description');
    itemJsonArrayStr = localStorage.getItem('items')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    ed[0].tit = tit.value;
    ed[0].desc = desc.value;
        itemJsonArray.filter(ele => {
        if (ele.id == id) {
            if(ed[0].tit!=""&&ed[0].desc!=""){
            ele.id = id;
            ele.tit = ed[0].tit;
            ele.desc = ed[0].desc;
            localStorage.setItem('items', JSON.stringify(itemJsonArray))
            update(); 
            }
          else{
                alert("No Data Found");
               }
        };
     })
    $("#save").hide();
    $('#add').show();
    $('#clear').show()
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}
//for filter and search in to the table data
    $(document).ready(function () {
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tableBody tr").filter(function () {
            $(this).toggle($(this).text()
                .toLowerCase().indexOf(value) > -1)
        });
     });
    });
    update();