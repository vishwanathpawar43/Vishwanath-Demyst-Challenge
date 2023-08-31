import { BalanceSheetEntry, DecisionInput } from "../typings/general";

export const calculatePreAssessment = (
  profitLossData: BalanceSheetEntry[],
  loanAmount: number
): number => {
  const hasProfit = profitLossData.some((item) => item.profitOrLoss > 0);
  const avgAssetsValue =
    profitLossData.reduce((sum, item) => sum + item.profitOrLoss, 0) /
    profitLossData.length;

  let preAssessment = 20;

  if (hasProfit) {
    preAssessment = 60;
  }
  if (avgAssetsValue > loanAmount) {
    preAssessment = 100;
  }
  return preAssessment;
};

export const getBalanceSheet = async (
  provider: string
): Promise<BalanceSheetEntry[]> => {
  // Simulate fetching balance sheet data
  const sheet: BalanceSheetEntry[] = [
    {
      year: 2021,
      month: 8,
      profitOrLoss: 125000,
      assetsValue: 5000,
    },
    {
      year: 2021,
      month: 7,
      profitOrLoss: 8700,
      assetsValue: 6700,
    },
    {
      year: 2021,
      month: 6,
      profitOrLoss: 9000,
      assetsValue: 8500,
    },
    {
      year: 2021,
      month: 5,
      profitOrLoss: -12000, //-12000 14179.667
      assetsValue: 9200,
    },
    {
      year: 2021,
      month: 4,
      profitOrLoss: 25000,
      assetsValue: 8000,
    },
    {
      year: 2021,
      month: 3,
      profitOrLoss: 17800,
      assetsValue: 9600,
    },
    {
      year: 2021,
      month: 2,
      profitOrLoss: 30000,
      assetsValue: 10200,
    },
    {
      year: 2021,
      month: 1,
      profitOrLoss: -100000,
      assetsValue: 10500,
    },
    {
      year: 2020,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234,
    },
    {
      year: 2020,
      month: 11,
      profitOrLoss: 1150,
      assetsValue: 5789,
    },
    {
      year: 2020,
      month: 10,
      profitOrLoss: 2500,
      assetsValue: 22345,
    },
    {
      year: 2020,
      month: 9,
      profitOrLoss: -187000,
      assetsValue: 223452,
    },
  ];

  // Simulate delay of 1 second before returning the sheet
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return sheet;
};

export const submitToDecisionEngine = async (
  application: DecisionInput
): Promise<{ status: string; approvedAmount: number }> => {
    
  // Simulate submitting to decision engine
  let status = "Approved";
//   let status = "Rejected";
  let approvedAmount = 0;

  if (status === "Approved") {
    approvedAmount = Math.floor(
      (application.loanAmount * application.preAssessment) / 100
    );
  }

  // Simulate delay of 1 second before returning the outcome
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { status, approvedAmount };
};
