import { Client } from "tplink-smarthome-api";

const client = new Client();
const plug = client.getPlug({ host: "192.168.1.117" });

console.log("cycling forever starting now", new Date().toISOString());

const delay = async time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

const TIME_ON_TO_TRIGGER = 5 * 1000;
const TIME_BETWEEN_TRIGGERS = 2 * 60 * 1000;

(async () => {
  for (;;) {
    console.log("cycling again", new Date().toISOString());
    plug.setPowerState(true);
    await delay(TIME_ON_TO_TRIGGER);
    plug.setPowerState(false);
    await delay(TIME_BETWEEN_TRIGGERS);
  }
})();
