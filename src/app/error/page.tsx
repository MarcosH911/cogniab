import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const errorMessage = (await searchParams).message || "Something went wrong";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{errorMessage}</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
