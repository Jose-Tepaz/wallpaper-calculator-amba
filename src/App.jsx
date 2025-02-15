import { useState } from 'react';
import './App.css';
import WallpaperCalculator from './WallpaperCalculator';

function App() {
    const [showCalculator, setShowCalculator] = useState(false);
    const [calculatorKey, setCalculatorKey] = useState(0);

    return (
        <div className="App">
            <button 
                className="btn-calcular-active"
                onClick={() => setShowCalculator(true)}
            >
                CALCULAR
            </button>

            <div className={`calculator-popup ${showCalculator ? 'show' : ''}`}>
                <button 
                    className="close-button"
                    onClick={() => setShowCalculator(false)}
                >
                    ×
                </button>
                <WallpaperCalculator key={calculatorKey} />
            </div>

            {showCalculator && (
                <div 
                    className="calculator-overlay"
                    onClick={() => setShowCalculator(false)}
                />
            )}
        </div>
    );
}

export default App;