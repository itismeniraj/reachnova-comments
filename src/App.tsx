import { Toaster } from "react-hot-toast";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";

function App() {
  return (
    <div className="app">
      <Toaster />
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}

export default App;
