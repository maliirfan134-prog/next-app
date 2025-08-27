"use client";

import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from "@mui/material";

export default function AvailableBooksPage() {
  const [search, setSearch] = React.useState("");
  const [books, setBooks] = React.useState([
    { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", status: "Available" },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", status: "Issued" },
    { id: 3, title: "Operating System Concepts", author: "Silberschatz", status: "Available" },
    { id: 4, title: "Database System Concepts", author: "Henry F. Korth", status: "Available" },
    { id: 5, title: "Artificial Intelligence", author: "Stuart Russell", status: "Issued" },
  ]);

  const handleIssue = (id: number) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "Issued" } : b
      )
    );
  };

  const handleReturn = (id: number) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "Available" } : b
      )
    );
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📚 Available Books
      </Typography>

      <TextField
        label="Search books..."
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Author</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.status}</TableCell>
                <TableCell>
                  {book.status === "Available" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleIssue(book.id)}
                    >
                      Issue
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleReturn(book.id)}
                    >
                      Return
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
