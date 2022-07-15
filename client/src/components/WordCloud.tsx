import { gql, useQuery } from "@apollo/client";
import Word from "./Word";

const GET_WRODS = gql`
  query GetCloud {
    getCloud {
      data {
        text
        value
      }
  }
  }
`;

export default function WordCloud() {
    const { loading, error, data } = useQuery(GET_WRODS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
   return <div className="flex flex-col align-center">
        {data.getCloud.data.map(({text, value}: {text: string, value: number}) => (
            <Word text={text} value={value}/>)
        )}
    </div>
}