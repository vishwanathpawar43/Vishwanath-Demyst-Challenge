import React, { useState } from "react";
import {
  Container,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface BalanceSheetEntry {
  year: number;
  month: number;
  profitOrLoss: number;
  assetsValue: number;
}

// const Review: React.FC<{ response }> = ({ response }) => {
const Review: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const { response } = location.state || { response: null };

  const {
    dataForReview: { applicationDetails: data },
  } = response;

  const {
    dataForReview: { balanceSheet },
  } = response;

  const handleEdit = () => {
    navigate("/");
  };

  const handleSubmit = async (): // event: FormEvent<HTMLFormElement>
  Promise<void> => {
    // event.preventDefault();
    setLoading(true);

    const formDataJSON = {
      ...data,
      balanceSheet,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/application/submit",
        formDataJSON
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setLoading(false);
        navigate("/result", { state: { response: response.data } });
      }, 5000);
    } catch (error) {
      setShowAlert(false);
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ bgcolor: "white" }}>
      <Box className="w-full m-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Application Review
        </h1>

        <Box className="flex mb-4">
          <h3 className="text-xl font-bold text-left mr-8">Name:</h3>
          <p className="text-xl text-gray-500">{data.name}</p>
        </Box>
        <Box className="flex mb-4">
          <h3 className="text-xl font-bold text-left mr-8">Email:</h3>
          <p className="text-xl text-gray-500">{data.email}</p>
        </Box>

        <Box className="flex mb-4">
          <h3 className="text-xl font-bold text-left mr-8">Phone:</h3>
          <p className="text-xl text-gray-500">{data.phone}</p>
        </Box>

        <Box className="flex mb-4">
          <h3 className="text-xl font-bold text-left mr-8">Business Name:</h3>
          <p className="text-xl text-gray-500">{data.businessName}</p>
        </Box>

        <Box className="flex mb-4">
          <h3 className="text-xl font-bold text-left mr-8">Business Type:</h3>
          <p className="text-xl text-gray-500">{data.businessType}</p>
        </Box>

        <Box className="flex mb-4">
          <h3 className="text-xl font-bold text-left mr-8">
            Year Established:
          </h3>
          <p className="text-xl text-gray-500">{data.yearEstablished}</p>
        </Box>

        <Box className="flex mb-4">
          <h3 className="text-xl font-bold text-left mr-8">Loan Amount:</h3>
          <p className="text-xl text-gray-500">₹ {data.loanAmount}</p>
        </Box>

        <Box className="flex mb-4">
          <h3 className="text-xl font-bold text-left mr-8 mb-2">
            Balance Sheet:
          </h3>
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="right">Month</TableCell>
                <TableCell align="right">Proft / Loss &nbsp;(₹)</TableCell>
                <TableCell align="right">Assets Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {balanceSheet.map((row: BalanceSheetEntry, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.year}
                  </TableCell>
                  <TableCell align="right">{row.month}</TableCell>
                  <TableCell align="right">{row.profitOrLoss}</TableCell>
                  <TableCell align="right">{row.assetsValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="flex justify-between mt-8 mb-8">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "1.5rem", padding: "0.75rem", width: "20%" }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "1.5rem", padding: "0.75rem", width: "20%" }}
            onClick={handleSubmit}
          >
            {/* Submit */}
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Box>
      {showAlert && (
        <Alert
          variant="filled"
          severity="success"
          sx={{ marginBottom: "2rem" }}
        >
          Successfully submitted!
        </Alert>
      )}
    </Container>
  );
};

export default Review;
