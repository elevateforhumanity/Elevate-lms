export default function CertificateDownload({
  student,
  program,
  date,
}: {
  student: string;
  program: string;
  date: string;
}) {
  function download() {
    const svg = new Blob(
      [
        `<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='1000'>
         <rect width='100%' height='100%' fill='white'/>
         <rect x='40' y='40' width='1320' height='920' fill='none' stroke='#1a3588' stroke-width='8' rx='24'/>
         <text x='700' y='200' text-anchor='middle' font-size='48' font-family='Inter' fill='#1a3588'>Certificate of Completion</text>
         <text x='700' y='360' text-anchor='middle' font-size='30' font-family='Inter' fill='#0f172a'>This certifies that</text>
         <text x='700' y='450' text-anchor='middle' font-size='56' font-family='Inter' font-weight='700' fill='#224dd1'>${student}</text>
         <text x='700' y='520' text-anchor='middle' font-size='28' font-family='Inter' fill='#0f172a'>has successfully completed</text>
         <text x='700' y='600' text-anchor='middle' font-size='40' font-family='Inter' font-weight='700' fill='#19c39c'>${program}</text>
         <text x='700' y='700' text-anchor='middle' font-size='24' font-family='Inter' fill='#0f172a'>Date: ${date}</text>
         <text x='220' y='820' font-size='18' font-family='Inter' fill='#0f172a'>Director</text>
         <text x='1080' y='820' font-size='18' font-family='Inter' fill='#0f172a'>Registrar</text>
       </svg>`,
      ],
      { type: 'image/svg+xml' }
    );
    const url = URL.createObjectURL(svg);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${student.replace(/\s+/g, '-')}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold">Certificate Preview</div>
          <div className="text-black text-sm mt-1">
            SVG download (print-ready)
          </div>
        </div>
        <button className="btn" aria-label="Button" onClick={download}>
          Download SVG
        </button>
      </div>
      {/* Preview */}
      <div className="mt-6 border rounded-lg p-8 bg-white">
        <div className="border-4 border-brand-600 rounded-2xl p-12 text-center">
          <div className="text-3xl font-bold text-brand-600">
            Certificate of Completion
          </div>
          <div className="mt-8 text-lg text-black">This certifies that</div>
          <div className="mt-4 text-4xl font-bold text-brand-700 text-2xl md:text-3xl lg:text-4xl">
            {student}
          </div>
          <div className="mt-4 text-lg text-black">
            has successfully completed
          </div>
          <div className="mt-4 text-3xl font-bold text-accent-600">
            {program}
          </div>
          <div className="mt-8 text-black">Date: {date}</div>
          <div className="mt-12 flex justify-between text-sm text-black">
            <div>Director</div>
            <div>Registrar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
