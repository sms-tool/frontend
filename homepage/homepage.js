const homepage = new URL(location.href);
const APILINK = 'https://yearbackend.wli2424.repl.co/api/v1/year/';

const main = document.getElementById("add");
const title = document.getElementById("title");
const list = document.getElementById("section");
const container = document.getElementById('container');

const divNav = document.createElement('div');
divNav.innerHTML= `
 <div class="topnav">
	<a class="active" href="#"> Back to Homepage </a>
`
container.appendChild(divNav);

const div_new = document.createElement('div');
div_new.innerHTML = `
    <div class="column">
      <div class="card">
        Add Year 
		<input type="text" id="new_year" value="">
		<a href="#" onclick="saveYear('new_year')">Save </a>
      </div>
    </div>
`
main.appendChild(div_new);


returnYears(APILINK);

function returnYears(url) {
	fetch(url).then(res => res.json())
		.then(function(data) {
			console.log(data);
			data.forEach(years => {
				const div_card = document.createElement('div');
				div_card.innerHTML = `
				<div class="column" id="${years._id}">
					<div class="card">
		 			<b> ${years.year} </b> <br>
					<div class="link">
						<a href="../region/region.html?yearID=${years._id}&year=${years.year}"> Link to Regions for ${years.year} </a> <br>
	 				<div>
		 			<div class = "buttons">
						<a href = "#" onclick="editYear('${years._id}','${years.year}')" >Edit</a>
						|
		 				<a href = "#" onclick="deleteYear('${years._id}')" >Delete</a>
	 				</div>
					</div>
				</div>`
				list.appendChild(div_card);
			});
		});
}

// region/region.html
///home/daedalus/Documents/SMStool_frontend/region/region.html

function editYear(id, year) {
  const element = document.getElementById(id);
  const yearInputId = "year" + id

  element.innerHTML = `
		<div class = "edit">
			<p><strong>Year: </strong>
			<input type="text" id="${yearInputId}" value="${year}"> 
			<a href="#" onclick="saveYear('${yearInputId}', '${id}',)"> Save </a>
		</div>
		`
}

function saveYear(yearInputId, id = "") {
	const year = document.getElementById(yearInputId).value;

	if (id) {
		fetch(APILINK + id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "year": year })
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
			body: JSON.stringify({ "year": year })
		}).then(res => res.json())
			.then(res => {
				console.log(res)
				location.reload();
			});
	}
}

function deleteYear(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });    
}