function updateCompetitors(e) {
  let player = e.target.value;
  if (e.target.id.includes("1")) {
    document.getElementById("competitor1Name").textContent = player;
  } else {
    document.getElementById("competitor2Name").textContent = player;
  }
}
