const Client = require("node-rest-client").Client;

const client = new Client();

exports.client = client;

exports.sendEmail = (ticketId, subject, content, emailIds, requester) => {
  var reqBody = {
    subject: subject,
    content: content,
    receipientEmails: emailIds,
    requester: requester,
    ticketId: ticketId,
  };

  var args = {
    data: reqBody,
    headers: {
      "Content-Type": "application/json",
    },
  };
  client.post(
    "http://localhost:7777/notifiServ/api/notifications/",
    args,
    (data, response) => {
      console.log("Request Sent");
      console.log(data);
    }
  );
};
