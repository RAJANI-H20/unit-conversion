const express = require('express');
const router = express.Router();

const conversions = {
  temperature: {
    celsius: {
      fahrenheit: (value) => (value * 9/5) + 32,
      kelvin: (value) => value + 273.15
    },
    fahrenheit: {
      celsius: (value) => (value - 32) * 5/9,
      kelvin: (value) => ((value - 32) * 5/9) + 273.15
    },
    kelvin: {
      celsius: (value) => value - 273.15,
      fahrenheit: (value) => ((value - 273.15) * 9/5) + 32
    }
  },
  length: {
    meters: {
      kilometers: (value) => value / 1000,
      miles: (value) => value / 1609.344,
      feet: (value) => value * 3.28084,
      inches: (value) => value * 39.3701
    },
    kilometers: {
      meters: (value) => value * 1000,
      miles: (value) => value / 1.609344,
      feet: (value) => value * 3280.84,
      inches: (value) => value * 39370.1
    },
    miles: {
      meters: (value) => value * 1609.344,
      kilometers: (value) => value * 1.609344,
      feet: (value) => value * 5280,
      inches: (value) => value * 63360
    },
    feet: {
      meters: (value) => value / 3.28084,
      kilometers: (value) => value / 3280.84,
      miles: (value) => value / 5280,
      inches: (value) => value * 12
    },
    inches: {
      meters: (value) => value / 39.3701,
      kilometers: (value) => value / 39370.1,
      miles: (value) => value / 63360,
      feet: (value) => value / 12
    }
  },
  weight: {
    kilograms: {
      grams: (value) => value * 1000,
      pounds: (value) => value * 2.20462,
      ounces: (value) => value * 35.274,
      tons: (value) => value / 1000
    },
    grams: {
      kilograms: (value) => value / 1000,
      pounds: (value) => value / 453.592,
      ounces: (value) => value / 28.3495,
      tons: (value) => value / 1000000
    },
    pounds: {
      kilograms: (value) => value / 2.20462,
      grams: (value) => value * 453.592,
      ounces: (value) => value * 16,
      tons: (value) => value / 2204.62
    },
    ounces: {
      kilograms: (value) => value / 35.274,
      grams: (value) => value * 28.3495,
      pounds: (value) => value / 16,
      tons: (value) => value / 35274
    },
    tons: {
      kilograms: (value) => value * 1000,
      grams: (value) => value * 1000000,
      pounds: (value) => value * 2204.62,
      ounces: (value) => value * 35274
    }
  },
  volume: {
    liters: {
      milliliters: (value) => value * 1000,
      gallons: (value) => value / 3.78541,
      'cubic meters': (value) => value / 1000
    },
    milliliters: {
      liters: (value) => value / 1000,
      gallons: (value) => value / 3785.41,
      'cubic meters': (value) => value / 1000000
    },
    gallons: {
      liters: (value) => value * 3.78541,
      milliliters: (value) => value * 3785.41,
      'cubic meters': (value) => value / 264.172
    },
    'cubic meters': {
      liters: (value) => value * 1000,
      milliliters: (value) => value * 1000000,
      gallons: (value) => value * 264.172
    }
  },
  area: {
    'square meters': {
      'square kilometers': (value) => value / 1000000,
      acres: (value) => value / 4046.86,
      hectares: (value) => value / 10000,
      'square feet': (value) => value * 10.7639
    },
    'square kilometers': {
      'square meters': (value) => value * 1000000,
      acres: (value) => value * 247.105,
      hectares: (value) => value * 100,
      'square feet': (value) => value * 10763910.4
    },
    acres: {
      'square meters': (value) => value * 4046.86,
      'square kilometers': (value) => value / 247.105,
      hectares: (value) => value / 2.47105,
      'square feet': (value) => value * 43560
    },
    hectares: {
      'square meters': (value) => value * 10000,
      'square kilometers': (value) => value / 100,
      acres: (value) => value * 2.47105,
      'square feet': (value) => value * 107639.104
    }
  },
  time: {
    seconds: {
      minutes: (value) => value / 60,
      hours: (value) => value / 3600,
      days: (value) => value / 86400,
      weeks: (value) => value / 604800
    },
    minutes: {
      seconds: (value) => value * 60,
      hours: (value) => value / 60,
      days: (value) => value / 1440,
      weeks: (value) => value / 10080
    },
    hours: {
      seconds: (value) => value * 3600,
      minutes: (value) => value * 60,
      days: (value) => value / 24,
      weeks: (value) => value / 168
    },
    days: {
      seconds: (value) => value * 86400,
      minutes: (value) => value * 1440,
      hours: (value) => value * 24,
      weeks: (value) => value / 7
    },
    weeks: {
      seconds: (value) => value * 604800,
      minutes: (value) => value * 10080,
      hours: (value) => value * 168,
      days: (value) => value * 7
    }
  }
};

router.post('/convert', (req, res) => {
  const { fromUnit, toUnit, value, type } = req.body;
  
  try {
    if (fromUnit === toUnit) {
      return res.json({ result: parseFloat(value) });
    }
    
    const result = conversions[type][fromUnit][toUnit](parseFloat(value));
    res.json({ result: parseFloat(result.toFixed(6)) });
  } catch (error) {
    res.status(400).json({ error: 'Invalid conversion parameters' });
  }
});

// Get available units for a type
router.get('/units/:type', (req, res) => {
  const type = req.params.type;
  if (conversions[type]) {
    const units = Object.keys(conversions[type]);
    res.json({ units });
  } else {
    res.status(404).json({ error: 'Unit type not found' });
  }
});

// Get all available unit types
router.get('/types', (req, res) => {
  const types = Object.keys(conversions);
  res.json({ types });
});

module.exports = router; 