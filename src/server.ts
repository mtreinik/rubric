import path from "path";
import express, { Request, Response } from "express";

const distPath = path.join(__dirname, "..", "client", "dist");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(distPath));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`started server in port ${port}`);
});
