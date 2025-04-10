import { getAccessToken, getProfileData } from "../utils/instagramApi";
import { InstagramUser } from "../models/InstagramUser";

export const getAuthUrl = (): string => {
  return `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile&response_type=code`;
};
export const handleAuthCallback = async (
  code: string
): Promise<InstagramUser> => {
  const accessToken = await getAccessToken(code);
  const profile = await getProfileData(accessToken);
  return { ...profile, accessToken };
};
