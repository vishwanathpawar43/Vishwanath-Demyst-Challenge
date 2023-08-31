export interface BalanceSheetEntry {
  year: number;
  month: number;
  profitOrLoss: number;
  assetsValue: number;
}

export interface BusinessApplication {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  yearEstablished: string;
  loanAmount: string;
  accountProvider: string;
}

export interface LoanApplication extends BusinessApplication {
  balanceSheet: BalanceSheetEntry[];
}

export interface DecisionInput {
  name: string;
  yearEstablished: string;
  profitLossSummary: string;
  loanAmount: number;
  preAssessment: number;
}
