import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

// ── Mock data ──────────────────────────────────────────────────────────────────
const incomeVsExpensesData = [
  { month: 'Jan', Income: 95000,  Expenses: 52000 },
  { month: 'Feb', Income: 105000, Expenses: 58000 },
  { month: 'Mar', Income: 110000, Expenses: 61000 },
  { month: 'Apr', Income: 115000, Expenses: 65000 },
  { month: 'May', Income: 125430, Expenses: 78230 },
  { month: 'Jun', Income: 130000, Expenses: 72000 },
];

// ── Summary metric cards ───────────────────────────────────────────────────────
const summaryMetrics = [
  {
    label: 'Income',
    amount: '₹1,25,430',
    change: '+12.5% this month',
    positive: true,
  },
  {
    label: 'Expenses',
    amount: '₹78,230',
    change: '-8.2% this month',
    positive: false,
  },
  {
    label: 'Savings',
    amount: '₹47,200',
    change: '+15.3% this month',
    positive: true,
  },
];

// ── Custom tooltip for the bar chart ──────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: '#1E293B',
        border: '1px solid #334155',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 12,
      }}
    >
      <p style={{ color: '#E2E8F0', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color, margin: '2px 0' }}>
          {entry.name}: ₹{Number(entry.value).toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function FinancialOverview() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-5">
      {/* Header */}
      <div>
        <p className="text-sm text-text-secondary">Financial Overview</p>
        <p className="text-xs text-slate-500">Income, expenses &amp; savings at a glance</p>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {summaryMetrics.map(({ label, amount, change, positive }) => (
          <div
            key={label}
            className="bg-bg border border-border rounded-lg p-3 flex flex-col gap-1"
          >
            <span className="text-xs text-text-secondary">{label}</span>
            <span className="text-base font-semibold text-text-primary">{amount}</span>
            <span
              className="flex items-center gap-1 text-xs font-medium"
              style={{ color: positive ? '#10B981' : '#EF4444' }}
            >
              {positive ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              {change}
            </span>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div>
        <p className="text-xs text-slate-500 mb-2">Income vs Expenses</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={incomeVsExpensesData}
              barCategoryGap="30%"
              barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(51,65,85,0.3)' }} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8, color: '#94A3B8' }}
                iconType="circle"
                iconSize={8}
              />
              <Bar dataKey="Income" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
