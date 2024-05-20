import { buildChat } from "@core/ai/chats/generation/commands/BuildChat";
import { ChatServerPayload } from "@core/ai/chats/generation/providers/ChatServer";
import cors from "cors";
import express, { json } from "express";


const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(cors());

app.post('/inference', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const controller = new AbortController();
  const { signal } = controller;
  req.on('finish', () => {
    console.log("Request finished");
    controller.abort();
  });


  try {
    const payload: ChatServerPayload = req.body;
    const chat = buildChat(payload.provider, payload.options);

    for await (const chunk of chat(payload.messages, signal)) {
      const chunkString = JSON.stringify(chunk);
      res.write(`data: ${chunkString}\n\n`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted by the client');
      } else {
        console.error('Error during chat generation:', error);
      }
    }
  } finally {
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
