const tplink = require("tplink-smarthome-api");

const client = new tplink.Client();

(async () => {
  const host = await new Promise((callback) => {
    client.startDiscovery().on("plug-new", (plug) => {
      // plug.getInfo().then((info) => console.log("info", info));
      plug.getSysInfo().then((info) => {
        if (info.mac === "70:4F:57:B4:4F:AB") {
          // console.log("host", plug.host);
          // console.log("sys info", info);
          callback(plug.host);
        }
      });
    });
  });

  // '70:4F:57:B4:4F:AB
  const plug = client.getPlug({ host: host });

  console.log("cycling forever starting now", new Date().toISOString());

  const delay = async (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const TIME_ON_TO_TRIGGER = 5 * 1000;
  const TIME_BETWEEN_TRIGGERS = 5 * 60 * 1000;

  (async () => {
    for (;;) {
      console.log("cycling again", new Date().toISOString());
      plug.setPowerState(false);
      await delay(TIME_ON_TO_TRIGGER);
      plug.setPowerState(true);
      await delay(TIME_BETWEEN_TRIGGERS);
    }
  })();
})();
