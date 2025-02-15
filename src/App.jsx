import { useState } from 'react';
import './App.css';
import WallpaperCalculator from './WallpaperCalculator';

function App() {
    const [showCalculator, setShowCalculator] = useState(false);

    return (
        <div className="App">
            <button 
                className="btn-calcular-active"
                onClick={() => setShowCalculator(true)}
            >
                CALCULAR
            </button>

            {showCalculator && (
                <>
                    <div 
                        className="calculator-overlay"
                        onClick={() => setShowCalculator(false)}
                    />
                    <div className={`calculator-popup ${showCalculator ? 'show' : ''}`}>
                        <button 
                            className="close-button"
                            onClick={() => setShowCalculator(false)}
                        >
                            ×
                        </button>
                        <WallpaperCalculator />
                    </div>
                    
                </>
            )}
        </div>
    );
}

export default App;