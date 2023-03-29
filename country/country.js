const url = new URL(location.href);
const yearID = url.searchParams.get("yearID");
const year = url.searchParams.get("year");
const regionID = url.searchParams.get("regionID");
const region = url.searchParams.get("region");
APILINK = 'https://countrybackend.wli2424.repl.co/api/v1/countries/';
dataAPILINK = 'https://locationdatabackend.wli2424.repl.co/api/v1/locationDatas/';

const title = document.getElementById("countryTitle");
const main = document.getElementById("add");
const list = document.getElementById("section");
const container = document.getElementById('container');

title.innerText = `Countries in the Region Of:`;
title.innerText += ' ' + region;

const divNav = document.createElement('div');
divNav.innerHTML= `
 <div class="topnav">
		<a class="active" href="../homepage/homepage.html"> Back to Homepage </a>
	</div>
 	<div class="topnav">
		<a class="active" href="../region/region.html?yearID=${yearID}&year=${year}"> Back to ${region} </a>
	</div>
`
container.appendChild(divNav);

const div_new = document.createElement('div');
div_new.innerHTML = `
    <div class="column">
      <div class="card">
          Add Countries
					<input type="text" id="new_country" value="">
		 			<select name="Shape" id="colorInput">
						<option value="default" selected disabled > Set Key Color </option>
						<option value="red"> Red </option>
						<option value="orange" > Orange </option>
						<option value="yellow"> Yellow </option>
            <option value="light-green"> Light Green </option> 
						<option value="green"> Green </option>
						<option value="light-blue"> Light Blue </option>
						<option value="dark-blue"> Dark Blue </option>
						<option value="purple"> Purple </option> 
            <option value="white"> White </option> 
            <option value="gray"> Gray </option> 
            <option value="dirt"> Dirt </option> 
            
					</select>
		 			<select name="Shape" id="shapeInput">
						<option value="default" selected disabled > Set Shape Key </option> 
						<option value="star"> Star </option>
            <option value="circle"> Circle </option>
            <option value="square"> Square </option>
            <option value="trapezoid"> Trapezoid </option>
					</select>
					<a href="#" onclick="saveCountry('new_country', 'shapeInput', 'colorInput')">Save </a>
      </div>
    </div>
`
main.appendChild(div_new)

returnCountries(APILINK);
function returnCountries(url){
  fetch(url + "yearID/" + yearID + "/regionID/" + regionID).then(res => res.json())
  .then(function(data){
  console.log(data);
  data.forEach(country => {
		console.log(country._id);
		console.log(country.country);
    console.log(country.shape);
    console.log()
      const div_card = document.createElement('div');
      const plotVal = document.createElement('div');
		  if (`${country.shape}` == "star"){
        plotVal.innerHTML = 
        `<div class="key">
          <img src="../shapes/star.png" class="shape ${country.color}">
        </div>
        `;
      }
      else if (`${country.shape}` == "circle"){
        plotVal.innerHTML = 
        `<div class="key">
          <img src="../shapes/circle.png" class="shape ${country.color}">
        </div>
        `;
      }
      else if (`${country.shape}` == "square"){
        plotVal.innerHTML = 
        `<div class="key">
          <img src="../shapes/star.png" class="shape ${country.color}">
        </div>
        `;
      }
      else if (`${country.shape}` == "trapezoid"){
        plotVal.innerHTML = 
        `<div class="key">
          <img src="../shapes/star.png" class="shape ${country.color}">
        </div>
        `;
      }
      // else if (`${country.shape}` == "star"){
      //   plotVal.innerHTML = 
      //   `<div>
      //     <img src="../shapes/star.png" class="${country.shape} ${country.color}">
      //   </div>
      //   `;
      // }
      div_card.innerHTML = `
      <div class="column">
        <div class="card" id="${country._id}">
        <div class="${country.shape} ${country.color}"> </div>
          ${country.country} <br>
          <div class="link">
        <a href="../locationData/data.html?yearID=${yearID}&year=${year}&regionID=${regionID}&region=${region}&countryID=${country._id}&country=${country.country}&shape=${country.shape}&color=${country.color}"> Link to Data for ${country.country} </a> <br>
      <div id="edit">
          <a href="#"onclick="editCountry('${country._id}','${country.country}', '${country.selection}')"> Edit</a> 
          |
          <a href="#" onclick="deleteCountry('${country._id}')"> Delete</a>
        </div>
      </div>
      `
      main.appendChild(plotVal);
      main.appendChild(div_card);
    });
  });
}

displayData(dataAPILINK);

function displayData(url){
  fetch(url + "yearID/" + yearID + "/regionID/" + regionID).then(res => res.json())
  .then(function(data){
  console.log(data);
  data.forEach(locationData => {
		let securityLvl = locationData.securityLvl;
		let capacityLvL = locationData.capacity;
		
		let idVal = securityLvl.toString() + capacityLvL.toString()
		console.log(idVal);

		const plotPosition = document.getElementById(idVal);
		const plotVal = document.createElement('div');
		if (`${locationData.shape}` == "star"){
      plotVal.innerHTML = 
      `<div class="plot">
              <img src="../shapes/star.png" class="shape ${locationData.color}">
        <div class="dataText"> 
             ${locationData.locationData}
        </div>
      </div>
      `;
  }
else  if (`${locationData.shape}` == "circle"){
      plotVal.innerHTML = 
      `<div class="plot">
              <img src="../shapes/circle.png" class="shape ${locationData.color}">
        <div class="dataText"> 
             ${locationData.locationData}
        </div>
      </div>
      `;
  }
else  if (`${locationData.shape}` == "square"){
      plotVal.innerHTML = 
      `<div class="plot">
              <img src="../shapes/square.png" class="shape ${locationData.color}">
        <div class="dataText"> 
             ${locationData.locationData}
        </div>
      </div>
      `;
  }
else  if (`${locationData.shape}` == "trapezoid"){
      plotVal.innerHTML = 
      `<div class="plot">
              <img src="../shapes/trapezoid.png" class="shape ${locationData.color}">
        <div class="dataText"> 
             ${locationData.locationData}
        </div>
      </div>
      `;
  }
		plotPosition.appendChild(plotVal);
		
    });
  });
}

function editCountry(id, country, selection) {
  const element = document.getElementById(id);
  const countryInputId = "country" + id;
	const shapeId = "shape" + id;
  
  element.innerHTML = `
		<div class = "edit">
			<p><strong>Country: </strong>
				<input type="text" id="${countryInputId}" value="${country}"> 
				<div id="${shapeId}"> ${selection} </div>
				<a href="#" onclick="saveCountry('${countryInputId}', '${shapeId}','${id}')"> Save </a>
		</div>  
				`
}

function saveCountry(countryInputId, shapeInput, colorInput, id="") {
  const country = document.getElementById(countryInputId).value;
	const shape = document.getElementById(shapeInput).value;
	const color = document.getElementById(colorInput).value;

	console.log(country + " " + shape + " "+ color );
 	if (id) {
		fetch(APILINK + id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
      body: JSON.stringify({"yearID": yearID, "regionID": regionID, "country": country, "color": color, "shape": shape})
    }).then(res => res.json())
      .then(res => {
				console.log("")
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
      body: JSON.stringify({"yearID": yearID, "regionID": regionID, "country": country, "color": color, "shape": shape})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}

function deleteCountry(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });    
}