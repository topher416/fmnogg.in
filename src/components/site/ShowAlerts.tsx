import AlertForm from "./AlertForm";

/** Show-night main call to action: the alerts form, plain on the page background. */
export default function ShowAlerts() {
  return (
    <section aria-label="Show alerts" className="border-b border-white/[0.06] py-10">
      <div className="max-w-[520px]">
        <h2 className="text-[1.35rem] font-semibold leading-snug text-white/90">
          Show alerts
        </h2>
        <p className="mt-1 text-[0.95rem] text-white/55">
          One email when a show is announced.
        </p>
        <AlertForm />
      </div>
    </section>
  );
}
