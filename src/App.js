import { createGlobalStyle } from "styled-components";
import Home from "./page/Home/Home";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
}

export default App;
