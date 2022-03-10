import { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import axios from "axios";

const HASURA_GRAPHQL_API = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API;

export const config = {
  api: {
    bodyParser: false,
  },
};

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

type Event = {
  data: IEventData;
  object: "event";
  type: EventType;
};

interface IEventData {
  email_addresses: [IEmailAddress];
  first_name: string;
  last_name: string;
  id: string;
  username: string;
  profile_image_url: string;
  primary_email_address_id: string;
  unsafe_metadata: {
    twitter_username: string;
    github_username: string;
    website_url: string;
  };
}

interface IEmailAddress {
  email_address: string;
  id: string;
}

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

const handler = async (
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) => {
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);

  let event: Event | null = null;

  try {
    event = wh.verify(payload, headers) as Event;
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Invalid signature" });
  }

  const eventType: EventType = event.type;
  if (
    eventType === "user.created" ||
    event.type === "user.updated" ||
    event.type === "user.deleted"
  ) {
    let userObject;

    if (eventType === "user.deleted") {
      userObject = {
        id: event.data.id,
      };
    } else {
      userObject = {
        id: event.data.id,
        email: event.data.email_addresses.find(
          email => email.id === event?.data.primary_email_address_id
        )?.email_address,
        first_name: event.data.first_name,
        last_name: event.data.last_name,
        username: event.data.username,
        profile_image_url: event.data.profile_image_url,
        twitter_username: event.data.unsafe_metadata.twitter_username,
        github_username: event.data.unsafe_metadata.github_username,
        website_url: event.data.unsafe_metadata.website_url,
      };
      console.log(userObject);
    }

    const INSERT_USER = `
mutation ($user: users_insert_input!) {
  insert_users(objects: [$user]) {
    affected_rows
  }
}
  `;

    const UPDATE_USER = `
mutation ($id: String!, $user: users_set_input!) {
  update_users_by_pk(pk_columns: {id: $id}, _set: $user) {
    id
  }
}
  `;

    const DELETE_USER = `
mutation ($id: String!) {
  delete_users_by_pk(id: $id) {
    id
  }
}
  `;

    let mutation;
    let variables;

    switch (eventType) {
      case "user.created":
        mutation = INSERT_USER;
        variables = {
          user: userObject,
        };
        break;

      case "user.updated":
        mutation = UPDATE_USER;
        variables = {
          user: userObject,
          id: userObject.id,
        };
        break;

      case "user.deleted":
        mutation = DELETE_USER;
        variables = {
          id: userObject.id,
        };
        break;
    }

    const { data } = await axios.post(
      HASURA_GRAPHQL_API as string,
      JSON.stringify({
        query: mutation,
        variables,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
        },
      }
    );

    console.log(data);
  }

  res.status(200).send({ message: "Success" });
};

export default handler;
