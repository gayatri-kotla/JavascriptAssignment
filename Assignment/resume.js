let applicantsData;
let currentIndex = 0,
  totalApplicants = 0;

const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
async function handleSubmit(event) {
  event.preventDefault();

  const jobFilterInput = document.getElementById("jobFilterInput");

  let data = await fetch("Applicants.json");
  let response = await data.json();
  applicantsData = response.resume;

  console.log(applicantsData);

  applicantsData = applicantsData.filter((item) => {
    if (
      item.basics.AppliedFor.toLowerCase().startsWith(
        jobFilterInput.value.toLowerCase()
      )
    )
      return item;
  });
  totalApplicants = applicantsData.length;
  console.log(applicantsData);
  displayResume();
}
function fillResumeContainer(data) {
  const divCon = document.createElement("div");
  let content = `
<div>

<div id="header">
<h1 >${data.basics.name}</h1>
<h3>Applied For: ${data.basics.AppliedFor}</h3>
</div>

<div class="contentcontainer">
<h4 class="contentheading">Work Experience in previous company</h4>
<div class="content">
<h6>Company Name:${data.Internship.Company.Name}</h6>
</div>
</div>

</div>

`;
  divCon.innerHTML = content;
  return divCon;
}
function displayResume() {
  const resumeContainer = document.getElementById("resumeContainer");
  resumeContainer.innerHTML = "";
  resumeContainer.appendChild(
    fillResumeContainer(applicantsData[currentIndex])
  );
  handleButtonDisplay();
}
function handlePrevClick() {
  if (currentIndex > 0) {
    currentIndex--;
  }
  console.log("prevclick");
  displayResume();
}
function handleNextClick() {
  if (currentIndex < totalApplicants - 1) {
    currentIndex++;
  }
  console.log("nextclick");
  displayResume();
}
function handleButtonDisplay() {
  if (currentIndex == 0) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "inline";
  }
  if (currentIndex < totalApplicants - 1) {
    nextButton.style.display = "inline";
  } else {
    nextButton.style.display = "none";
  }
}
