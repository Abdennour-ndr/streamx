export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-10 h-10">
          <div className="absolute w-full h-full border-4 border-muted rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
} 