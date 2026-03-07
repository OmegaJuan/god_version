import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";

import homeRoutes from "./routes/homeRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";

const app = express();
const PORT: number = 3000;

/* =========================
   PATH ROOT FIX (TS SAFE)
========================= */

const rootPath = process.cwd();

/* =========================
   VIEW ENGINE
========================= */

app.set("view engine", "ejs");
app.set("views", path.join(rootPath, "views"));

/* =========================
   MIDDLEWARE
========================= */

app.use(express.static(path.join(rootPath, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "verysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

/* =========================
   MAKE USER AVAILABLE IN ALL EJS
========================= */

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.session.user || null;
  res.locals.query = req.query;
  next();
});

/* =========================
   ROUTES
========================= */

app.use("/", homeRoutes);
app.use("/", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);

/* =========================
   SERVER
========================= */

app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});