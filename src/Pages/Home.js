import Layout from "../Component/Layout";
import axios from "axios";
import React, { useEffect } from "react";
import logo from "../Img/home.png"

function Home() {
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Layout>
        
        <img src={logo} className="home-image" alt="img" />
       
      </Layout>
    </div>
  );
}

export default Home;
