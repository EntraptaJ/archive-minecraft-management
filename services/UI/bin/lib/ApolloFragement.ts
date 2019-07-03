import fetch from 'node-fetch';
import { writeJSON } from 'fs-extra';

interface Types {
  kind: string
  name: string
  possibleTypes: {
    name: string
  }
}

export const generateFragement = async (API: string) => {
  const result = await fetch(`${API}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {},
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
    }),
  });

  const json = await result.json();
  const filteredData = json.data.__schema.types.filter((type: Types) => type.possibleTypes !== null);
  json.data.__schema.types = filteredData;
  return json.data
};
