import React from 'react';
import {useState} from 'react';
import {View, SafeAreaView} from 'react-native';

import {styles} from '../styles/styleApp';

import Button from './Button';
import Display from './Display';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [currentValue, setCurrentValue] = useState(0);

  const addDigit = n => {
    const clear = displayValue === '0' || clearDisplay;

    if (n === '.' && !clear && displayValue.includes('.')) {
      return;
    }

    const newDisplayValue = clear ? '' : displayValue;
    setDisplayValue(newDisplayValue + n);

    setClearDisplay(false);

    if (n !== '.') {
      const newValue = parseFloat(newDisplayValue + n);
      let copyValues = [...values];
      copyValues[currentValue] = newValue;
      setValues(copyValues);
    }
  };

  const setOperator = op => {
    const equals = op === '=';

    if (currentValue === 0) {
      if (equals) return;
      setOperation(op);
      setCurrentValue(1);
      setClearDisplay(true);
    } else {
      const copyValues = [...values];

      copyValues[0] = eval(`${copyValues[0]} ${operation} ${copyValues[1]}`);
      copyValues[1] = 0;

      setDisplayValue(`${copyValues[0]}`);
      setOperation(equals ? null : op);
      setCurrentValue(equals ? 0 : 1);
      setClearDisplay(true);
      setValues(copyValues);
    }
  };

  const clearMemory = () => {
    setDisplayValue('0');
    setClearDisplay(false);
    setValues([0, 0]);
    setCurrentValue(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperator} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setOperator} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setOperator} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setOperator} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperator} />
      </View>
    </SafeAreaView>
  );
}

export default App;
