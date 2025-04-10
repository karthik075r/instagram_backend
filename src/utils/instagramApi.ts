import axios from "axios";

export const getAccessToken = async (code: string): Promise<string> => {
  const res = await axios.post(`https://api.instagram.com/oauth/access_token`, {
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
    code,
  });
  return res.data.access_token;
};

export const getProfileData = async (accessToken: string) => {
  const res = await axios.get(
    `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
  );
  return res.data;
};
