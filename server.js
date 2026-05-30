const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'waitlist.json');

// Middleware to parse incoming request JSON
app.use(express.json());

// Serve static web files directly from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * POST /api/waitlist
 * Adds a new verified email to the waitlist.json database.
 */
app.post('/api/waitlist', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  // Double-verify email syntax on server side
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email structure.' });
  }

  let waitlist = [];

  // Read existing database file if it exists
  if (fs.existsSync(dbPath)) {
    try {
      const dbContent = fs.readFileSync(dbPath, 'utf8');
      waitlist = JSON.parse(dbContent || '[]');
    } catch (err) {
      console.error('Error reading waitlist.json:', err);
    }
  }

  // Prevent duplicate submissions
  const exists = waitlist.some(
    (entry) => entry.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (exists) {
    return res.status(400).json({ error: 'This email is already registered on the waitlist!' });
  }

  // Register entry
  const newEntry = {
    email: email.trim(),
    timestamp: new Date().toISOString(),
  };
  waitlist.push(newEntry);

  // Write updated waitlist back to JSON file
  try {
    fs.writeFileSync(dbPath, JSON.stringify(waitlist, null, 2), 'utf8');
    return res.status(200).json({ success: true, message: 'Successfully joined waitlist!' });
  } catch (err) {
    console.error('Error writing waitlist.json:', err);
    return res.status(500).json({ error: 'Database error. Please try again later.' });
  }
});

// Universal fallback middleware compatible with Express 4 & 5
// Serves index.html from the public directory for any unmatched request
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server listener
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 AISPIRE waitlist backend server is running!`);
  console.log(`🔗 Access local landing page: http://localhost:${PORT}`);
  console.log(`📂 Waitlist registry database: ${dbPath}`);
  console.log(`==================================================\n`);
});
