import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const Home = () => {
  return (
    <div>
      <Container>
        <div className="flex flex-col items-center justify-center rounded bg-gray-200 p-5">
          <h1 className="my-6 text-center text-3xl">
            Welcome to the simple POS for Jomaa's Pizza
          </h1>

          <Link
            to="/pos"
            className="inline-block rounded bg-blue-500 px-3.5 py-2 text-white"
          >
            Click here to sell products
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Home;
