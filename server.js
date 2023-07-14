// const express = require('express');
// const { exec } = require('child_process');
// const app = express();

// app.get('/run-script', (req, res) => {
//   exec('python main.py', (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error: ${error.message}`);
//       return res.status(500).json({ error: 'Script execution failed' });
//     }

//     return res.status(200).json({ success: true });
//   });
// });

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
