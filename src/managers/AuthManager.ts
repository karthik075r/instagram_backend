import { getAccessToken } from "../utils/instagramApi";
import { AccessTokenResponse } from "../models/AccessToken";

export const getAuthUrl = (): string => {
  return `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments&response_type=code`;
};
export const handleAuthCallback = async (
  code: string
): Promise<AccessTokenResponse> => {
  try {
    const response = await getAccessToken(code);
    const { access_token, user_id } = response;
    return { accessToken: access_token, userId: user_id };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
