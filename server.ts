import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to proxy Formspree requests
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const formId = process.env.VITE_FORMSPREE_ID || 'xlgorany';

      console.log(`[Contact Form] Forwarding to Formspree ID: ${formId}`);
      console.log(`[Contact Form] Payload: ${JSON.stringify({ name, email, message })}`);

      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name, 
          email, 
          message,
          _replyto: email // Adding _replyto for better Formspree compatibility
        })
      });

      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('[Contact Form] Non-JSON response from Formspree:', text);
        data = { error: 'Formspree returned an unexpected response format', details: text };
      }
      
      if (response.ok) {
        console.log('[Contact Form] Successfully sent to Formspree');
        res.status(200).json({ success: true });
      } else {
        console.error(`[Contact Form] Formspree error (${response.status}):`, data);
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error('[Contact Form] Server Proxy Error:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error instanceof Error ? error.message : String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
