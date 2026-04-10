import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Resend } from "resend";
import { generateEmailHTML } from "@/lib/email/applicationEmailTemplate";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const resend = new Resend(process.env.RESEND_API_KEY);

type UploadedDoc = {
  name: string;
  url: string;
  size: number;
  sizeInMB: number;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function uploadToCloudinary(file: File): Promise<UploadedDoc> {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "visahouse/applications",
          public_id: `${Date.now()}_${file.name}`,
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }

          resolve({
            name: file.name,
            url: result.secure_url,
            size: file.size,
            sizeInMB: Math.round((file.size / (1024 * 1024)) * 10) / 10,
          });
        }
      );

      uploadStream.end(buffer);
    } catch (error) {
      reject(error);
    }
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phoneNumber: String(formData.get("phoneNumber") ?? ""),
      passportNationality: String(formData.get("passportNationality") ?? ""),
      destinationCountry: String(formData.get("destinationCountry") ?? ""),
      preferredTravelDate: String(formData.get("preferredTravelDate") ?? ""),
      numberOfDaysOfStay: String(formData.get("numberOfDaysOfStay") ?? ""),
      visaType: String(formData.get("visaType") ?? ""),
      totalTravellers: String(formData.get("totalTravellers") ?? ""),
      numberOfAdults: String(formData.get("numberOfAdults") ?? ""),
      numberOfChildren: String(formData.get("numberOfChildren") ?? ""),
    };

    if (!data.name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!/^\d{10}$/.test(data.phoneNumber)) {
      return NextResponse.json({ error: "Phone number must be exactly 10 digits" }, { status: 400 });
    }

    const files = formData.getAll("documents").filter((item): item is File => item instanceof File);
    const uploadedDocs = files.length
      ? await Promise.all(files.map((file) => uploadToCloudinary(file)))
      : [];

    const from = process.env.EMAIL_FROM?.trim();
    const adminRecipients = [process.env.ADMIN_EMAIL1, process.env.ADMIN_EMAIL2]
      .map((e) => e?.trim())
      .filter((e): e is string => Boolean(e && isValidEmail(e)));

    if (!from) {
      console.error("Application submission failed: EMAIL_FROM is not set");
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }

    if (!process.env.RESEND_API_KEY?.trim()) {
      console.error("Application submission failed: RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }

    if (adminRecipients.length === 0) {
      console.error("Application submission failed: no valid ADMIN_EMAIL1 / ADMIN_EMAIL2");
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }

    const { error: resendError } = await resend.emails.send({
      from,
      to: adminRecipients,
      replyTo: data.email,
      subject: `New Visa Application — ${data.destinationCountry} | ${data.name}`,
      html: generateEmailHTML(data, uploadedDocs),
    });

    if (resendError) {
      console.error("Resend API error:", resendError);
      return NextResponse.json({ error: "Failed to submit application" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application submission failed:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
