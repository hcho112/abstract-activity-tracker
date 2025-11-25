"use client";

import { useState, useMemo, useEffect } from "react";
import { fetchBatchTransactionCountsAction, TransactionCountResult } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Trash2 } from "lucide-react";

const STORAGE_KEY = "abstract-activity-tracker-addresses";

export function ActivityTracker() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<TransactionCountResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Load saved addresses on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setInput(saved);
    }
  }, []);

  const totalTransactions = useMemo(() => {
    return results.reduce((sum, result) => {
      return sum + (result.count || 0);
    }, 0);
  }, [results]);

  const handleCheck = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResults([]);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, input);

    const addresses = input
      .split(/[\s,]+/)
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const validAddresses: string[] = [];
    const invalidResults: TransactionCountResult[] = [];

    for (const address of addresses) {
      if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        invalidResults.push({
          address,
          count: null,
          error: "Invalid address format",
        });
      } else {
        validAddresses.push(address);
      }
    }

    const apiResults = await fetchBatchTransactionCountsAction(validAddresses);
    setResults([...invalidResults, ...apiResults]);
    setLoading(false);
  };

  const handleClear = () => {
    setInput("");
    setResults([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Check Transaction Counts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Contract Addresses
            </label>
            <Textarea
              placeholder="Enter Abstract contract addresses (separated by commas or spaces)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] font-mono text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCheck} disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Check Activity"
              )}
            </Button>
            <Button 
              onClick={handleClear} 
              disabled={loading || !input.trim()} 
              variant="outline"
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-3xl font-bold">{totalTransactions.toLocaleString()}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Across {results.length} {results.length === 1 ? 'address' : 'addresses'}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Total Transactions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs md:text-sm break-all">
                        {result.address}
                        {result.error && (
                          <span className="ml-2 text-red-500 text-xs">
                            ({result.error})
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {result.count !== null ? result.count.toLocaleString() : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
