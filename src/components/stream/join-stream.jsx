import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Navbar from "../landing/navbar";
import Footer from "../landing/footer";
import { useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"; // Correct import for axios
import { Helmet } from "react-helmet";

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

// Main component
export default function JoinStream() {
  const user = useSelector((state) => state.auth.user);
  const [roomID, setRoomID] = useState(getUrlParams().get("roomID"));
  const [id, setID] = useState(
    getUrlParams().get("roomID") ? getUrlParams().get("roomID") : ""
  );
  const [name, setName] = useState("");

  const HandleCheckRoomID = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/stream/${id}`
      );

      if (response.status !== 200) {
        alert("Room ID does not exist");
        return;
      } else {
        setRoomID(id);
      }
    } catch (error) {
      alert("Error checking room ID");
    }
  };

  const randomID = Math.floor(10000000 + Math.random() * 90000000).toString();

  const role = "Audience";
  const appID = Number(process.env.REACT_APP_ZEGO_APP_ID);
  const serverSecret = process.env.REACT_APP_ZEGO_SECRET_SERVER;
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID,
    name ? name : "User",
    2000000000
  );

  const initializeMeeting = (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Join a Stream - ZigyStream</title>
        <meta
          name="description"
          content="Join a live stream on ZigyStream using a unique code and start watching instantly."
        />
        <meta
          name="keywords"
          content="ZigyStream join stream, watch live stream, video streaming"
        />
      </Helmet>
      <div>
        {!roomID && (
          <>
            <Navbar />
            <Box
              sx={{
                width: "100%",
                maxWidth: 350,
                margin: "auto",
                // padding: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // height: "100vh",
                gap: 2,
                marginTop: "150px",
              }}
            >
              <Typography variant="h5" component="h1" gutterBottom>
                Join Stream
              </Typography>

              <Typography variant="body1" gutterBottom>
                Please enter Name And Join Code
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                fullWidth
              />

              <TextField
                label="Join Code"
                value={id}
                onChange={(e) => setID(e.target.value)}
                placeholder="Enter your code"
                fullWidth
              />

              <Button
                onClick={HandleCheckRoomID}
                variant="contained"
                sx={{ width: "100%" }}
              >
                Join
              </Button>
            </Box>
          </>
        )}
        {roomID && (<>
           <Helmet>
        <title>Join a Stream - ZigyStream</title>
        <meta
          name="description"
          content="Join a live stream on ZigyStream using a unique code and start watching instantly."
        />
        <meta
          name="keywords"
          content="ZigyStream join stream, watch live stream, video streaming"
        />
      </Helmet>

         
          <div
            className="myCallContainer"
            ref={initializeMeeting}
            style={{ height: "100vh" }}
          ></div></>
        )}
      </div> 
    </>
  );
}
