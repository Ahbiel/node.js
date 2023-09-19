import bus from "../utils/bus.jsx";
export default function useFlashMessage() {
  function setFlashMessage(msg, type) {
    bus.emit("flash", {
      type: type,
      message: msg,
    });
  }
  return { setFlashMessage };
}
