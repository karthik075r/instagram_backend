import axios from "axios";

export const getAccessToken = async (
  code: string
): Promise<Record<string, any>> => {
  try {
    const formData = new FormData();
    formData.append("client_id", process.env.INSTAGRAM_CLIENT_ID as string);
    formData.append(
      "client_secret",
      process.env.INSTAGRAM_CLIENT_SECRET as string
    );
    formData.append("grant_type", "authorization_code");
    formData.append(
      "redirect_uri",
      process.env.INSTAGRAM_REDIRECT_URI as string
    );
    formData.append("code", code);

    const res = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      formData
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
