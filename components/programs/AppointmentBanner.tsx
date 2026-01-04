export function AppointmentBanner() {
  return (
    <div className="mb-6 rounded-xl border-l-4 border-blue-600 bg-blue-50 p-4 text-sm text-gray-900">
      <strong>Appointment Required:</strong> Start by submitting the inquiry
      form, then schedule your WorkOne appointment at{' '}
      <a
        href="https://www.indianacareerconnect.com"
        target="_blank"
        rel="noreferrer"
        className="font-semibold underline"
      >
        IndianaCareerConnect.com
      </a>
      .
    </div>
  );
}
