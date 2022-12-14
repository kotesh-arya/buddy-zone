import axios from "axios";

export const removePostFromBookmarkService = async (postId, token) => {

  const response = await axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    { headers: { authorization: token } }
  );
  return response;
};
