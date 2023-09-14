import axios from "axios";
const BASE_URL = "http://localhost:3001/";

export async function getSwedenAndThailandData() {
  try {
    const response = await axios.get(`${BASE_URL}getSwedenAndThailandData`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch country data::", err);
  }
}
