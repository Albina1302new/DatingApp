export const renderFakeMessages = () => {
  const container = document.querySelector(".messages");

  if (!container) return;

  const fakeMessages = [
    { from: "them", text: "Hi 👋" },
    { from: "me", text: "Hello!" },
    { from: "them", text: "How are you?" },
    { from: "me", text: "Good 🙂" },
    { from: "them", text: "Do you live here?" },
  ];

  fakeMessages.forEach((msg) => {
    const message = document.createElement("div");

    message.classList.add("message");

    if (msg.from === "me") {
      message.classList.add("me");
    }

    message.textContent = msg.text;

    container.appendChild(message);
  });
};
