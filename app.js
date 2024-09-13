const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Load the states data from JSON file
const states = require('./data/states.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// GET Route: Render landing page
app.get('/', (req, res) => {
  res.render('landing');
});

// GET Route: Render index page
app.get('/index', (req, res) => {
  res.render('index', { states: states, selectedState: null });
});

// POST Route: Display selected state data
app.post('/index', (req, res) => {
  const selectedState = states.find(state => state.state === req.body.state);
  res.render('index', { states: states, selectedState: selectedState });
});

// GET Route: Get all state names
app.get('/states', (req, res) => {
  const stateNames = states.map(state => state.state);
  res.json(stateNames);
});

// GET Route: Get GDP of a specific state
app.get('/states/:state/gdp', (req, res) => {
  const state = states.find(state => state.state === req.params.state);
  if (state) {
    res.json({ state: state.state, gdp: state.gdp });
  } else {
    res.status(404).json({ error: 'State not found' });
  }
});

// GET Route: Get governor of a specific state
app.get('/states/:state/governor', (req, res) => {
  const state = states.find(state => state.state === req.params.state);
  if (state) {
    res.json({ state: state.state, governor: state.governor });
  } else {
    res.status(404).json({ error: 'State not found' });
  }
});

// GET Route: Get general data of a specific state
app.get('/states/:state', (req, res) => {
  const state = states.find(state => state.state === req.params.state);
  if (state) {
    res.json(state);
  } else {
    res.status(404).json({ error: 'State not found' });
  }
});

// GET Route: Get population of a specific state
app.get('/states/:state/population', (req, res) => {
  const state = states.find(state => state.state === req.params.state);
  if (state) {
    res.json({ state: state.state, population: state.population });
  } else {
    res.status(404).json({ error: 'State not found' });
  }
});

// GET Route: Get all governors
app.get('/governors', (req, res) => {
  const governors = states.map(state => ({ state: state.state, governor: state.governor }));
  res.json(governors);
});

// GET Route: Get all GDPs
app.get('/gdps', (req, res) => {
  const gdps = states.map(state => ({ state: state.state, gdp: state.gdp }));
  res.json(gdps);
});

// GET Route: Get all landmasses
app.get('/landmasses', (req, res) => {
  const landmasses = states.map(state => ({ state: state.state, landmass: state.landmass }));
  res.json(landmasses);
});

// GET Route: Get all data for all states
app.get('/all-states-data', (req, res) => {
  res.json(states);
});

// Start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
