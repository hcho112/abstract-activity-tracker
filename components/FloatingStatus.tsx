"use client";

import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function FloatingStatus() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-50 pointer-events-none">
      <Card className="max-w-3xl w-full p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl bg-background border-zinc-200 dark:border-zinc-800 pointer-events-auto">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-amber-600 dark:text-amber-500 mr-2">Work In Progress:</span>
          Hosted version scraping requires a proxy to bypass bot protection. Local execution is recommended.
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0 gap-2">
          <Link href="https://github.com/hcho112/abstract-activity-tracker" target="_blank">
            <Github className="w-4 h-4" />
            Project Code
          </Link>
        </Button>
      </Card>
    </div>
  );
}
