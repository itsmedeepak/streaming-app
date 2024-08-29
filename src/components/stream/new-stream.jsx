import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Navbar from "../landing/navbar";
import Footer from "../landing/footer";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

function randomID(len = 5) {
  const roomID = Math.floor(10000000 + Math.random() * 90000000);
  return roomID;
}

function generateSharedLinks(roomID, role) {
  let sharedLinks = [];
  sharedLinks.push({
    name: "Join as audience",
    url: `${window.location.origin}/join-stream?roomID=${roomID}`,
  });

  return sharedLinks;
}


export default function App() {
  const user = useSelector((state) => state.auth.user);
  const [hide, setHide] = useState(false);
  const roomID = randomID(8).toString();
  const role = "Host";
  const sharedLinks = generateSharedLinks(roomID, "Host");
  const appID = Number(process.env.REACT_APP_ZEGO_APP_ID);
  const serverSecret = process.env.REACT_APP_ZEGO_SECRET_SERVER;
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    user.id,
    user.name,
    20000000
  );

  const initializeMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks,
    });
    setHide(true);
  };
  useEffect(() => {
    if (roomID) {
      SaveRoomId();
    }
  }, [roomID]);

  const data = {
    roomID: roomID,
  };

  const SaveRoomId = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/stream/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {}
  };

  return (
    <>
      <Helmet>
        <title>Start a New Stream - ZigyStream</title>
        <meta
          name="description"
          content="Start a new live stream on ZigyStream and engage with your audience in real-time."
        />
        <meta
          name="keywords"
          content="ZigyStream start stream, create live stream, video streaming "
        />
      </Helmet>

      <div>
        {!hide && <Navbar />}
        <div
          className="myCallContainer"
          ref={initializeMeeting}
          style={{ height: "100vh" }}
        ></div>
        {!hide && <Footer />}
      </div>
    </>
  );
}
