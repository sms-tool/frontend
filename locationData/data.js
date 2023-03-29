const url = new URL(location.href);
const yearID = url.searchParams.get("yearID")
const year = url.searchParams.get("year");
const regionID = url.searchParams.get("regionID");
const region = url.searchParams.get("region");
const countryID = url.searchParams.get("countryID")
const country = url.searchParams.get("country")
const shape = url.searchParams.get("shape")
const color = url.searchParams.get("color")
APILINK = 'https://locationdatabackend.wli2424.repl.co/api/v1/locationDatas/'

const title = document.getElementById("dataTitle");
const main = document.getElementById("add");
const list = document.getElementById("section");
const container = document.getElementById('container');
const dataTable = document.getElementById('dataTable');
const dataDisplay = document.getElementById('dataDisplay');
const dataInfos = document.getElementById('dataInfos');

const divNav = document.createElement('div');
divNav.innerHTML= `
    <div class="topnav">
	    <a class="active" href="../homepage/homepage.html"> Back to Homepage </a>
	</div>

 	<div class="topnav">
	    <a class="active" href="../region/region.html?yearID=${yearID}&year=${year}"> Back to ${region} </a>
	</div>
 	
    <div class="topnav">
		<a class="active" href="../country/country.html?yearID=${yearID}&year=${year}&regionID=${regionID}&region=${region}"> Back to ${country} </a>
	</div>
`
container.appendChild(divNav);

title.innerText = `Data for the Country Of:`;
title.innerText += ' ' + country;


const locationData = document.getElementById("dataTable").rows[1].cells[1];
locationData.innerHTML = `<input type="text" id="new_locationData" value="">`;
const securityLvl = document.getElementById("dataTable").rows[1].cells[2];
securityLvl.innerHTML = `<input type="text" id="new_securityLvl" value="">`;
const capacity = document.getElementById("dataTable").rows[1].cells[3];
capacity.innerHTML =" ";
const standard1 = document.getElementById("dataTable").rows[1].cells[4];
standard1.innerHTML = `<input type="text" id="new_standard1" value="">`;
const standard2 = document.getElementById("dataTable").rows[1].cells[5];
standard2.innerHTML = `<input type="text" id="new_standard2" value="">`;
const standard3 = document.getElementById("dataTable").rows[1].cells[6];
standard3.innerHTML = `<input type="text" id="new_standard3" value="">`;
const standard4 = document.getElementById("dataTable").rows[1].cells[7];
standard4.innerHTML = `<input type="text" id="new_standard4" value="">`;
const standard5 = document.getElementById("dataTable").rows[1].cells[8];
standard5.innerHTML = `<input type="text" id="new_standard5" value="">`;
const standard6 = document.getElementById("dataTable").rows[1].cells[9];
standard6.innerHTML = `<input type="text" id="new_standard6" value="">`;
const standard7 = document.getElementById("dataTable").rows[1].cells[10];
standard7.innerHTML = `<input type="text" id="new_standard7" value="">`;
const standard8 = document.getElementById("dataTable").rows[1].cells[11];
standard8.innerHTML = `<input type="text" id="new_standard8" value="">`;
const standard9 = document.getElementById("dataTable").rows[1].cells[12];
standard9.innerHTML = `<input type="text" id="new_standard9" value="">`;
const standard10 = document.getElementById("dataTable").rows[1].cells[13];
standard10.innerHTML = `<input type="text" id="new_standard10" value="">`;
const submit = document.getElementById("dataTable").rows[1].cells[14];
submit.innerHTML =
	`<a href="#" onclick="saveLocationData(
		'new_locationData', 
		'new_securityLvl', 
		'new_standard1',
		'new_standard2',
		'new_standard3',
		'new_standard4',
		'new_standard5',
		'new_standard6',
		'new_standard7',
		'new_standard8',
		'new_standard9',
		'new_standard10',
	)">Save </a>`

returnLocationDatas(APILINK);

displayData(APILINK);

function displayData(url){
  fetch(url + "yearID/" + yearID + "/regionID/" + regionID + "/countryID/" + countryID).then(res => res.json())
  .then(function(data){
  console.log(data);
  data.forEach(locationData => {
		let securityLvl = locationData.securityLvl;
		let capacityLvL = locationData.capacity;
		
		let idVal = securityLvl.toString() + capacityLvL.toString()
		// console.log(idVal);

		const plotPosition = document.getElementById(idVal);
		const plotVal = document.createElement('div');
        if (`${locationData.shape}` == "star"){
            plotVal.innerHTML = 
		        `<div class="plot">
                    <img src="../shapes/star.png" class="shape ${locationData.color}">
			        <div class="dataText"> 
	 		            ${locationData.locationData} , ${locationData.countryName}
			        </div>
		        </div>
            `;
        }
		else  if (`${locationData.shape}` == "circle"){
            plotVal.innerHTML = 
		        `<div class="plot">
                    <img src="../shapes/circle.png" class="shape ${locationData.color}">
			        <div class="dataText"> 
	 		            ${locationData.locationData} , ${locationData.countryName}
			        </div>
		        </div>
            `;
        }
		else  if (`${locationData.shape}` == "square"){
            plotVal.innerHTML = 
		        `<div class="plot">
                    <img src="../shapes/square.png" class="shape ${locationData.color}">
			        <div class="dataText"> 
	 		            ${locationData.locationData} , ${locationData.countryName}
			        </div>
		        </div>
            `;
        }
		else  if (`${locationData.shape}` == "trapezoid"){
            plotVal.innerHTML = 
		        `<div class="plot">
                    <img src="../shapes/trapezoid.png" class="shape ${locationData.color}">
			        <div class="dataText"> 
	 		            ${locationData.locationData} , ${locationData.countryName}
			        </div>
		        </div>
            `;
        }
		else if (`${locationData.shape}` == "triangle"){
			plotVal.innerHTML = 
			`<div class="plot">
			  <img src="../shapes/triangle.png" class="shape ${locationData.color}">
			  <div class="dataText"> 
					${locationData.locationData} , ${locationData.countryName}
				</div>
			</div>
			`;
		  }
		  else if (`${locationData.shape}` == "diamond"){
			plotVal.innerHTML = 
			`<div class="plot">
			  <img src="../shapes/diamond.png" class="shape ${locationData.color}">
			  <div class="dataText"> 
					${locationData.locationData} , ${locationData.countryName}
				</div>
			</div>
			`;
		  }
		plotPosition.appendChild(plotVal);
		// console.log("star plotted");
    });
  });
}

function returnLocationDatas(url){
  fetch(url + "yearID/" + yearID + "/regionID/" + regionID + "/countryID/" + countryID).then(res => res.json())
  .then(function(data){
  console.log(data);
  data.forEach(locationData => {
		let newRow = dataTable.insertRow(-1);

		let rowIndexCell = newRow.insertCell(0);
		let location = newRow.insertCell(1);
		let securityLvl = newRow.insertCell(2);
		let capacity = newRow.insertCell(3);
		let standard1 = newRow.insertCell(4);
		let standard2 = newRow.insertCell(5);
		let standard3 = newRow.insertCell(6);
		let standard4 = newRow.insertCell(7);
		let standard5 = newRow.insertCell(8);
		let standard6 = newRow.insertCell(9);
		let standard7 = newRow.insertCell(10);
		let standard8 = newRow.insertCell(11);
		let standard9 = newRow.insertCell(12);
		let standard10 = newRow.insertCell(13);
		let deleteCall = newRow.insertCell(14);

		let rowIndexVal = newRow.rowIndex;
		rowIndexCell.innerHTML = rowIndexVal-1;
		location.innerHTML = locationData.locationData;
		securityLvl.innerHTML = locationData.securityLvl;
		capacity.innerHTML = locationData.capacity;
		// console.log(locationData.capacity);
		standard1.innerHTML = locationData.standard1;
		standard2.innerHTML = locationData.standard2;
		standard3.innerHTML = locationData.standard3;
		standard4.innerHTML = locationData.standard4;
		standard5.innerHTML = locationData.standard5;
		standard6.innerHTML = locationData.standard6;
		standard7.innerHTML = locationData.standard7;
		standard8.innerHTML = locationData.standard8;
		standard9.innerHTML = locationData.standard9;
		standard10.innerHTML = locationData.standard10;
		deleteCall.innerHTML = `
			<a href="#" onclick="deletelocationData('${locationData._id}')"> Delete</a>
 		`;
    });
  });
}

function saveLocationData(
	locationDataInputId, 
	securityLvlInput, 
	standard1Input, 
	standard2Input,
	standard3Input,
	standard4Input,
	standard5Input,
	standard6Input,
	standard7Input,
	standard8Input,
	standard9Input,
	standard10Input,
	id=""
) {
  const locationData = document.getElementById(locationDataInputId).value;
	const securityLvl = document.getElementById(securityLvlInput).value;
	const standard1 = document.getElementById(standard1Input).value;
	const standard2 = document.getElementById(standard2Input).value;
	const standard3 = document.getElementById(standard3Input).value;
	const standard4 = document.getElementById(standard4Input).value;
	const standard5 = document.getElementById(standard5Input).value;
	const standard6 = document.getElementById(standard6Input).value;
	const standard7 = document.getElementById(standard7Input).value;
	const standard8 = document.getElementById(standard8Input).value;
	const standard9 = document.getElementById(standard9Input).value;
	const standard10 = document.getElementById(standard10Input).value;
 	if (id) {
		fetch(APILINK + id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
      body: JSON.stringify({
				"yearID": yearID, 
				"regionID": regionID, 
				"countryID": countryID, 
				"countryName": country,
				"locationData": locationData, 
				"securityLvl": securityLvl,
				"standard1": standard1,
				"standard2": standard2,
				"standard3": standard3,
				"standard4": standard4,
				"standard5": standard5,
				"standard6": standard6,
				"standard7": standard7,
				"standard8": standard8,
				"standard9": standard9,
				"standard10": standard10,
				"shape" : shape,
				"color" : color, 
			})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });        
  } else {
    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
				"yearID": yearID, 
				"regionID": regionID, 
				"countryID": countryID,
				"countryName": country, 
				"locationData": locationData, 
				"securityLvl": securityLvl,
				"standard1": standard1,
				"standard2": standard2,
				"standard3": standard3,
				"standard4": standard4,
				"standard5": standard5,
				"standard6": standard6,
				"standard7": standard7,
				"standard8": standard8,
				"standard9": standard9,
				"standard10": standard10,
				"shape" : shape,
				"color" : color,
			})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
				console.log("sucess")
        location.reload();
      });
  }
}

function deletelocationData(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });    
}