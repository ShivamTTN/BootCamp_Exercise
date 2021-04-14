const axios = require("axios");

const getGitApiData = async () => {
  try {
    return await axios.get("https://api.github.com/users/ShivamTTN");
  } catch (error) {
    console.error(error);
  }
};

const GitApi = async () => {
  const Apidata = await getGitApiData();
  console.log("Numbers of Followers : " + Apidata.data.followers);
  console.log(" ---------- Profile -----------");
  console.log("username :" + Apidata.data.login);
  console.log("Number of Public repos :" + Apidata.data.public_repos);
};

GitApi();
