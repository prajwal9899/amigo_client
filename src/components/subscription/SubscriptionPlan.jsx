import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 30rem;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const SubscriptionPlan = () => {
  const [prices, setPrices] = useState([]);

  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    axios
    .get("http://localhost:8000/subs/prices")
    .then((data) => {
      console.log(data.data.data,"SHSASAS");
      setPrices(data.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);


  const createSession = async (priceId) => {
    const { data: response } = await axios.post(
      "http://localhost:8000/subs/session",
      {
        priceId,
        email: user.email
      }
    );

    window.location.href = response.url;
  };

  const backgroundColors = {
    Basic: "rgb(104, 219, 104)",
    Standard: "rgb(185, 42, 23, 0.835)",
    Premium: "pink",
  };

  return (
    <Container>
      <CardsContainer>
        {prices.map((price) => {
          return (
            <Card
              style={{ width: "18rem", height: "25rem", marginRight: "2rem" }}
              key={price.id}
            >
              <CardHeader
                style={{ backgroundColor: backgroundColors[price.nickname] }}
              >
                <PriceCircle>
                  <PriceText>${price.unit_amount / 100}</PriceText>
                </PriceCircle>
              </CardHeader>
              <Card.Body>
                <Card.Title style={{ fontSize: "2rem" }}>
                  {price.nickname}
                </Card.Title>
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => createSession(price.id)}
                >
                  Buy now
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardsContainer>
    </Container>
  );
};

export default SubscriptionPlan;
