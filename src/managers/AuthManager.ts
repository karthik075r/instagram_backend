import { getAccessToken, getProfileData } from "../utils/instagramApi";
import { InstagramUser } from "../models/InstagramUser";

export const getAuthUrl = (): string => {
  return `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments&response_type=code`;
};
export const handleAuthCallback = async (
  code: string
): Promise<InstagramUser> => {
  const accessToken = await getAccessToken(code);
  const profile = await getProfileData(accessToken);
  return { ...profile, accessToken };
};
