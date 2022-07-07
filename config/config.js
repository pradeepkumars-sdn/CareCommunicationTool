"use strict";

const config = {
  local: {
    DB: {
      HOST: "localhost",
      PORT: "27017",
      DATABASE: "CareCommunicationTool",
      MONGOOSE: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      //   UserName: "DMEReferralSystem",
      //   Password: "345rtg34fr3e",
    },
  },
};

module.exports.get = function get(env) {
  return config[env] || config.default;
};
