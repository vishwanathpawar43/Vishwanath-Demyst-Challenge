import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  yearEstablished: string;
  loanAmount: number;
  accountProvider: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    yearEstablished: "",
    loanAmount: 0,
    accountProvider: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string | unknown>
  ): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    const formDataJSON = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      businessName: formData.businessName,
      businessType: formData.businessType,
      yearEstablished: formData.yearEstablished,
      loanAmount: formData.loanAmount,
      accountProvider: formData.accountProvider,
    };

    // const url = "http://backend:4000/api/v1/application/details";

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/application/details",
        formDataJSON
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setLoading(false);
        navigate("/review", { state: { response: response.data } });
      }, 5000);
    } catch (error) {
      setShowAlert(false);
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "120vh", bgcolor: "white" }}>
      <Box className="w-1/2 m-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          Business Loan Application
        </h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Business Type"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Year Established"
            name="yearEstablished"
            value={formData.yearEstablished}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Loan Amount"
            name="loanAmount"
            type="number"
            value={formData.loanAmount}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel>Account Provider</InputLabel>
            <Select
              label="Account Provider"
              name="accountProvider"
              value={formData.accountProvider}
              onChange={handleSelectChange}
            >
              <MenuItem value="Xero">Xero</MenuItem>
              <MenuItem value="MYOB">MYOB</MenuItem>
              {/* Add more options here */}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "1.5rem", padding: "0.75rem" }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
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

export default Home;
