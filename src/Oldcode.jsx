import React, { useState } from 'react';
import './wallpaperstyle.css';

const WallpaperCalculator = () => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [addExcess, setAddExcess] = useState(false);
  const [results, setResults] = useState([]);
  const [totalArea, setTotalArea] = useState(null);

  const wallpaperSizes = [
    { width: 1.20, height: 1.50 },
    { width: 1.20, height: 2.30 },
    { width: 1.20, height: 2.50 },
    { width: 1.20, height: 2.80 },
    { width: 1.20, height: 3.50 },
  ];

  const calculateResults = (widthNum, heightNum, addExcess) => {
    let area = widthNum * heightNum;
    setTotalArea(area);

    if (addExcess) {
      area *= 1.15;
    }

    const calculatedResults = wallpaperSizes.map((size, index) => {
      const rollArea = size.width * size.height;
      const rolls = Math.ceil(area / rollArea);
      return { id: index + 1, rolls, width: size.width, height: size.height };
    });

    setResults(calculatedResults);
  };

  const handleCalculate = () => {
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);

    if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
      alert('Por favor, ingresa valores válidos.');
      return;
     
      
    }

    calculateResults(widthNum, heightNum, addExcess);
    movein()
  };

  function movein() {
    window.location.href = "#resultado";
  }

  const handleExcessChange = (value) => {
    setAddExcess(value);
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);

    if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0 && heightNum > 0) {
      calculateResults(widthNum, heightNum, value);
    }
  };

  return (
    <div className='wrapp-all-component-calculator'>
      <h2 class="text-heading-calculator">Calculadora de Papel Tapiz</h2>
      <div className='wrapp-input-area'>
         <div className='wrapp-input'>
           <label>
             Ancho del espacio (m):
             <input
             className='input-calculator'
               type="text"
               value={width}
               onChange={(e) => setWidth(e.target.value)}
             />
           </label>
         </div>
         <p className='x-text'>X</p>
         <div className='wrapp-input'>
           <label>
             Alto del espacio (m):
             <input
             className='input-calculator'
               type="text"
               value={height}
               onChange={(e) => setHeight(e.target.value)}
             />
           </label>
         </div>
      </div>
      
      <div className='wrapp-radio-btn-exedente'>
        <label>
          <input
            type="checkbox"
            checked={addExcess}
            onChange={() => handleExcessChange(true)}
          />
          
          Incluir un 15% de excedente
        </label>
        <label>
          <input
            type="checkbox"
            checked={!addExcess}
            onChange={() => handleExcessChange(false)}
          />
          Sin excedente
        </label>
      </div>

      <button 
       onClick={handleCalculate}
       className='btn-calcular'
       >
        Calcular
      </button>
      {totalArea !== null && (
        <div className='wrapp-m2'>
          <p className='area-total'>Área total del espacio: {totalArea.toFixed(2)} m²</p>
        </div>
      )}
      {results.length > 0 && (
        <div>
          <h2>Resultado:</h2>
          <table id='resultado'>
            <tr>
               <th>Tamaño del papel</th>
               <th>Paneles requeridos</th>
            </tr>
            {results.map(result => (
              <tr key={result.id}>
                <th>
                {result.width} x {result.height} mts
                </th>
                <th>
                {result.rolls} - Paneles
                </th>
                
              </tr>
            ))}
            
          </table>
          
        </div>
      )}
    </div>
  );
};

export default WallpaperCalculator;
