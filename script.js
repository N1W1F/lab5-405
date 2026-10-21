// Player data based on the CPIT405 lab starter repository (historical sample values).
// Each item is a JavaScript object inside the data array.
const data = [
  ["Joel Embiid","Philadelphia 76ers (PHI)",33,10.8,5.7],
  ["Jalen Brunson","New York Knicks (NYK)",32.4,3.3,7.5],
  ["Shai Gilgeous-Alexander","Oklahoma City Thunder (OKC)",30.2,7.2,6.4],
  ["Tyrese Maxey","Philadelphia 76ers (PHI)",29.8,5.2,6.8],
  ["Donovan Mitchell","Cleveland Cavaliers (CAVS)",29.6,5.4,4.7],
  ["Luka Dončić","Dallas Mavericks (DAL)",28.9,9.5,8.1],
  ["Nikola Jokić","Denver Nuggets (DEN)",28.7,13.4,8.7],
  ["Anthony Davis","Los Angeles Lakers (LAL)",27.8,15.6,4],
  ["LeBron James","Los Angeles Lakers (LAL)",27.8,6.8,8.8],
  ["Anthony Edwards","Minnesota Timberwolves (MIN)",27.6,7,6.5],
  ["Devin Booker","Phoenix Suns (PHX)",27.5,3.3,6],
  ["Paolo Banchero","Orlando Magic (ORL)",27,8.6,4],
  ["Kevin Durant","Phoenix Suns (PHX)",26.8,6.5,3.3],
  ["Jayson Tatum","Boston Celtics (BOS)",25,9.7,6.3],
  ["Khris Middleton","Milwaukee Bucks (MIL)",24.7,9.2,4.7],
  ["Jaylen Brown","Boston Celtics (BOS)",23.9,5.9,3.3],
  ["Bam Adebayo","Miami Heat (MIA)",22.6,9.4,3.8],
  ["Kyrie Irving","Dallas Mavericks (DAL)",22.1,3.7,5.1],
  ["Pascal Siakam","Indiana Pacers (IND)",21.6,7.5,3.8],
  ["James Harden","Los Angeles Clippers (LAC)",21.2,4.5,8],
  ["Jamal Murray","Denver Nuggets (DEN)",20.6,4.3,5.6],
  ["Paul George","Los Angeles Clippers (LAC)",19.5,6.8,4.8],
  ["Karl-Anthony Towns","Minnesota Timberwolves (MIN)",19.1,9,2.6],
  ["Franz Wagner","Orlando Magic (ORL)",18.9,6.9,4.4],
  ["Jalen Williams","Oklahoma City Thunder (OKC)",18.7,6.8,5.4],
  ["Tyrese Haliburton","Indiana Pacers (IND)",18.7,4.8,8.2],
  ["Donte DiVincenzo","New York Knicks (NYK)",17.8,4,2.6],
  ["CJ McCollum","New Orleans Pelicans (NOP)",17.8,4.8,4.8],
  ["Brook Lopez","Milwaukee Bucks (MIL)",17.7,4.3,1.8],
  ["Myles Turner","Indiana Pacers (IND)",17,6.6,2.1],
  ["Austin Reaves","Los Angeles Lakers (LAL)",16.8,3.8,3.6],
  ["Tyler Herro","Miami Heat (MIA)",16.8,3.6,5.4],
  ["Derrick White","Boston Celtics (BOS)",16.7,4.3,4.1],
  ["Bobby Portis","Milwaukee Bucks (MIL)",16.5,11.3,1],
  ["Bradley Beal","Phoenix Suns (PHX)",16.5,2.8,4.5],
  ["Ivica Zubac","Los Angeles Clippers (LAC)",16.2,9.3,1],
  ["Evan Mobley","Cleveland Cavaliers (CAVS)",16,9.3,2.3],
  ["Michael Porter Jr.","Denver Nuggets (DEN)",15.8,6.8,1.1],
  ["Darius Garland","Cleveland Cavaliers (CAVS)",15.7,3.6,5.8],
  ["Chet Holmgren","Oklahoma City Thunder (OKC)",15.6,7.2,2.1],
  ["Andrew Nembhard","Indiana Pacers (IND)",14.9,3.3,5.5],
  ["Jalen Suggs","Orlando Magic (ORL)",14.7,5.1,3.3],
  ["Josh Hart","New York Knicks (NYK)",14.5,11.5,4.5],
  ["Jonas Valančiūnas","New Orleans Pelicans (NOP)",14.5,11,1.3],
  ["Aaron Gordon","Denver Nuggets (DEN)",14.3,7.3,4.4],
  ["Brandon Ingram","New Orleans Pelicans (NOP)",14.3,4.5,3.3],
  ["D'Angelo Russell","Los Angeles Lakers (LAL)",14.2,2.8,4.2],
  ["Kelly Oubre Jr.","Philadelphia 76ers (PHI)",13.2,4,1.7],
  ["Jrue Holiday","Boston Celtics (BOS)",13.2,6.1,4.4]
].map(([name,team,points,rebounds,assists]) => ({name,team,points,rebounds,assists}));

const playerRows = document.getElementById('player-rows');
const searchInput = document.getElementById('search');
const teamFilter = document.getElementById('team-filter');
const darkModeButton = document.getElementById('dark-mode-toggle');
const headers = document.querySelectorAll('#player-stats th');
let sortKey = null;
let sortAscending = true;

// Populate team options dynamically from unique team names.
function populateTeams() {
  const teams = [...new Set(data.map(player => player.team))].sort();
  teams.forEach(team => {
    const option = document.createElement('option');
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
  });
  document.getElementById('total-teams').textContent = teams.length;
}

// Build the table using DOM methods rather than hardcoded HTML rows.
function renderPlayers(players) {
  playerRows.replaceChildren();
  const fragment = document.createDocumentFragment();
  players.forEach(player => {
    const row = document.createElement('tr');
    ['name','team','points','rebounds','assists'].forEach(key => {
      const cell = document.createElement('td');
      cell.textContent = player[key];
      row.appendChild(cell);
    });
    fragment.appendChild(row);
  });
  playerRows.appendChild(fragment);
  document.getElementById('visible-players').textContent = players.length;
  document.getElementById('no-results').hidden = players.length !== 0;
}

// Search and filter simultaneously, then apply optional sorting.
function updateTable() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const selectedTeam = teamFilter.value;
  const filtered = data.filter(player =>
    player.name.toLocaleLowerCase().includes(query) &&
    (selectedTeam === 'all' || player.team === selectedTeam)
  );
  if (sortKey) {
    filtered.sort((a,b) => {
      const comparison = typeof a[sortKey] === 'number'
        ? a[sortKey] - b[sortKey]
        : a[sortKey].localeCompare(b[sortKey]);
      return sortAscending ? comparison : -comparison;
    });
  }
  renderPlayers(filtered);
}

searchInput.addEventListener('input', updateTable);
teamFilter.addEventListener('change', updateTable);
darkModeButton.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  darkModeButton.setAttribute('aria-pressed', String(isDark));
  darkModeButton.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});

// Event delegation: one click listener on the header row handles all headings.
document.querySelector('#player-stats thead').addEventListener('click', (event) => {
  const header = event.target.closest('th[data-key]');
  if (!header) return;
  const key = header.dataset.key;
  sortAscending = (sortKey === key) ? !sortAscending : true;
  sortKey = key;
  headers.forEach(h => {
    h.textContent = h.dataset.key[0].toUpperCase() + h.dataset.key.slice(1) + (h === header ? (sortAscending ? ' ↑' : ' ↓') : ' ↕');
    h.setAttribute('aria-sort', h === header ? (sortAscending ? 'ascending' : 'descending') : 'none');
  });
  updateTable();
});
document.querySelector('#player-stats thead').addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('th[data-key]')) {
    event.preventDefault();
    event.target.click();
  }
});

document.getElementById('total-players').textContent = data.length;
populateTeams();
updateTable();
