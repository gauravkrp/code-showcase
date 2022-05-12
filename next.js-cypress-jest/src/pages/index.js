import { useEffect, useState } from "react";
import Airtable from "airtable";
import Head from "next/head";

const YOUR_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const baseId = process.env.NEXT_PUBLIC_BASE_ID;

const base = new Airtable({ apiKey: YOUR_API_KEY }).base(baseId);

export default function IndexPage() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    base("Class 9 Science")
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 20,
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          console.log(records);
          records.map(record => ({ id: record.id, fields: record.fields }));
          setData(records);
          // records.forEach(function (record) {
          //   console.log("Retrieved", record.fields.Question, record.get("A"));
          //   // console.log("Retrieved", record, record.get("Question"));
          // });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          setLoading(false);
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }, []);

  return(
    <div>
      <Head>
        <title>Class 9 Questions</title>
      </Head>
      {isLoading ? 'Loading...' : (
        <>
        {data && data.length && data.map(record => (
          <div key={record.id}>
            <h1 className="question">{record.fields.Question}</h1>
            <ul className="options">
              <li>{record.fields.A}</li>
              <li>{record.fields.B}</li>
              <li>{record.fields.C}</li>
              <li>{record.fields.D}</li>
            </ul>
          </div>
        ))}
        </>
      )}
    </div>
  );
}


// function get() {
//   var powers = [];
//   for (stone = 0; stone <= 10; stone++) {
//     powers[stone] = function () { return stone; };
//   }
//   return powers;

// }

// var powers = get();
// console.log(powers[5]());
