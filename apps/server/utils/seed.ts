import axios from "axios";
import { CHOSEN_LANGUAGES } from "./piston";

async function seedData() {
  try {
    const runtimes: any[] = CHOSEN_LANGUAGES;
    for (const runtime of runtimes) {
      try {
        console.log(runtime);
        const response = await axios.post(
          process.env.CODE_EXECUTION_SERVER! + "api/v2/packages",
          {
            language: runtime.language,
            version: runtime.version,
          },
        );

        console.log(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    console.log(error);
  }
}

seedData();
