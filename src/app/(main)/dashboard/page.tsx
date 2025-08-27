"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";

import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";

const NAVIGATION: Navigation = [
  { kind: "header", title: "Main Pages" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "about", title: "About", icon: <InfoIcon /> },
  { segment: "services", title: "Services", icon: <BuildIcon /> },
  { segment: "contact", title: "Contact", icon: <ContactMailIcon /> },
  { segment: "available", title: "Available", icon: <LibraryBooksIcon /> },
  { kind: "divider" },
  { segment: "logout", title: "Logout", icon: <LogoutIcon /> },
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

// 📊 Dashboard Page
function DashboardContent() {
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📊 Library Management Dashboard
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} mb={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">📚 Total Books</Typography>
            <Typography variant="h4">200</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">👥 Active Members</Typography>
            <Typography variant="h4">50</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">📖 Books Issued</Typography>
            <Typography variant="h4">20</Typography>
          </CardContent>
        </Card>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📋 Recent Transactions
          </Typography>
          <Typography>- John issued &quot;Book A&quot;</Typography>
          <Typography>- Sarah returned &quot;Book B&quot;</Typography>
          <Typography>- Alex reserved &quot;Book C&quot;</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

// ℹ️ About Page (Simplified)
function AboutContent() {
  return (
    <Box p={3} sx={{ backgroundColor: "darklight", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "Bule" }}
      >
        About Page
      </Typography>
    </Box>
  );
}

// 🛠️ Services Page
function ServicesContent() {
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🛠️ Our Services
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        <Card>
          <CardContent>
            <Typography variant="h6">📖 Book Borrowing</Typography>
            <Typography>Issue and return books easily.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">🔍 Book Search</Typography>
            <Typography>Find books quickly with advanced search.</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

// 📩 Contact Page
function ContactContent() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sentMessages, setSentMessages] = React.useState<
    { id: number; text: string }[]
  >([]);
  const [success, setSuccess] = React.useState("");

  const handleSendMessage = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSuccess("⚠️ Please fill all fields before sending.");
      return;
    }

    const newMsg = {
      id: Date.now(),
      text: `${name} (${email}): ${message}`,
    };

    setSentMessages([...sentMessages, newMsg]);
    setSuccess("✅ Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDeleteMessage = (id: number) => {
    setSentMessages(sentMessages.filter((msg) => msg.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📩 Contact Us
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send Message
        </Button>

        {success && (
          <Typography color={success.includes("✅") ? "green" : "red"}>
            {success}
          </Typography>
        )}
      </Box>

      {sentMessages.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            📜 Sent Messages
          </Typography>
          {sentMessages.map((msg) => (
            <Card
              key={msg.id}
              sx={{ mb: 1, p: 1, display: "flex", alignItems: "center" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2">{msg.text}</Typography>
              </CardContent>
              <IconButton color="error" onClick={() => handleDeleteMessage(msg.id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

// 📚 Available Books Page
function AvailableContent() {
  const [books, setBooks] = React.useState([
    { id: 1, title: "Book A", author: "Author 1", status: "Available" },
    { id: 2, title: "Book B", author: "Author 2", status: "Issued" },
  ]);

  const [newTitle, setNewTitle] = React.useState("");
  const [newAuthor, setNewAuthor] = React.useState("");
  const [newStatus, setNewStatus] = React.useState("Available");

  const handleAddBook = () => {
    if (!newTitle.trim() || !newAuthor.trim()) return;
    const newBook = {
      id: books.length + 1,
      title: newTitle,
      author: newAuthor,
      status: newStatus,
    };
    setBooks([...books, newBook]);
    setNewTitle("");
    setNewAuthor("");
    setNewStatus("Available");
  };

  const handleDeleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const columns = [
    { field: "title", headerName: "Book Title", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteBook(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📚 Available Books
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Book Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          label="Author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Issued">Issued</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddBook}>
          Add
        </Button>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={books} columns={columns} />
      </div>
    </Box>
  );
}

// Page Routing Logic
function DemoPageContent({ pathname }: { pathname: string }) {
  if (pathname === "/dashboard") return <DashboardContent />;
  if (pathname === "/about") return <AboutContent />;
  if (pathname === "/services") return <ServicesContent />;
  if (pathname === "/contact") return <ContactContent />;
  if (pathname === "/available") return <AvailableContent />;
  return null;
}

export default function DashboardLayoutBasic() {
  const router = useDemoRouter("/dashboard");
  const nextRouter = useRouter();

  React.useEffect(() => {
    if (router.pathname === "/logout") {
      nextRouter.push("/");
    }
  }, [router.pathname, nextRouter]);

  return (
    <DemoProvider>
      <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
        <DashboardLayout branding={{ title: "Library Management System" }}>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}
