import React from "react";
import { Container, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

// const Review: React.FC<{ response }> = ({ response }) => {
const Result: React.FC = () => {
  const location = useLocation();
  const { response } = location.state || { response: null };

  const {
    data: { outcome },
  } = response;

  const color = outcome.status === "Approved" ? "bg-green-500" : "bg-red-500";
  
  return (
    <Container
      maxWidth="lg"
      sx={{
        bgcolor: "white",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className={`w-3/4 h-[70vh] p-8 ${color}`}>
        <h1 className="text-5xl font-bold text-center mb-8  text-white">
          Application Result
        </h1>
        <Box className=" h-[60%] flex flex-col items-center justify-center  ">
          <h1 className="text-4xl font-bold justify-center items-center text-white">
            Status : {outcome.status}
          </h1>
          <h1 className="text-4xl font-bold justify-center items-center mt-4 text-white">
            Amount Approved (₹): {outcome.approvedAmount}
          </h1>
        </Box>
      </Box>
    </Container>
  );
};

export default Result;
