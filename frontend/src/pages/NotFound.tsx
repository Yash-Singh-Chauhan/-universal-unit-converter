import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { SEOHead } from "@/components/common";
import { ROUTES } from "@/constants";

export function NotFoundPage() {
  return (
    <>
      <SEOHead title="Page Not Found" />

      <div className="flex items-center justify-center min-h-[60vh]">
        <Card variant="default" padding="lg" className="max-w-md w-full text-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-6xl font-bold text-[var(--color-primary-500)]">
                404
              </span>
              <h1 className="text-2xl font-bold text-[var(--color-text)]">
                Page not found
              </h1>
              <p className="text-[var(--color-text-secondary)]">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => window.history.back()}
                icon={<ArrowLeft size={16} />}
              >
                Go back
              </Button>
              <Link to={ROUTES.HOME}>
                <Button
                  variant="primary"
                  size="md"
                  icon={<Home size={16} />}
                >
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
