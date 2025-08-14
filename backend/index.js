import server from './server.js';
import connectDB from './db.js';

connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Live Preview - http://localhost:${PORT}`);
})