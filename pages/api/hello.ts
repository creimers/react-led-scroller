// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

// Reference a table
const table = base(process.env.AIRTABLE_TABLE_NAME!);

type Data = {
  message: string;
};

async function getMessageForHash(hash: string): Promise<string | null> {
  return new Promise((resolve) => {
    table
      .select({
        maxRecords: 1,
        filterByFormula: `({hash} = '${hash}')`,
        fields: ["message"],
      })
      .eachPage(
        (records) => {
          if (records && records.length) {
            const message = records[0].fields.message as string;
            resolve(message);
          } else {
            resolve("");
          }
        },
        () => {
          resolve("");
        }
      );
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.hash) {
    const message = await getMessageForHash(req.query.hash as string);
    if (message) {
      res.status(200).json({ message });
    } else {
      res.status(200).json({ message: "" });
    }
  } else {
    res.status(200).json({ message: "" });
  }
}
