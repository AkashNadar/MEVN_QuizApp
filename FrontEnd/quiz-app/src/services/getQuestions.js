import axios from "axios";

const getQuest = async (testID) => {
  const response = await axios.get(`/question/${testID}`);
  return response.data;
};

export { getQuest };
