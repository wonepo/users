let data = [];

function loadDataAndInit() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            data = [...json];

            //Loading last view (1 for Table and 2 for card)
            let bool = (localStorage.getItem("viewType") == null) ? 1 : localStorage.getItem("viewType");
            toogleClick(bool);

            //add evendlisterner for switch view button
            const buttonEvent = document.getElementById('btn-group');
            buttonEvent.addEventListener('click', (event) => {
                document.getElementById('txt-search').value = "";
                toogleClick((event.target.name == "btn-table") ? 1 : 2);
            });

            //add eventlisternet to select button used to sort
            const selectEvent = document.getElementById("slt-sort");
            selectEvent.addEventListener('change', (event) => {
                //console.log(selectEvent.value)
                if (selectEvent.value != -1)
                    printData(localStorage.getItem("viewType"),
                        data.toSorted((a, b) => {
                            let value = 0;
                            switch (parseInt(selectEvent.value)) {
                                case 0:
                                    console.log(selectEvent.value)
                                    value = a.name.localeCompare(b.name);
                                    break;
                                case 1:
                                    value = a.email.localeCompare(b.email);
                                    break;
                                case 2:
                                    value = a.phone.localeCompare(b.phone);
                                    break;
                                default:
                                    break;
                            }
                            return (value)
                        }))
            })

            //add evenlisterner for search text
            const textEvent = document.getElementById('txt-search')
            textEvent.addEventListener('input', (event) => { //keypress
                const searchTxt = textEvent.value
                const viewType = localStorage.getItem("viewType")
                if (searchTxt.length > 2) {
                    printData(viewType, data.filter(({ name }) => name.toLowerCase().includes(searchTxt.toLowerCase())))
                } else {
                    const count = document.querySelectorAll((viewType == 1) ? '#id-table > tr' : '#id-card > div').length;
                    if (count != data.length) toogleClick(viewType)
                }
            });
        })
}

//switch button
function toogleClick(viewType) {
    //if (boolParam != localStorage.getItem("viewType")) {
    localStorage.setItem("viewType", viewType)
    if (viewType == 1) {
        document.getElementsByName("btn-table")[0].classList.add('active');
        document.getElementsByName("btn-card")[0].classList.remove('active');
    } else {
        document.getElementsByName("btn-table")[0].classList.remove('active');
        document.getElementsByName("btn-card")[0].classList.add('active');
    }
    printData(viewType, data);
    //}
}

//print table or card
function printData(viewType, data) {
    document.getElementById("root").innerHTML = (viewType == 1) ? printTable(data) : printCard(data);
}

//print table header only
function printTable(data) {
    return (
        `<table class="w-full text-gray-500 border border-gray-200 sm:px-2">
            <thead class="uppercase bg-gray-50  border-b border-gray-200">
                <tr>
                <th class="px-6 py-3">Nom</th>
                <th class="px-6 py-3">Email</th>
                <th class="px-6 py-3">Telephone</th>
                </tr>
            </thead>
            <tbody id="id-table">
                ${printTableRow(data)}
            </tbody>
        </table>`
    )
}

//print table rows
function printTableRow(data) {
    return (
        data.map(({ name, phone, email }) => `
        <tr class="bg-gray-50 border-b border-gray-200 hover:bg-blue-100">
            <td class="py-2 pl-1">${name}</td>
            <td class="py-2">${email}</td>
            <td class="py-2">${phone}</td>
        </tr>`).join("")
    )
}

//print card header tag
function printCard(data) {
    return (
        `<div id="id-card" class="pt-4 w-full px-1 gap-4 flex justify-center flex-wrap">
        ${printCardRow(data)}
        </div>`
    )
}

//print table rows
function printCardRow(data) {
    return (
        data.map(({ name, phone, email }) =>
            `<div class="w-full sm:w-[48%] p-2 border border-gray-200 rounded bg-gray-50 hover:bg-blue-100">
                <span class="block font-extrabold">${name}</span> 
                <span class="block ">${email}</span> 
                <span class="block ">${phone}</span>
            </div>`).join("")
    )
}
