import React from 'react';
import { Droplet, Thermometer, Settings, Scale } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="glass-panel recipe-section">
      <h2>Your Optimal Recipe</h2>
      
      <div className="metrics-grid">
        <div className="metric-box delay-1">
          <Scale className="metric-icon" size={28} />
          <div className="metric-value">{recipe.coffee}g</div>
          <div className="metric-label">Coffee Dose</div>
        </div>
        
        <div className="metric-box delay-2">
          <Droplet className="metric-icon" size={28} />
          <div className="metric-value">{recipe.water}g</div>
          <div className="metric-label">Water Dose</div>
        </div>
        
        <div className="metric-box delay-3">
          <Thermometer className="metric-icon" size={28} />
          <div className="metric-value">{recipe.tempDisplay}</div>
          <div className="metric-label">Water Temp</div>
        </div>
        
        <div className="metric-box delay-4">
          <Settings className="metric-icon" size={28} />
          <div className="metric-value" style={{ fontSize: recipe.grindDisplay.length > 5 ? '0.9rem' : '1.25rem' }}>
            {recipe.grindDisplay}
          </div>
          <div className="metric-label">Grind (Ode 2)</div>
        </div>
      </div>

      <h3 className="section-title">Preparation</h3>
      <ul className="prep-list">
        {recipe.prep.map((step, index) => (
          <li key={index} style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
            {step}
          </li>
        ))}
      </ul>

      <h3 className="section-title">Brewing Steps</h3>
      <div className="timeline">
        {recipe.brew.map((step, index) => (
          <div className="timeline-item" key={index} style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
            <div className="timeline-time">{step.time}</div>
            <div className="timeline-text">{step.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
