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

/** Safe for HTML text nodes (prevents broken layout / injection from special chars). */
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(date: string) {
  if (!date) return "Not provided";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return escapeHtml(date);
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

function docSizeInMB(doc: UploadedDocument) {
  if (typeof doc.sizeInMB === "number") return doc.sizeInMB.toFixed(1);
  return (doc.size / (1024 * 1024)).toFixed(1);
}

/** Text in table cells: wrap long emails, URLs, country names — no horizontal overflow. */
const cellWrap =
  "word-break:break-word;word-wrap:break-word;overflow-wrap:break-word;-ms-word-break:break-all;hyphens:auto;";

function row(label: string, value: string, alternate = false) {
  const bg = alternate ? "#F0E4C8" : "#FAF3E8";
  const l = escapeHtml(label);
  const v = escapeHtml(value);
  return `
    <tr style="background:${bg};">
      <td valign="top" style="padding:12px 14px;font-weight:700;color:#1C2F4A;border:1px solid #E2D2AD;width:34%;${cellWrap}">${l}</td>
      <td valign="top" style="padding:12px 14px;color:#2F3F58;border:1px solid #E2D2AD;${cellWrap}">${v}</td>
    </tr>
  `;
}

function docCard(doc: UploadedDocument) {
  const name = escapeHtml(doc.name);
  const size = docSizeInMB(doc);
  const href = escapeHtml(doc.url);

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;max-width:100%;table-layout:fixed;margin-bottom:14px;border:1px solid #E8D5B0;border-radius:10px;overflow:visible;">
      <tr>
        <td style="padding:0;background:#FAF3E8;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;table-layout:fixed;">
            <tr>
              <td valign="top" width="56" style="width:56px;min-width:48px;background:#FEF3C7;padding:12px 8px;text-align:center;vertical-align:top;">
                <div style="font-size:26px;line-height:1;">📄</div>
              </td>
              <td valign="top" style="padding:12px 14px 12px 8px;${cellWrap}">
                <div style="font-size:14px;font-weight:700;color:#1C2F4A;margin-bottom:6px;line-height:1.35;">${name}</div>
                <div style="font-size:12px;color:#8B7355;margin-bottom:12px;">${size} MB</div>
                <a href="${href}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:10px 20px;background:#C9973A;color:#ffffff !important;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;line-height:1.2;max-width:100%;box-sizing:border-box;word-break:break-all;">
                  View →
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

export function generateEmailHTML(data: EmailApplicationData, docs: UploadedDocument[]): string {
  const now = new Date();

  const docsSection = docs.length
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:20px;">
        <tr>
          <td style="padding:0;">
            <h3 style="margin:0 0 12px;color:#1C2F4A;font-size:16px;line-height:1.3;${cellWrap}">
              📎 ATTACHED DOCUMENTS (${docs.length} file${docs.length > 1 ? "s" : ""})
            </h3>
            ${docs.map((d) => docCard(d)).join("")}
          </td>
        </tr>
      </table>
    `
    : "";

  const replySubject = encodeURIComponent(`Re: Visa Application for ${data.destinationCountry}`);
  const replyMailto = encodeURI(`mailto:${data.email}?subject=${replySubject}`);

  const d = {
    destinationCountry: escapeHtml(data.destinationCountry),
    visaType: escapeHtml(data.visaType),
    totalTravellers: escapeHtml(String(data.totalTravellers)),
    numberOfAdults: escapeHtml(String(data.numberOfAdults)),
    numberOfChildren: escapeHtml(String(data.numberOfChildren)),
  };

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Visa application</title>
  </head>
  <body style="margin:0;padding:0;background:#f6efe4;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    <!-- Outer wrapper: centers card and allows full width shrink on mobile -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
      <tr>
        <td align="center" style="padding:16px 12px;vertical-align:top;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;max-width:640px;border-collapse:collapse;table-layout:fixed;background:#ffffff;border:1px solid #e6d8b9;border-radius:14px;overflow:visible;">
            <tr>
              <td style="padding:0;vertical-align:top;">
                <div style="background:linear-gradient(135deg,#C9973A,#E8B84B);padding:8px 12px;text-align:center;">
                  <span style="color:#ffffff;font-size:12px;font-weight:600;letter-spacing:1px;line-height:1.4;${cellWrap}">
                    NEW APPLICATION RECEIVED
                  </span>
                </div>
                <header style="background:#1C2F4A;color:#FAF3E8;padding:20px 18px;">
                  <div style="font-size:22px;font-weight:800;letter-spacing:0.3px;line-height:1.3;${cellWrap}">
                    🏠 <span style="color:#F8D88A;">VisaHouse</span>
                  </div>
                  <div style="margin-top:8px;font-size:14px;opacity:0.95;line-height:1.4;${cellWrap}">New Visa Application Received</div>
                </header>

                <section style="background:#C9973A;color:#fff;padding:14px 18px;">
                  <div style="font-size:18px;font-weight:700;line-height:1.45;${cellWrap}">
                    ✈️ ${d.destinationCountry} — ${d.visaType} Visa
                  </div>
                  <div style="margin-top:6px;font-size:12px;opacity:0.95;line-height:1.4;${cellWrap}">
                    Submitted: ${escapeHtml(formatDateTime(now))}
                  </div>
                </section>

                <div style="padding:18px 16px 22px;">
                  <section>
                    <h3 style="margin:0 0 10px;color:#1C2F4A;font-size:16px;line-height:1.3;">👤 APPLICANT DETAILS</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:100%;table-layout:fixed;border-collapse:collapse;">
                      ${row("Full Name", data.name)}
                      ${row("Email", data.email, true)}
                      ${row("Phone", `+91 ${data.phoneNumber}`)}
                      ${row("Passport", data.passportNationality, true)}
                    </table>
                  </section>

                  <section style="margin-top:18px;">
                    <h3 style="margin:0 0 10px;color:#1C2F4A;font-size:16px;line-height:1.3;">🗺️ TRIP DETAILS</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:100%;table-layout:fixed;border-collapse:collapse;">
                      ${row("Destination", data.destinationCountry)}
                      ${row("Travel Date", data.preferredTravelDate ? formatDate(data.preferredTravelDate) : "Not provided", true)}
                      ${row("Days of Stay", `${data.numberOfDaysOfStay} day(s)`)}
                      ${row("Visa Type", data.visaType, true)}
                    </table>
                  </section>

                  <section style="margin-top:18px;background:#FAF3E8;border:1px solid #E2D2AD;border-radius:10px;padding:14px;">
                    <h3 style="margin:0 0 8px;color:#1C2F4A;font-size:16px;line-height:1.3;">👥 TRAVELLERS</h3>
                    <div style="font-size:14px;color:#2F3F58;line-height:1.55;${cellWrap}">
                      Total: <strong>${d.totalTravellers}</strong><br style="display:none;" />
                      <span style="display:inline-block;margin:4px 0;">Adults: <strong>${d.numberOfAdults}</strong></span>
                      <span style="display:inline-block;margin:4px 0;"> &nbsp;|&nbsp; </span>
                      <span style="display:inline-block;margin:4px 0;">Children: <strong>${d.numberOfChildren}</strong></span>
                    </div>
                  </section>

                  ${docsSection}

                  <section style="margin-top:20px;">
                    <a href="${replyMailto}" style="display:inline-block;background:#2D5A3D;color:#ffffff !important;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:8px;font-size:14px;line-height:1.3;max-width:100%;box-sizing:border-box;${cellWrap}">
                      Reply to Applicant
                    </a>
                  </section>
                </div>

                <footer style="background:#5C3D1E;color:#F5ECD7;padding:14px 16px;font-size:12px;line-height:1.45;${cellWrap}">
                  VisaHouse | Mumbai | visahouse.co.in
                </footer>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
