import { MantineProvider } from "@mantine/core";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <div className="App">
        <MantineProvider>
          <HomePage />
        </MantineProvider>
      </div>
    </>
  );
}

export default App;
