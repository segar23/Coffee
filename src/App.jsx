import React, { useState, useEffect } from 'react';
import RecipeCard from './components/RecipeCard';
import { calculateRecipe } from './utils/recipeLogic';

function App() {
  const [variety, setVariety] = useState('Generic / Unknown');
  const [processMethod, setProcessMethod] = useState('Washed');
  const [honeyLevel, setHoneyLevel] = useState('Yellow');
  const [brewMethod, setBrewMethod] = useState('AeroPress');
  const [flavorProfile, setFlavorProfile] = useState('Sweet & Balanced');
  const [cups, setCups] = useState(1);
  const [recipe, setRecipe] = useState(null);

  // Determine if cups should be locked based on brew method
  const isCupsLocked = ['Espresso', 'Moka Pot'].includes(brewMethod);

  // Reset cups to valid limits if method changes
  useEffect(() => {
    if (isCupsLocked) {
      setCups(1);
    } else if (brewMethod === 'AeroPress' && cups > 2) {
      setCups(2);
    }
  }, [brewMethod, isCupsLocked, cups]);

  useEffect(() => {
    // Auto-calculate on any change
    setRecipe(calculateRecipe(variety, processMethod, honeyLevel, brewMethod, flavorProfile, cups));
  }, [variety, processMethod, honeyLevel, brewMethod, flavorProfile, cups]);

  return (
    <>
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Colombian Coffee Configurator</h1>
        <p className="subtitle">Find your optimal brewing parameters</p>
      </div>
      
      <div className="app-container">
        <div className="glass-panel form-section">
          <h2>Coffee Details</h2>
          
          <div className="form-group">
            <label>Variety</label>
            <select value={variety} onChange={(e) => setVariety(e.target.value)}>
              <option value="Generic / Unknown">Generic / Unknown</option>
              <option value="Castillo">Castillo</option>
              <option value="Caturra">Caturra</option>
              <option value="Bourbon">Bourbon</option>
              <option value="Gesha">Gesha</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Processing Method</label>
            <select value={processMethod} onChange={(e) => setProcessMethod(e.target.value)}>
              <option value="Washed">Washed</option>
              <option value="Natural">Natural</option>
              <option value="Honey">Honey</option>
            </select>
          </div>
          
          {processMethod === 'Honey' && (
            <div className="form-group slide-in">
              <label>Honey Level</label>
              <select value={honeyLevel} onChange={(e) => setHoneyLevel(e.target.value)}>
                <option value="White">White Honey</option>
                <option value="Yellow">Yellow Honey</option>
                <option value="Red">Red Honey</option>
                <option value="Black">Black Honey</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Flavor Notes</label>
            <select value={flavorProfile} onChange={(e) => setFlavorProfile(e.target.value)}>
              <option value="Sweet & Balanced">Sweet & Balanced</option>
              <option value="Fruity & Floral">Fruity & Floral</option>
              <option value="Chocolate & Nutty">Chocolate & Nutty</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Brewing Method</label>
            <select value={brewMethod} onChange={(e) => setBrewMethod(e.target.value)}>
              <option value="AeroPress">AeroPress</option>
              <option value="Chemex">Chemex</option>
              <option value="Espresso">Espresso</option>
              <option value="Moka Pot">Moka Pot</option>
              <option value="French Press">French Press</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Number of Cups 
              {isCupsLocked && <span style={{fontSize: '0.8rem', color: 'var(--accent-color)', marginLeft: '8px', textTransform: 'none'}}>(Locked by Method)</span>}
            </label>
            <select 
              value={cups} 
              onChange={(e) => setCups(parseInt(e.target.value, 10))}
              disabled={isCupsLocked}
              style={{ opacity: isCupsLocked ? 0.6 : 1 }}
            >
              <option value={1}>1 Cup</option>
              <option value={2}>2 Cups {brewMethod === 'AeroPress' ? '(AeroPress XL)' : ''}</option>
              {brewMethod !== 'AeroPress' && <option value={3}>3 Cups</option>}
              {brewMethod !== 'AeroPress' && <option value={4}>4 Cups</option>}
            </select>
          </div>
        </div>

        <RecipeCard recipe={recipe} />
      </div>
    </>
  );
}

export default App;
