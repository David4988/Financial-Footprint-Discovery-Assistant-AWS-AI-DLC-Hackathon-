import type { FinancialFootprint } from '@/types';

/**
 * Keyword-based response mapping for mocked AI assistant.
 * In the future, this will be replaced by a call to Bedrock AgentCore.
 */
export function getMockResponse(input: string, result: FinancialFootprint): string {
  const lower = input.toLowerCase();

  if (lower.includes('recurring') || lower.includes('expense') || lower.includes('subscription')) {
    const items = result.recurringExpenses;
    const total = items.reduce((sum, e) => sum + e.amount, 0);
    const list = items.map((e) => `• ${e.name}: ₹${e.amount.toLocaleString('en-IN')} (${e.frequency})`).join('\n');
    return `I detected ${items.length} recurring expenses totaling ₹${total.toLocaleString('en-IN')} per month:\n\n${list}`;
  }

  if (lower.includes('insurance') || lower.includes('premium') || lower.includes('policy')) {
    const items = result.insurance;
    const list = items.map((i) => `• ${i.name}: ₹${i.premiumAmount.toLocaleString('en-IN')} (${i.frequency}, ${i.insuranceType})`).join('\n');
    return `I found evidence of ${items.length} insurance premium payments:\n\n${list}`;
  }

  if (lower.includes('loan') || lower.includes('emi') || lower.includes('debt')) {
    const items = result.loans;
    const totalEmi = items.reduce((sum, l) => sum + l.emiAmount, 0);
    const list = items.map((l) => `• ${l.name}: ₹${l.emiAmount.toLocaleString('en-IN')}/month (${l.loanType})`).join('\n');
    return `I detected evidence of ${items.length} loan repayments with a combined monthly EMI of ₹${totalEmi.toLocaleString('en-IN')}:\n\n${list}`;
  }

  if (lower.includes('invest') || lower.includes('sip') || lower.includes('mutual') || lower.includes('fd')) {
    const items = result.investments;
    const list = items.map((inv) => `• ${inv.name}: ₹${inv.amount.toLocaleString('en-IN')} (${inv.investmentType})`).join('\n');
    return `I found evidence of ${items.length} investment-related transactions:\n\n${list}`;
  }

  if (lower.includes('attention') || lower.includes('alert') || lower.includes('warning') || lower.includes('issue')) {
    const items = result.attentionItems;
    const list = items.map((a) => `• [${a.severity.toUpperCase()}] ${a.name}: ${a.description}`).join('\n');
    return `There are ${items.length} items that need your attention:\n\n${list}`;
  }

  if (lower.includes('summary') || lower.includes('overview') || lower.includes('total')) {
    return result.executiveSummary;
  }

  return `I can help you explore your financial footprint. Try asking about:\n\n• Recurring expenses\n• Insurance premiums\n• Loans & EMIs\n• Investments\n• Items needing attention\n• Overall summary`;
}
