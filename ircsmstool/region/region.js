const url = new URL(location.href);
const yearID = url.searchParams.get("yearID")
const year = url.searchParams.get("year");
APILINK = 'https://regionsbackend.wli2424.repl.co/api/v1/regions/';
dataAPILINK = 'https://locationdatabackend.wli2424.repl.co/api/v1/locationDatas/';

const title = document.getElementById("regionTitle");
const main = document.getElementById("add");
const list = document.getElementById("section");
const container = document.getElementById('container');

const divNav = document.createElement('div');
divNav.innerHTML= `
 <div class="topnav">
		<a class="active" href="../homepage/homepage.html"> Back to Homepage </a>
`
container.appendChild(divNav);

title.innerText = `Regions for `;
title.innerText += ' ' + year;

const div_new = document.createElement('div');
div_new.innerHTML = `
    <div class="column">
      <div class="card">
          Add Regions
					<input type="text" id="new_region" value="">
					<a href="#" onclick="saveRegion('new_region')">Save </a>
      </div>
    </div>
`
main.appendChild(div_new)

returnRegions(APILINK);
function returnRegions(url){
  fetch(url + "yearID/" + yearID).then(res => res.json())
  .then(function(data){
  console.log(data);
  data.forEach(region => {
      const div_card = document.createElement('div');
      div_card.innerHTML = `
        <div class="column">
        <div class="card" id="${region._id}">
				<div class="link">
				<a href="../country/country.html?yearID=${yearID}&year=${year}&regionID=${region._id}&region=${region.region}"> ${region.region} </a> <br>
	 			<div id="edit">
                <a href="#"onclick="editRegion('${region._id}','${region.region}')"> Edit</a> 
				|
				<a href="#" onclick="deleteRegion('${region._id}')"> Delete</a> 
              </div>
            </div>
        `

      main.appendChild(div_card);
    });
  });
}

displayData(dataAPILINK);
function displayData(url){
  fetch(url + "yearID/" + yearID).then(res => res.json())
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
		
    });
  });
}

function editRegion(id, region) {
  const element = document.getElementById(id);
  const regionInputId = "region" + id
  
  element.innerHTML = `
		<div class = "edit">
			<p><strong>Region: </strong>
				<input type="text" id="${regionInputId}" value="${region}"> 
				<a href="#" onclick="saveRegion('${regionInputId}', '${id}',)"> Save </a>
		</div>  
				`
}

function saveRegion(regionInputId, id="") {
  const region = document.getElementById(regionInputId).value;
 	if (id) {
		fetch(APILINK + id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
      body: JSON.stringify({"yearID": yearID, "region": region})
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
      body: JSON.stringify({"yearID": yearID, "region": region})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}

function deleteRegion(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });    
}