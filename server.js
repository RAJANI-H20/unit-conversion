const express = require('express');
const cors = require('cors');
const conversionRoutes = require('./routes/conversion.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/conversions', conversionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 