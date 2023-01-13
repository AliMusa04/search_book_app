import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import "../../style/Home.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = styled.header`
  background-image: url("https://dadabooksearch.netlify.app/images/headerbg.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 300px;
  background-position: center center;
  background-size: cover;
`;

const DefaultDiv = styled.div`
  display: ${(props) => (props.isActive === true ? "flex" : "none")};
  width: 200px;
  margin: 0 auto;
  font-size: 60px;
  font-weight: 600;
`;
const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
const H2Title = styled.h2`
  color: white;
  font-size: 55px;
  margin-bottom: 20px;
`;
const Form = styled.form`
  width: 100%;
  position: relative;
`;
const InputSerach = styled.input`
  width: 100%;
  padding: 15px 40px;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  outline-color: green;
  outline-offset: 0.5px;
  box-shadow: rgb(255, 254, 254) 0px 3px 6px, rgb(255, 250, 250) 0px 3px 6px;
`;
const CardsDiv = styled.div`
  display: ${(props) => (props.isActive === false ? "none" : "flex")};
  gap: 30px;
  width: 90vw;
  flex-wrap: wrap;
`;
const DivSearch = styled.div`
  width: 700px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  width: 300px;
  border-radius: 20px;
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    transform: scale(0.95);
  }
`;

const CardContent = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: center;
  height: 50%;
`;

const LinkDiv = styled.div`
  gap: "15px";
`;

const BottomLink = styled.a`
  margin-right: 10px;
  font-size: 22px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  &:hover {
    text-decoration: underline;
  }
`;
const ModalDiv = styled.div`
  display: ${(props) => (props.isActive === false ? "none" : "flex")};
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: 800px;
  height: 400px;
  position: fixed;
  top: 10px;
  z-index: 2;
  padding: 20px;
`;

const DivDesc = styled.div`
  overflow-y: scroll;
  margin-top: 10px;
`;
const ExitDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 20px;
`;

const Home = () => {
  const [active, setActive] = useState(true);

  const [cardDiv, setCardDiv] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const getBooks = () => {
    if (input !== "") {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
        .then((res) => setData(res.data.items));
      setActive(false);
      setCardDiv(true);
    } else if (input === "") {
      setActive(true);
      setCardDiv(false);
    }
  };

  return (
    <>
      <Header>
        <DivSearch>
          <H2Title>Book Searching App</H2Title>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              getBooks();
            }}>
            <InputSerach
              onChange={(e) => setInput(e.target.value)}
              // ref={inputRef}
              placeholder="Search by Book Name"
              type={"text"}
            />
            <BiSearchAlt onClick={() => getBooks()} />
          </Form>
        </DivSearch>
      </Header>

      <ContentSection>
        <DefaultDiv isActive={active}>Nothing To Show!?</DefaultDiv>

        <CardsDiv isActive={cardDiv} className="cards">
          {data &&
            data.map((item) => {
              return (
                <Card key={item.id} className="card">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      padding: "15px",
                      borderBottom: "1px solid rgba(0,0,0,0.3)",
                    }}>
                    <img
                      style={{ height: "100%" }}
                      src={`${item.volumeInfo?.imageLinks?.thumbnail}`}
                      alt="book's face"
                    />
                  </div>

                  <CardContent>
                    <h2
                      style={{
                        marginBottom: "35px",
                        fontSize: "20px",
                        height: "15%",
                      }}>
                      {item.volumeInfo?.title}
                    </h2>
                    <span
                      style={{
                        display: "inline-block",
                        marginBottom: "30px",
                        fontSize: "20px",
                        paddingTop: "15px",
                        borderTop: "1px solid rgba(0,0,0,0.3)",
                      }}>
                      {item.volumeInfo?.authors}
                    </span>
                    <LinkDiv>
                      <BottomLink
                        href={`${item.volumeInfo?.previewLink} `}
                        target="_blank">
                        Preview
                      </BottomLink>
                      <BottomLink
                        onClick={() => {
                          axios
                            .get(
                              `https://www.googleapis.com/books/v1/volumes/${item.id}`
                            )
                            .then((res) => setModalData(res.data));
                          setModal(true);
                        }}>
                        Details
                      </BottomLink>
                    </LinkDiv>
                  </CardContent>
                </Card>
              );
            })}
        </CardsDiv>
        <ModalDiv isActive={modal}>
          <div>
            <img
              src={`${modalData?.volumeInfo?.imageLinks?.thumbnail}`}
              alt="book's page"
            />
          </div>
          <p style={{ fontWeight: "600", marginTop: "15px" }}>
            {modalData?.volumeInfo?.title}
          </p>
          <DivDesc>{modalData?.volumeInfo?.description}</DivDesc>
          <ExitDiv
            onClick={() => {
              setModal(false);
            }}>
            X
          </ExitDiv>
        </ModalDiv>
      </ContentSection>
    </>
  );
};

export default Home;
