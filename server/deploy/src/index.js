const renderApiKey = process.argv
  .find((value) => /--key=/.test(value))
  .replace(/--key=/, "");
const serviceId = process.argv
  .find((value) => /--serviceId=/.test(value))
  .replace(/--serviceId=/, "");

if (!renderApiKey) {
  throw new Error("No api key has been provided. Use flag '--key='");
}

if (!serviceId) {
  throw new Error("No service id has been provided. Use flag '--serviceId='");
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let deploymentId = undefined;

try {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: "Bearer " + renderApiKey,
    },
    body: JSON.stringify({ clearCache: "do_not_clear" }),
  };

  const response = await fetch(
    `https://api.render.com/v1/services/${serviceId}/deploys`,
    options
  );

  const data = await response.json();
  deploymentId = data.id;
  console.log(`Deploying commit '${data.commit.message}'`);
  console.log(
    `Monitor the progress here: https://dashboard.render.com/web/${serviceId}/deploys/${deploymentId}`
  );
} catch (ex) {
  console.error("Could not begin deployment on Render.");
  console.error(ex);
  throw ex;
}

if (deploymentId) {
  await sleep(5000);

  let deploymentIsFinished = false;
  let currentStatus = "";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: "Bearer " + renderApiKey,
    },
  };

  try {
    while (!deploymentIsFinished) {
      const response = await fetch(
        `https://api.render.com/v1/services/${serviceId}/deploys/${deploymentId}`,
        options
      );

      const data = await response.json();
      deploymentIsFinished = data.finishedAt !== null;
      currentStatus = data.status;
      console.log(`Deployment in progress. Status: ${currentStatus}`);

      if (deploymentIsFinished) {
        console.log("Deployment complete!");
        console.log("Final status: " + currentStatus);
      } else {
        await sleep(10000);
      }
    }
  } catch (ex) {
    console.error("Could not fetch the deployment's status");
    console.error(ex);
    throw ex;
  }

  if (currentStatus !== "live") {
    throw new Error("Deployment did not complete correctly. Failing.");
  }
} else {
  throw new Error("Could not start the build correctly.");
}
