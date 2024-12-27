import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckIcon, XIcon } from "lucide-react"

interface ComparisonTableProps {
  headers: string[]
  rows: Array<{
    feature: string
    [key: string]: string | boolean
  }>
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="relative overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                key={header}
                className={index === 0 ? "w-[250px]" : "text-center"}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object.entries(row).map(([key, value], cellIndex) => (
                <TableCell
                  key={key}
                  className={cellIndex === 0 ? "font-medium" : "text-center"}
                >
                  {typeof value === "boolean" ? (
                    value ? (
                      <CheckIcon className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <XIcon className="h-5 w-5 text-muted-foreground mx-auto" />
                    )
                  ) : (
                    value
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
