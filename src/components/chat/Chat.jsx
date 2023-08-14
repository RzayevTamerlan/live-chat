import { useContext, useState, useEffect } from "react";
import { Context } from "../..";
import { onAuthStateChanged } from "firebase/auth";
import {
  serverTimestamp,
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import Spinner from "../spinner/Spinner"
import "./chat.css"

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(firestore, "messeges"), orderBy("createdAt"));
      const querySnapshot = await getDocs(q);
      const messagesData = [];

      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });

      setMessages(messagesData);
      setLoading(false);
    };

    fetchMessages();
  }, [firestore,messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(firestore, "messeges"), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: inputValue,
      createdAt: serverTimestamp(),
    });

    setInputValue("");
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <Container>
      <Grid
        marginTop={8}
        gap={3}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          justifyItems={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          container
          style={{ height: "fit-content" }}
        >
          <div
            style={{
              width: "80%",
              height: "60vh",
              border: "1px solid gray",
              overflowY: "auto",
            }}
          >
            {messages.map((msg) => {
              return (
                <div className="msg-box" style={{padding:user.uid === msg.uid ? "20px 20px 10px 0px" : "10px 0px 10px 20px",display:"flex",justifyContent:user.uid === msg.uid ? "flex-end" : "strech"}}>
                  <Grid className="msg-inner" width={"fit-content"} style={{border:user.uid === msg.uid ? "2px solid green" : "2px solid blue",padding:"15px"}} flexDirection={"column"} container>
                    <div style={{ display: "flex", alignItems: "center",gap:"5px" }}>
                      <Avatar src={msg.photoURL}></Avatar>
                      <h3>{msg.displayName}</h3>
                    </div>
                    <p style={{margin:"10px 0px"}}>{msg.text}</p>
                  </Grid>
                </div>
              );
            })}
          </div>
        </Grid>
        <Grid
          display={"flex"}
          gap={2}
          style={{ width: "80%" }}
          container
          justifyContent={"flex-end"}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <TextField
              value={inputValue}
              maxRows={2}
              fullWidth
              placeholder="Write your messege..."
              variant="filled"
              onChange={(e) => handleInputChange(e)}
            />
            <Button
              style={{ padding: "15px 18px" }}
              variant="contained"
              type="submit"
            >
              Send
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
