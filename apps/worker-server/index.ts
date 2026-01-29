import "dotenv/config";
import dotenv from "dotenv";
import MQClient from "./utils/queueClient";
import assessmentProcessing from "./utils/assessment-processing";
import endAssessment from "./utils/end-assessment";

dotenv.config({ path: "../.env" });

function startServer() {
  if (MQClient.connected) {
    MQClient.consumeFromQueue("assessment-report", assessmentProcessing);
    MQClient.consumeFromQueue("assignment-end", endAssessment);
  }
}

MQClient.connect()
  .then(() => {
    startServer();
  })
  .catch((err: any) => {
    console.log(err);
    process.exit(1);
  });
