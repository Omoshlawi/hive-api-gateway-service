import logger from "../shared/logger";
import MessageBroker from "../shared/MessageBroker";
import { configuration, messageBroker } from "../utils";

class AsyncTasks {
  async addUserSearch(data: {
    resourcepathName: string;
    person?: string;
    params: { name: string; value: string }[];
  }) {
    try {
      console.log("PUBLISHING USERSEARCH");

      const channel = await MessageBroker.createChannel(
        messageBroker.url,
        messageBroker.exchanges.hive.name,
        "direct"
      );

      MessageBroker.publishMessage(
        channel,
        messageBroker.exchanges.hive.name,
        "hive-recommender-service:1.0.0",
        {
          action: "POST",
          from: {
            name: configuration.name,
            version: configuration.version,
          },
          resource: "user-search",
          to: {
            name: "hive-files-service:1.0.0",
            version: "1.0.0",
          },
          data,
        }
      );

      channel.close();
    } catch (error) {
      logger.error("ERROR PUBLISHING ROLLBACK: " + error);
    }
  }
}

export default AsyncTasks;
