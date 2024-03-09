import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <main className="flex min-h-screen  flex-col items-center justify-center text-xl dark   p-12 lg:p-24 bg-black">
      <Spinner label="Loading..." size="lg" />
    </main>
  );
}
