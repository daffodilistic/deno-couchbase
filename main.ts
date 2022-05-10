"use strict";

// BROKEN!
import couchbase from "couchbase"; 

async function main() {
  const clusterConnStr = "couchbase://localhost";
  const username = "admin";
  const password = "password";
  const bucketName = "gamesim-sample";

  const cluster = await couchbase.connect(clusterConnStr, {
    username: username,
    password: password,
  });

  const bucket = cluster.bucket(bucketName);
  // const collection_default: Collection = bucket.defaultCollection();
  // const collection: Collection = bucket.scope("players").collection(
  //   "_documents",
  // );

  const queryResult = await bucket
    .scope("_default")
    .query(
      "SELECT * FROM `gamesim-sample`.`_default`.`_default` AS p" +
        "WHERE p.jsonType = 'player'" +
        "AND p.`level` =$1",
      {
        parameters: [2],
      },
    );
  console.log("Query Results:");
  queryResult.rows.forEach((row: any) => {
    console.log(row);
  });

  // Load the Document and print it
  // Prints Content and Metadata of the stored Document
  // const getResult = await collection.get("michael123");
  // console.log("Get Result: ", getResult);

  // Create and store a document
  // await collection.upsert("michael123", {
  //   type: "user",
  //   name: "Michael",
  //   email: "michael123@test.com",
  //   interests: ["Swimming", "Rowing"],
  // });

  // Create a scoped primary index so we can query data
  // await cluster.queryIndexes().createPrimaryIndex("travel-sample", {
  //   scopeName: "tenant_agent_00",
  //   collectionName: "users",
  //   ignoreIfExists: true,
  // });

  // // Perform a N1QL Query
  // const queryResult = await bucket
  //   .scope("tenant_agent_00")
  //   .query("SELECT name FROM `users` WHERE $1 in interests", {
  //     parameters: ["Swimming"],
  //   });
  // console.log("Query Results:");
  // queryResult.rows.forEach((row) => {
  //   console.log(row);
  // });
}

main();
