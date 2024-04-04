import React from 'react';
import './styles.css';

import CalcButton from './components/CalcButton'; 
import Number from './components/Number';
import MathFunc from './components/MathFunc'
import Decimal from './components/Decimal';
import Clear from './components/Clear'

function App() {
  return (
    <div className='flex justify-center align-center mt-[25vh]'>
      <div id='calculator' className="grid grid-cols-4 text-center gap-1">
        <Clear />
        <MathFunc func='subtract' />
        <MathFunc func='multiply' />

        <Number num='seven' />
        <Number num='eight' />
        <Number num='nine' />
        <MathFunc func='divide' />

        <Number num='four' />
        <Number num='five' />
        <Number num='six' />
        <MathFunc func='add' />

        <Number num='one' />
        <Number num='two' />
        <Number num='three' />
        <Decimal />
        
        <Number num='zero' />
        <CalcButton />
      </div>
    </div>
  );
}

export default App;
