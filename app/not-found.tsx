import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { wrap } from "@/components/ui";

// One 404 for both languages (it can't know which one the visitor wanted), English first with Greek beside it.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pb-24 pt-[140px] md:pt-[180px]">
        <div className={wrap}>
          <h1 className="display text-[48px] md:text-[72px]">This page isn&apos;t here</h1>
          <p className="mt-4 max-w-[52ch] text-[18px] text-ink/85">It may have moved when we rebuilt our website. <span lang="el">Η σελίδα δεν βρέθηκε.</span></p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/" className="btn-primary">Go to the homepage</a>
            <a href="/el" className="btn-secondary" lang="el">Αρχική σελίδα</a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
