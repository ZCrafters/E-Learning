'use client'

interface TableRow {
  dimensi: string
  sales: string
  pao: string
}

interface ComparisonTableProps {
  headers: [string, string, string]
  rows: TableRow[]
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  const getClassName = (text: string) => {
    if (text.includes('good') || text.startsWith('✓')) return 'text-green-600'
    if (text.includes('bad') || text.startsWith('✗')) return 'text-red-600'
    if (text.includes('warn')) return 'text-amber-600'
    return ''
  }

  const cleanText = (text: string) => {
    return text.replace(/^(good|bad|warn)\s*/i, '').replace(/^[✓✗]\s*/, '')
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="p-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground border-b">
              {headers[0]}
            </th>
            <th className="p-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground border-b">
              {headers[1]}
            </th>
            <th className="p-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground border-b">
              {headers[2]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b last:border-0 hover:bg-muted/50">
              <td className="p-3 font-medium">{row.dimensi}</td>
              <td className={`p-3 ${getClassName(row.sales)}`}>{cleanText(row.sales)}</td>
              <td className={`p-3 ${getClassName(row.pao)}`}>{cleanText(row.pao)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
