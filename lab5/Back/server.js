const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
const bodyParser = require("body-parser");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

app.use(cors());
app.use(express.json());

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, "your_jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
}

app.post("/order", async (req, res) => {
  const { items, userID, paymentMethod, address, total } = req.body;

  // Перевірка кількості страв
  if (items.length < 1 || items.length > 10) {
    return res.status(400).json({ error: "Кількість страв має бути від 1 до 10" });
  }

  try {
    const newOrder = {
      items: items,
      userID: userID,
      paymentMethod: paymentMethod,
      address: address,
      totalPrice: total,
      status: "підтверджено",
      date: new Date(),
    };

    // Додавання замовлення в базу даних
    const orderRef = await db.collection("orders").add(newOrder);

    // Відправка підтвердження клієнту
    res.status(201).json({ orderId: orderRef.id, ...newOrder });
  } catch (error) {
    console.error("Помилка при збереженні замовлення:", error);
    res.status(500).json({ error: "Помилка при створенні замовлення" });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    // приклад з Firebase
    const snapshot = await db.collection("orders").where("userId", "==", userId).get();

    const orders = snapshot.docs.map(doc => doc.data());
    res.json(orders);
  } catch (error) {
    console.error("Помилка при завантаженні замовлень:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "You have been accessed a protected route!" });
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from backend"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
