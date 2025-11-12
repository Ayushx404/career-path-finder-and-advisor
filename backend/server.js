const express = require('express');
const cors = require('cors');
const careerRoutes = require('./routes/career');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/career', careerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});