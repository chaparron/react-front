import React from "react";
import { Link } from "react-router-dom";
//import useFetch from '../hooks/useFetch' Cambiamos a garphql
import { useQuery, gql } from "@apollo/client";

import ReactMarkdown from "react-markdown";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      id
      title
      body
      rating
      categories {
        name
        id
      }
    }
  }
`;

export default function Homepage() {
  //const { data, error, loading } =  useFetch('http://localhost:1337/reviews');

  const { loading, error, data } = useQuery(REVIEWS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  console.log(data);

  return (
    <div>
      {data.reviews.map((review) => (
        <div className="review-card" key={review.id}>
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map((c) => (
            <small key={c.id}>{c.name}</small>
          ))}

          <ReactMarkdown>{review.body.substring(0,200)}</ReactMarkdown>
          {/* <ReactMarkdown>{review.body.substring(0, 200)}...</ReactMarkdown> */}
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
