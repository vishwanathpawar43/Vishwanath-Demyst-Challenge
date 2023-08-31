import { Request, Response } from "express";
import {
  calculatePreAssessment,
  getBalanceSheet,
  submitToDecisionEngine,
} from "../services/loanServices";
import { BusinessApplication, LoanApplication } from "../typings/general";

export const submitDetails = async (req: Request, res: Response) => {
  try {
    const applicationDetails: BusinessApplication = req.body;

    // Simulate getting the balance sheet from the accounting provider
    const balanceSheet = await getBalanceSheet(
      applicationDetails.accountProvider
    );

    const dataForReview = {
      applicationDetails,
      balanceSheet,
    };

    res.status(200).json({ success: true, dataForReview });
  } catch (error) {
    res.status(500).json({ success: false, error: "An error occurred" });
  }
};

export const submitApplication = async (req: Request, res: Response) => {
  try {
    const application: LoanApplication = req.body;

    const preAssessment = calculatePreAssessment(
      application.balanceSheet,
      parseInt(application.loanAmount)
    );

    const output = {
      name: application.name,
      yearEstablished: application.yearEstablished,
      loanAmount: parseInt(application.loanAmount),
      profitLossSummary: "",
      preAssessment,
    };

    // Simulate submitting the application and balance sheet to the decision engine
    const outcome = await submitToDecisionEngine(output);

    const response = {
      message: "Application submitted successfully",
      outcome,
    };

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: "An error occurred" });
  }
};
