export default function TrustStrip() {
  return (
    <section className="py-10 bg-slate-50 border-y">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 text-center max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-extrabold">$0</div>
            <div className="text-slate-600">Cost to Students</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">100%</div>
            <div className="text-slate-600">Funded Programs</div>
          </div>
        </div>
      </div>
    </section>
  );
}
