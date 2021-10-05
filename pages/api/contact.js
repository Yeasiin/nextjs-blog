import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message, email, name } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res
        .status(422)
        .json({ status: "fail", data: { message: "Input Data Is Not Valid" } });
    }

    const newMessage = {
      name,
      email,
      message,
    };

    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.wlfrp.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
    });

    if (!client) {
      return res.status(400).json({
        status: "Fail",
        data: { message: "couldn't connect to database" },
      });
    }

    try {
      const db = client.db();
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      return res.status(500).json({
        status: "Fail",
        data: { message: "couldn't store messages to database" },
      });
    } finally {
      client.close();
    }

    res.status(201).json({ status: "success", data: newMessage });
  } else {
    res.status(400).json({
      status: "Fail",
      data: {
        message: "Check The Request Method",
      },
    });
  }
}
