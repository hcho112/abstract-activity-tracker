import { ActivityTracker } from "@/components/activity-tracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8 md:p-24">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Abstract Activity Tracker
          </h1>
          <p className="text-lg text-muted-foreground">
            Check total transaction counts for Abstract smart contracts
          </p>
        </div>
        
        <ActivityTracker />
      </div>
    </main>
  );
}
