type EmailApplicationData = {
  name: string;
  email: string;
  phoneNumber: string;
  passportNationality: string;
  destinationCountry: string;
  preferredTravelDate: string;
  numberOfDaysOfStay: string;
  visaType: string;
  totalTravellers: string | number;
  numberOfAdults: string | number;
  numberOfChildren: string | number;
};

type UploadedDocument = {
  name: string;
  url: string;
  size: number;
  sizeInMB?: number;
};

function formatDate(date: string) {
  if (!date) return "Not provided";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date: Date) {
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFileSize(size: number) {
  if (!size) return "0 MB";
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function docSizeInMB(doc: UploadedDocument) {
  if (typeof doc.sizeInMB === "number") return doc.sizeInMB.toFixed(1);
  return (doc.size / (1024 * 1024)).toFixed(1);
}

function row(label: string, value: string, alternate = false) {
  return `
    <tr style="background:${alternate ? "#F0E4C8" : "#FAF3E8"};">
      <td style="padding:12px 14px;font-weight:700;color:#1C2F4A;border:1px solid #E2D2AD;width:42%;">${label}</td>
      <td style="padding:12px 14px;color:#2F3F58;border:1px solid #E2D2AD;">${value}</td>
    </tr>
  `;
}

export function generateEmailHTML(data: EmailApplicationData, docs: UploadedDocument[]): string {
  const now = new Date();

  const docsSection = docs.length
    ? `
      <section style="margin-top:20px;">
        <h3 style="margin:0 0 12px;color:#1C2F4A;font-size:16px;">📎 ATTACHED DOCUMENTS (${docs.length} file${docs.length > 1 ? "s" : ""})</h3>
        <div>
          ${docs
            .map(
              (doc) => `
                <table cellpadding="0" cellspacing="0" border="0" style="width:100%; margin-bottom:12px; border-radius:10px; overflow:hidden; border:1px solid #E8D5B0;">
                  <tr>
                    <td style="width:60px; background:#FEF3C7; padding:16px; text-align:center; vertical-align:middle;">
                      <div style="font-size:28px;">📄</div>
                    </td>
                    <td style="padding:12px 16px; background:#FAF3E8; vertical-align:middle;">
                      <div style="font-size:14px; font-weight:700; color:#1C2F4A; margin-bottom:4px;">
                        ${doc.name}
                      </div>
                      <div style="font-size:12px; color:#8B7355;">
                        ${docSizeInMB(doc)} MB
                      </div>
                    </td>
                    <td style="padding:12px 16px; background:#FAF3E8; text-align:right; vertical-align:middle;">
                      <a href="${doc.url}" target="_blank" style="display:inline-block; padding:8px 18px; background:#C9973A; color:white; text-decoration:none; border-radius:8px; font-size:13px; font-weight:600;">
                        View →
                      </a>
                    </td>
                  </tr>
                </table>
              `
            )
            .join("")}
        </div>
      </section>
    `
    : "";

  return `
  <!DOCTYPE html>
  <html>
    <body style="margin:0;padding:20px;background:#f6efe4;font-family:Arial,sans-serif;color:#1f2b3a;">
      <div style="max-width:760px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e6d8b9;">
        <div style="background: linear-gradient(135deg, #C9973A, #E8B84B); padding: 6px 0; text-align: center;">
          <span style="color:white; font-size:12px; font-weight:600; letter-spacing:1px;">
            NEW APPLICATION RECEIVED
          </span>
        </div>
        <header style="background:#1C2F4A;color:#FAF3E8;padding:22px 24px;">
          <div style="font-size:24px;font-weight:800;letter-spacing:0.4px;">🏠 <span style="color:#F8D88A;">VisaHouse</span></div>
          <div style="margin-top:6px;font-size:15px;opacity:0.95;">New Visa Application Received</div>
        </header>

        <section style="background:#C9973A;color:#fff;padding:16px 24px;">
          <div style="font-size:20px;font-weight:700;">✈️ ${data.destinationCountry} — ${data.visaType} Visa</div>
          <div style="margin-top:4px;font-size:13px;opacity:0.95;">Submitted: ${formatDateTime(now)}</div>
        </section>

        <div style="padding:22px 24px;">
          <section>
            <h3 style="margin:0 0 12px;color:#1C2F4A;font-size:16px;">👤 APPLICANT DETAILS</h3>
            <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-radius:10px;overflow:hidden;">
              ${row("Full Name", data.name)}
              ${row("Email", data.email, true)}
              ${row("Phone", `+91 ${data.phoneNumber}`)}
              ${row("Passport", data.passportNationality, true)}
            </table>
          </section>

          <section style="margin-top:20px;">
            <h3 style="margin:0 0 12px;color:#1C2F4A;font-size:16px;">🗺️ TRIP DETAILS</h3>
            <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-radius:10px;overflow:hidden;">
              ${row("Destination", data.destinationCountry)}
              ${row("Travel Date", formatDate(data.preferredTravelDate), true)}
              ${row("Days of Stay", `${data.numberOfDaysOfStay} day(s)`)}
              ${row("Visa Type", data.visaType, true)}
            </table>
          </section>

          <section style="margin-top:20px;background:#FAF3E8;border:1px solid #E2D2AD;border-radius:10px;padding:14px;">
            <h3 style="margin:0 0 8px;color:#1C2F4A;font-size:16px;">👥 TRAVELLERS</h3>
            <div style="font-size:14px;color:#2F3F58;">
              Total: <strong>${data.totalTravellers}</strong> &nbsp; | &nbsp;
              Adults: <strong>${data.numberOfAdults}</strong> &nbsp; | &nbsp;
              Children: <strong>${data.numberOfChildren}</strong>
            </div>
          </section>

          ${docsSection}

          <section style="margin-top:22px;">
            <a href="mailto:${data.email}?subject=Re:%20Visa%20Application%20for%20${encodeURIComponent(
              data.destinationCountry
            )}" style="display:inline-block;background:#2D5A3D;color:#fff;text-decoration:none;font-weight:700;padding:11px 16px;border-radius:8px;">
              Reply to Applicant
            </a>
          </section>
        </div>

        <footer style="background:#5C3D1E;color:#F5ECD7;padding:14px 24px;font-size:12px;">
          VisaHouse | Mumbai | visahouse.in
        </footer>
      </div>
    </body>
  </html>
  `;
}
