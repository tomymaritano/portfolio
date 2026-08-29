import { PageFrame } from "@/components/page-frame";

export default function Loading() {
  return (
    <PageFrame className="pt-10 pb-24">
      <div aria-busy="true" aria-live="polite">
        <p className="sr-only">Loading</p>
        <div className="tile-ph h-8 max-w-[16rem] rounded-md bg-card" />
        <div className="mt-8 space-y-3">
          <div className="tile-ph h-4 max-w-[40rem] rounded-md bg-card" />
          <div className="tile-ph h-4 max-w-[36rem] rounded-md bg-card" />
          <div className="tile-ph h-4 max-w-[28rem] rounded-md bg-card" />
        </div>
      </div>
    </PageFrame>
  );
}
