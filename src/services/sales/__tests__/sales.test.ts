import { getSalesByYear, getAllSales } from '../sales';
import * as admin from '../../../firebase/firebaseAdmin'; // Import the entire module

// Mock firebaseAdmin.ts
jest.mock('../../../firebase/firebaseAdmin', () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    get: jest.fn(),
  },
}));

const mockSalesData = [
    // Year 2023
    { created_at: '2023-01-15T10:00:00Z', sale_sumary: { total_payed: 100, profit: 10 } },
    { created_at: '2023-01-20T11:00:00Z', sale_sumary: { total_payed: 200, profit: 20 } },
    { created_at: '2023-02-01T12:00:00Z', sale_sumary: { total_payed: 150, profit: 15 } },
    { created_at: '2023-03-10T13:00:00Z', sale_sumary: { total_payed: 300, profit: 30 } },
    // Year 2024
    { created_at: '2024-01-05T09:00:00Z', sale_sumary: { total_payed: 120, profit: 12 } },
    { created_at: '2024-01-25T10:00:00Z', sale_sumary: { total_payed: 220, profit: 22 } },
    { created_at: '2024-02-15T14:00:00Z', sale_sumary: { total_payed: 180, profit: 18 } },
    { created_at: '2024-04-01T15:00:00Z', sale_sumary: { total_payed: 400, profit: 40 } },
    // Year 2025 - only one sale
    { created_at: '2025-05-01T16:00:00Z', sale_sumary: { total_payed: 500, profit: 50 } },
];

describe('getSalesByYear', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the implementation of getAllSales to return our mock data
    // We need to cast admin.db.collection.get to a mock function
    (admin.db.collection('sales').get as jest.Mock).mockResolvedValue({
      docs: mockSalesData.map(sale => ({
        data: () => sale,
        id: Math.random().toString(), // Dummy ID
      })),
    });
  });

  it('should group sales by year and month with correct aggregations', async () => {
    const result = await getSalesByYear();

    // Check for 2023 data
    expect(result['2023']).toBeDefined();
    expect(result['2023'].length).toBe(12); // All months should be present

    const jan2023 = result['2023'].find(m => m.month === 'Jan');
    expect(jan2023).toEqual({ month: 'Jan', sales_quantity: 2, sales_amount: 300, profit: 30 });

    const feb2023 = result['2023'].find(m => m.month === 'Feb');
    expect(feb2023).toEqual({ month: 'Feb', sales_quantity: 1, sales_amount: 150, profit: 15 });

    const mar2023 = result['2023'].find(m => m.month === 'Mar');
    expect(mar2023).toEqual({ month: 'Mar', sales_quantity: 1, sales_amount: 300, profit: 30 });

    const apr2023 = result['2023'].find(m => m.month === 'Apr');
    expect(apr2023).toEqual({ month: 'Apr', sales_quantity: 0, sales_amount: 0, profit: 0 }); // No sales in Apr 2023


    // Check for 2024 data
    expect(result['2024']).toBeDefined();
    expect(result['2024'].length).toBe(12);

    const jan2024 = result['2024'].find(m => m.month === 'Jan');
    expect(jan2024).toEqual({ month: 'Jan', sales_quantity: 2, sales_amount: 340, profit: 34 });

    const feb2024 = result['2024'].find(m => m.month === 'Feb');
    expect(feb2024).toEqual({ month: 'Feb', sales_quantity: 1, sales_amount: 180, profit: 18 });

    const apr2024 = result['2024'].find(m => m.month === 'Apr');
    expect(apr2024).toEqual({ month: 'Apr', sales_quantity: 1, sales_amount: 400, profit: 40 });

    // Check for 2025 data
    expect(result['2025']).toBeDefined();
    expect(result['2025'].length).toBe(12);

    const may2025 = result['2025'].find(m => m.month === 'May');
    expect(may2025).toEqual({ month: 'May', sales_quantity: 1, sales_amount: 500, profit: 50 });

    // Verify month order for a year
    const months2023 = result['2023'].map(m => m.month);
    expect(months2023).toEqual([
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]);
  });

  it('should return empty data for years with no sales', async () => {
    // Provide no sales data
    (admin.db.collection('sales').get as jest.Mock).mockResolvedValue({ docs: [] });
    const result = await getSalesByYear();
    expect(Object.keys(result).length).toBe(0);
  });
});