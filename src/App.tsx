import { ThemeProvider } from "@/lib/theme-provider";
import { Dashboard } from "@/components/dashboard/dashboard";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Dashboard />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
