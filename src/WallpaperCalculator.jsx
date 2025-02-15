import React, { useState } from 'react';
import './wallpaperstyle.css';


const WallpaperCalculator = () => {
  const [width, setWidth] = useState('');
  const [selectedHeight, setSelectedHeight] = useState('');
  const [addExcess, setAddExcess] = useState(false);
  const [results, setResults] = useState([]);
  const [totalArea, setTotalArea] = useState(null);

  const heights = [
    { label: '1.5 mts', value: 1.50 },
    { label: '2.3 mts', value: 2.30 },
    { label: '2.5 mts', value: 2.50 },
    { label: '2.8 mts', value: 2.80 },
    { label: '3.5 mts', value: 3.50 },
  ];

  const wallpaperWidths = [1.10]; // Anchos fijos del papel tapiz

  const calculateResults = (widthNum, heightNum, addExcess) => {
    let area = widthNum * heightNum;
    setTotalArea(area);

    if (addExcess) {
      area *= 1.15;
    }

    const calculatedResults = wallpaperWidths.map((wallpaperWidth) => {
      const rollArea = wallpaperWidth * heightNum;
      const rolls = Math.ceil(area / rollArea);
      return { width: wallpaperWidth, height: heightNum, rolls };
    });

    setResults(calculatedResults);
  };

  const handleCalculate = () => {
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(selectedHeight);

    if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0) {
      alert('Por favor, ingresa valores válidos.');
      return;
    }

    calculateResults(widthNum, heightNum, addExcess);
  };

  const handleExcessChange = (value) => {
    setAddExcess(value);
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(selectedHeight);

    if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0) {
      calculateResults(widthNum, heightNum, value);
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setSelectedHeight(newHeight);
    
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(newHeight);

    if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0) {
      calculateResults(widthNum, heightNum, addExcess);
    }
  };

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    
    const widthNum = parseFloat(newWidth);
    const heightNum = parseFloat(selectedHeight);

    if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0) {
      calculateResults(widthNum, heightNum, addExcess);
    }
  };

  return (
    <div className='wrapp-all-component-calculator'>
      <h3 className='text-heading-calculator'>Calculadora de Papel Tapiz</h3>
      <div className='wrapp-input'>
        <label>
          Ancho del espacio (m):
        </label>
        <input
          className='input-calculator'
            type="text"
            value={width}
            onChange={handleWidthChange}
          />
      </div>
      <div className='wrapp-input'>
        <label>
          Elije la altura que mas se asemeje a tu espacio (mts):
          (Estas son las alturas de nuestros paneles)          
        </label>
        <select
          className='input-calculator'
            value={selectedHeight}
            onChange={handleHeightChange}
          >
            <option value="">Seleccione una altura</option>
            {heights.map((height) => (
              <option key={height.value} value={height.value}>
                {height.label}
              </option>
            ))}
          </select>
      </div>
      <div className='wrapp-input-radio'>
        <label>
          <input
            type="radio"
            checked={addExcess}
            onChange={() => handleExcessChange(true)}
          />
          Incluir excedente
        </label>
        <label>
          <input
            type="radio"
            checked={!addExcess}
            onChange={() => handleExcessChange(false)}
          />
          Sin excedente
        </label>
      </div>
      <button className='btn-calcular' onClick={handleCalculate}>Calcular</button>
      {totalArea !== null && (
        <div>
          <h2 className='text-heading-calculator'>Área total del espacio: {totalArea.toFixed(2)} m²</h2>
        </div>
      )}
      {results.length > 0 && (
        <div>
          <h2 className='text-heading-calculator'>Resultado:</h2>
          

          <table id='resultado' className='table'>
            <tr>
               <th>Tamaño de nuestros paneles</th>
               <th>Paneles requeridos para tu espacio</th>
            </tr>
            {results.map(result => (
              <tr key={result.id}>
                <th>
                {result.width} mts x {result.height} mts
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


