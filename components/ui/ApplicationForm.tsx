"use client";

import * as React from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDropzone } from "react-dropzone";
import { CheckCircle2, UploadCloud, X } from "lucide-react";
import { ALL_COUNTRY_OPTIONS, countryFilterOption, VISA_COUNTRIES } from "@/lib/data/countries";
import type { ApplicationFormData } from "@/lib/types/application";
import { CountryFlag } from "@/components/ui/CountryFlag";

interface ApplicationFormProps {
  title?: string;
  subtitle?: string;
  defaultDestination?: string;
  compact?: boolean;
}

interface UploadedFile {
  file: File;
  id: string;
  preview: string | null;
  sizeInMB: number;
  isValid: boolean;
}

type CountryOption = {
  value: string;
  label: string;
  data: {
    code: string;
    name: string;
    flag: string;
    dialCode: string;
    searchAliases?: string[];
  };
};

type DestinationOption = CountryOption | { label: string; value: string; __isNew__: true };

type FocusableElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const todayString = () => new Date().toISOString().split("T")[0];

const visaTypeOptions: ApplicationFormData["visaType"][] = [
  "Tourist",
  "Business",
  "Student",
  "Work Permit",
  "Transit",
  "Immigration",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "var(--cream-white)",
  border: "1px solid rgba(201,169,110,0.6)",
  borderRadius: "10px",
  fontSize: "15px",
  fontFamily: "var(--font-body)",
  color: "var(--text-primary)",
  outline: "none",
  boxShadow: "inset 0 2px 6px rgba(92,61,30,0.1)",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
};

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: "var(--cream-white)",
    border: state.isFocused ? "1.5px solid var(--accent-gold)" : "1px solid rgba(201,169,110,0.6)",
    boxShadow: state.isFocused
      ? "0 0 0 3px rgba(201,151,58,0.2), inset 0 2px 4px rgba(92,61,30,0.1)"
      : "inset 0 2px 4px rgba(92,61,30,0.1)",
    borderRadius: "10px",
    minHeight: "44px",
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    color: "var(--text-primary)",
    cursor: "pointer",
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isSelected
      ? "var(--accent-gold)"
      : state.isFocused
        ? "var(--wood-mid)"
        : "var(--cream-white)",
    color: state.isSelected ? "white" : "var(--text-primary)",
    fontSize: "14px",
    cursor: "pointer",
    padding: "10px 14px",
  }),
  menu: (base: any) => ({
    ...base,
    background: "var(--cream-white)",
    border: "1px solid rgba(201,169,110,0.6)",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(92,61,30,0.18)",
    zIndex: 9999,
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "var(--text-primary)",
    fontSize: "15px",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "var(--text-muted)",
    fontSize: "15px",
  }),
  input: (base: any) => ({
    ...base,
    color: "var(--text-primary)",
  }),
};

const fieldGroupStyle: React.CSSProperties = { marginBottom: "20px" };
const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontWeight: 600,
  fontSize: "14px",
  color: "var(--text-primary)",
};
const errorStyle: React.CSSProperties = { color: "#dc2626", fontSize: "12px", marginTop: "4px" };

const applyFocusStyles = (e: React.FocusEvent<FocusableElement>) => {
  e.currentTarget.style.border = "1.5px solid var(--accent-gold)";
  e.currentTarget.style.boxShadow =
    "0 0 0 3px rgba(201,151,58,0.15), inset 0 2px 4px rgba(92,61,30,0.08)";
};

const clearFocusStyles = (e: React.FocusEvent<FocusableElement>) => {
  e.currentTarget.style.border = "1px solid rgba(201,169,110,0.6)";
  e.currentTarget.style.boxShadow = "inset 0 2px 6px rgba(92,61,30,0.1)";
};

const findCountryByNameOrAlias = (query?: string) => {
  if (!query) return undefined;
  const needle = query.toLowerCase();
  return VISA_COUNTRIES.find(
    (country) =>
      country.name.toLowerCase() === needle ||
      country.code.toLowerCase() === needle ||
      country.searchAliases?.some((alias) => alias.toLowerCase() === needle)
  );
};

const getSizeBarColor = (sizeInMB: number) => {
  if (sizeInMB > 15) return "linear-gradient(90deg,#ef4444,#dc2626)";
  if (sizeInMB >= 10) return "linear-gradient(90deg,#f59e0b,#d97706)";
  return "linear-gradient(90deg,#22c55e,#16a34a)";
};

const getSizeBarWidth = (sizeInMB: number) => `${Math.min((sizeInMB / 15) * 100, 100)}%`;

export function ApplicationForm({
  title = "Start Your Application",
  subtitle = "Our expert calls you within 24 hours",
  defaultDestination,
  compact = false,
}: ApplicationFormProps) {
  const defaultPassport = React.useMemo(() => findCountryByNameOrAlias("India"), []);
  const defaultDestinationCountry = React.useMemo(
    () => findCountryByNameOrAlias(defaultDestination),
    [defaultDestination]
  );

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [dropError, setDropError] = React.useState("");
  const [buttonPressed, setButtonPressed] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      passportNationality: defaultPassport?.name ?? "India",
      destinationCountry: defaultDestinationCountry?.name ?? "",
      preferredTravelDate: "",
      numberOfDaysOfStay: "",
      visaType: "Tourist",
      totalTravellers: 1,
      numberOfAdults: 1,
      numberOfChildren: 0,
      documents: [],
    },
  });

  const totalTravellers = watch("totalTravellers");
  const numberOfAdults = watch("numberOfAdults");
  const phoneNumber = watch("phoneNumber");

  const validDocs = React.useMemo(
    () => uploadedFiles.filter((uploaded) => uploaded.isValid).map((uploaded) => uploaded.file),
    [uploadedFiles]
  );

  React.useEffect(() => {
    setValue("documents", validDocs, { shouldValidate: true });
  }, [validDocs, setValue]);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setDropError("");
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => {
      const sizeInMB = file.size / (1024 * 1024);
      const isImage = file.type.startsWith("image/");
      return {
        file,
        id: `${Date.now()}_${Math.random()}`,
        preview: isImage ? URL.createObjectURL(file) : null,
        sizeInMB: Math.round(sizeInMB * 10) / 10,
        isValid: sizeInMB <= 15,
      };
    });
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  React.useEffect(() => {
    return () => {
      uploadedFiles.forEach((uploaded) => {
        if (uploaded.preview) URL.revokeObjectURL(uploaded.preview);
      });
    };
  }, [uploadedFiles]);

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const removing = prev.find((uploaded) => uploaded.id === id);
      if (removing?.preview) URL.revokeObjectURL(removing.preview);
      return prev.filter((uploaded) => uploaded.id !== id);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: true,
    onDropRejected: () => {
      setDropError("Some files were rejected: max 15MB, PDF/JPG/PNG only");
    },
  });

  const updateTravellers = (nextTotal: number) => {
    const clamped = Math.min(20, Math.max(1, nextTotal));
    const adults = Math.min(getValues("numberOfAdults"), clamped);
    const safeAdults = Math.max(1, adults);
    setValue("totalTravellers", clamped, { shouldValidate: true });
    setValue("numberOfAdults", safeAdults, { shouldValidate: true });
    setValue("numberOfChildren", clamped - safeAdults, { shouldValidate: true });
  };

  const updateAdults = (nextAdults: number) => {
    const clamped = Math.max(1, Math.min(nextAdults, getValues("totalTravellers")));
    const total = getValues("totalTravellers");
    setValue("numberOfAdults", clamped, { shouldValidate: true });
    setValue("numberOfChildren", total - clamped, { shouldValidate: true });
  };

  const onInvalid = (formErrors: FieldErrors<ApplicationFormData>) => {
    const firstKey = Object.keys(formErrors)[0];
    if (!firstKey) return;
    document.getElementById(`${firstKey}-field`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    if (data.numberOfAdults + data.numberOfChildren !== data.totalTravellers) {
      setSubmitError("Travellers count mismatch. Please check adults and children.");
      setIsSubmitting(false);
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "documents") formData.append(key, String(value));
      });
      data.documents?.forEach((file) => formData.append("documents", file));
      const response = await fetch("/api/apply", { method: "POST", body: formData });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Submission failed");
      }
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setIsSubmitting(false);
      setButtonPressed(false);
    }
  };

  const resetForm = () => {
    uploadedFiles.forEach((uploaded) => {
      if (uploaded.preview) URL.revokeObjectURL(uploaded.preview);
    });
    setUploadedFiles([]);
    setDropError("");
    setSubmitError("");
    setIsSuccess(false);
    reset({
      name: "",
      email: "",
      phoneNumber: "",
      passportNationality: defaultPassport?.name ?? "India",
      destinationCountry: defaultDestinationCountry?.name ?? "",
      preferredTravelDate: "",
      numberOfDaysOfStay: "",
      visaType: "Tourist",
      totalTravellers: 1,
      numberOfAdults: 1,
      numberOfChildren: 0,
      documents: [],
    });
  };

  if (isSuccess) {
    return (
      <div className="sku-surface wood-grain p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-display text-2xl text-accent-navy">Application Submitted! 🎉</h3>
            <p className="mt-2 font-body text-sm text-text-secondary">
              Our visa expert will contact you within 24 hours on +91{phoneNumber}.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-5 inline-flex items-center rounded-md bg-[var(--accent-gold)] px-4 py-2 font-body font-semibold text-white shadow-sku-raised transition hover:translate-y-px hover:shadow-sku-pressed"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sku-surface wood-grain" style={{ padding: compact ? "16px" : "24px 28px" }}>
      <div style={{ marginBottom: compact ? "16px" : "24px" }}>
        <h3 className="font-display text-accent-navy" style={{ fontSize: compact ? "22px" : "28px" }}>
          {title}
        </h3>
        <p className="font-body text-text-secondary" style={{ marginTop: "4px", fontSize: compact ? "14px" : "15px" }}>
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <FormField id="name-field" label="Full Name" error={errors.name?.message}>
          <input
            {...register("name", {
              required: "Full name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
            placeholder="Your full name"
            style={inputStyle}
            onFocus={applyFocusStyles}
            onBlur={clearFocusStyles}
          />
        </FormField>

        <FormField id="email-field" label="Email Address" error={errors.email?.message}>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
            })}
            placeholder="you@example.com"
            style={inputStyle}
            onFocus={applyFocusStyles}
            onBlur={clearFocusStyles}
          />
        </FormField>

        <FormField id="phoneNumber-field" label="Phone Number" error={errors.phoneNumber?.message}>
          <div style={{ display: "flex" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "10px 0 0 10px",
                border: "1px solid rgba(201,169,110,0.6)",
                borderRight: "none",
                background: "#f3f4f6",
                padding: "0 12px",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              +91
            </span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: { value: /^\d{10}$/, message: "Phone number must be exactly 10 digits" },
              })}
              onInput={(e) => {
                const target = e.currentTarget;
                target.value = target.value.replace(/\D/g, "").slice(0, 10);
              }}
              style={{ ...inputStyle, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              onFocus={applyFocusStyles}
              onBlur={clearFocusStyles}
              placeholder="6260440241"
            />
          </div>
        </FormField>

        <FormField id="passportNationality-field" label="Passport Nationality" error={errors.passportNationality?.message}>
          <Controller
            control={control}
            name="passportNationality"
            rules={{ required: "Passport nationality is required" }}
            render={({ field }) => (
              <Select
                styles={selectStyles}
                options={ALL_COUNTRY_OPTIONS}
                value={ALL_COUNTRY_OPTIONS.find((option) => option.data.name === field.value) ?? null}
                onChange={(option) => field.onChange((option as CountryOption | null)?.data.name ?? "")}
                placeholder="Select nationality"
                isSearchable
                filterOption={(option, inputValue) =>
                  countryFilterOption({ data: option.data.data }, inputValue)
                }
                formatOptionLabel={(option: CountryOption) => (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "2px 0" }}>
                    <CountryFlag flag={option.data.flag} size={20} />
                    <span style={{ fontSize: "14px", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>
                      {option.data.name}
                    </span>
                  </div>
                )}
              />
            )}
          />
        </FormField>

        <FormField id="destinationCountry-field" label="Destination Country" error={errors.destinationCountry?.message}>
          <Controller
            control={control}
            name="destinationCountry"
            rules={{ required: "Destination country is required" }}
            render={({ field }) => {
              const destinationValue: DestinationOption | null = field.value
                ? ALL_COUNTRY_OPTIONS.find((option) => option.data.name === field.value) ?? {
                    label: field.value,
                    value: field.value,
                    __isNew__: true,
                  }
                : null;

              return (
                <CreatableSelect<DestinationOption, false>
                  styles={selectStyles}
                  options={ALL_COUNTRY_OPTIONS}
                  value={destinationValue}
                  onChange={(option) => {
                    if (!option) {
                      field.onChange("");
                      return;
                    }
                    if ("__isNew__" in option && option.__isNew__) {
                      field.onChange(String(option.value).trim());
                      return;
                    }
                    field.onChange((option as CountryOption).data.name);
                  }}
                  placeholder="Search or type any destination"
                  isSearchable
                  isClearable
                  createOptionPosition="first"
                  formatCreateLabel={(inputValue) => `Use "${inputValue.trim()}"`}
                  isValidNewOption={(inputValue) => {
                    const q = inputValue.trim();
                    if (!q) return false;
                    return !ALL_COUNTRY_OPTIONS.some((o) => o.data.name.toLowerCase() === q.toLowerCase());
                  }}
                  filterOption={(option, inputValue) => {
                    const row = option.data;
                    if (row && "__isNew__" in row && row.__isNew__) return false;
                    if (row && "data" in row && row.data) {
                      return countryFilterOption({ data: row.data }, inputValue);
                    }
                    return true;
                  }}
                  noOptionsMessage={() => "Pick a match or type any destination and choose Use \"…\" above"}
                  formatOptionLabel={(option) => {
                    if ("data" in option && option.data && "flag" in option.data) {
                      const co = option as CountryOption;
                      return (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "2px 0" }}>
                          <CountryFlag flag={co.data.flag} size={20} />
                          <span style={{ fontSize: "14px", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>
                            {co.data.name}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <span style={{ fontSize: "14px", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>
                        {option.label}
                      </span>
                    );
                  }}
                />
              );
            }}
          />
        </FormField>

        <FormField id="preferredTravelDate-field" label="Preferred Travel Date" error={errors.preferredTravelDate?.message}>
          <input
            type="date"
            min={todayString()}
            {...register("preferredTravelDate", {
              required: "Preferred travel date is required",
              validate: (value) => (value >= todayString() ? true : "Travel date cannot be in the past"),
            })}
            style={inputStyle}
            onFocus={applyFocusStyles}
            onBlur={clearFocusStyles}
          />
        </FormField>

        <FormField id="numberOfDaysOfStay-field" label="Number of Days of Stay" error={errors.numberOfDaysOfStay?.message}>
          <input
            type="number"
            min={1}
            max={365}
            placeholder="e.g. 7"
            {...register("numberOfDaysOfStay", {
              required: "Number of days is required",
              validate: (value) => {
                const parsed = Number(value);
                if (!Number.isFinite(parsed) || parsed < 1 || parsed > 365) {
                  return "Enter a value between 1 and 365";
                }
                return true;
              },
            })}
            style={inputStyle}
            onFocus={applyFocusStyles}
            onBlur={clearFocusStyles}
          />
        </FormField>

        <FormField id="visaType-field" label="Visa Type" error={errors.visaType?.message}>
          <select
            {...register("visaType", { required: "Visa type is required" })}
            style={inputStyle}
            onFocus={applyFocusStyles}
            onBlur={clearFocusStyles}
          >
            {visaTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="totalTravellers-field" label="Number of Travellers (Total)" error={errors.totalTravellers?.message}>
          <Stepper value={totalTravellers} onMinus={() => updateTravellers(totalTravellers - 1)} onPlus={() => updateTravellers(totalTravellers + 1)} />
          <input
            type="hidden"
            {...register("totalTravellers", {
              valueAsNumber: true,
              min: { value: 1, message: "At least 1 traveller is required" },
              max: { value: 20, message: "Maximum 20 travellers allowed" },
            })}
          />
        </FormField>

        <FormField id="numberOfAdults-field" label="Number of Adults (18+)" error={errors.numberOfAdults?.message}>
          <Stepper value={numberOfAdults} onMinus={() => updateAdults(numberOfAdults - 1)} onPlus={() => updateAdults(numberOfAdults + 1)} />
          <input
            type="hidden"
            {...register("numberOfAdults", {
              valueAsNumber: true,
              min: { value: 1, message: "At least 1 adult is required" },
              validate: (value) => value <= getValues("totalTravellers") || "Adults cannot exceed total travellers",
            })}
          />
        </FormField>

        <FormField id="numberOfChildren-field" label="Children (auto-calculated)" error={errors.numberOfChildren?.message}>
          <input
            readOnly
            {...register("numberOfChildren", {
              valueAsNumber: true,
              validate: (value) =>
                value === getValues("totalTravellers") - getValues("numberOfAdults")
                || "Children count must match total travellers - adults",
            })}
            style={{ ...inputStyle, background: "#f3f4f6", color: "#6b7280" }}
          />
        </FormField>

        <FormField id="documents-field" label="Document Upload Zone" error={undefined}>
          {uploadedFiles.length === 0 ? (
            <div
              {...getRootProps()}
              style={{
                border: `2px dashed ${isDragActive ? "var(--accent-gold)" : "var(--wood-dark)"}`,
                background: isDragActive ? "rgba(201,151,58,0.06)" : "var(--cream-white)",
                borderRadius: "16px",
                padding: "40px 24px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                transform: isDragActive ? "scale(1.01)" : "scale(1)",
              }}
            >
              <input {...getInputProps()} />
              <UploadCloud size={48} style={{ margin: "0 auto 12px", color: "var(--text-primary)" }} />
              <p style={{ fontSize: "16px", color: "var(--text-primary)", margin: 0 }}>
                Drag & drop your documents here
              </p>
              <p style={{ fontSize: "16px", color: "var(--text-primary)", margin: "2px 0 0" }}>
                or click to browse files
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "10px 0 0" }}>
                PDF, JPG, PNG  •  Max 15MB per file
              </p>
            </div>
          ) : (
            <>
              <div
                {...getRootProps()}
                style={{
                  border: `2px dashed ${isDragActive ? "var(--accent-gold)" : "var(--wood-dark)"}`,
                  background: isDragActive ? "rgba(201,151,58,0.06)" : "var(--cream-white)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  marginBottom: "12px",
                }}
              >
                <input {...getInputProps()} />
                <p style={{ margin: 0, fontSize: "14px", color: "var(--text-primary)", fontWeight: 600 }}>
                  Add more documents
                </p>
              </div>

              <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                {uploadedFiles.map((uploaded) => (
                  <div
                    key={uploaded.id}
                    style={{
                      background: "var(--card-gradient)",
                      border: uploaded.isValid ? "var(--sku-border)" : "2px solid #dc2626",
                      borderRadius: "12px",
                      boxShadow: "var(--sku-shadow-card)",
                      overflow: "hidden",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => removeFile(uploaded.id)}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "28px",
                        height: "28px",
                        borderRadius: "999px",
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                    >
                      <X size={14} color="#dc2626" />
                    </button>

                    {uploaded.preview ? (
                      <img src={uploaded.preview} alt={uploaded.file.name} style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block" }} />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "16 / 9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#fee2e2",
                          color: "#dc2626",
                          fontSize: "40px",
                        }}
                      >
                        📄
                      </div>
                    )}

                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {uploaded.file.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{uploaded.sizeInMB} MB</div>
                      <div style={{ height: "4px", borderRadius: "2px", background: "#e5e7eb", marginTop: "8px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: getSizeBarWidth(uploaded.sizeInMB), background: getSizeBarColor(uploaded.sizeInMB) }} />
                      </div>
                      {!uploaded.isValid ? (
                        <div style={{ marginTop: "8px", color: "#dc2626", fontSize: "12px", fontWeight: 600 }}>
                          File too large (max 15MB)
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {dropError ? <p style={errorStyle}>{dropError}</p> : null}
        </FormField>

        {submitError ? <p style={errorStyle}>{submitError}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            display: "block",
            width: "100%",
            padding: "16px 32px",
            background: isSubmitting
              ? "var(--wood-dark)"
              : "linear-gradient(145deg, #E8B84B 0%, #C9973A 50%, #B8832A 100%)",
            color: "white",
            border: "1px solid #A0702A",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: "var(--font-body)",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            boxShadow: isSubmitting
              ? "none"
              : buttonPressed
                ? "inset 0 2px 4px rgba(92,61,30,0.3)"
                : "0 1px 0 rgba(255,255,255,0.7) inset, 0 4px 12px rgba(92,61,30,0.3)",
            transition: "all 0.15s ease",
            letterSpacing: "0.3px",
            transform: buttonPressed ? "translateY(1px)" : "none",
          }}
          onMouseDown={(e) => {
            if (!isSubmitting) {
              setButtonPressed(true);
              (e.target as HTMLButtonElement).style.transform = "translateY(1px)";
            }
          }}
          onMouseUp={(e) => {
            setButtonPressed(false);
            (e.target as HTMLButtonElement).style.transform = "";
          }}
          onMouseLeave={() => setButtonPressed(false)}
        >
          {isSubmitting ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" fill="none" strokeDasharray="31.4" strokeDashoffset="10" />
              </svg>
              Sending Application...
            </span>
          ) : (
            "Submit Application →"
          )}
        </button>
      </form>
    </div>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error ? <p style={errorStyle}>{error}</p> : null}
    </div>
  );
}

function Stepper({
  value,
  onMinus,
  onPlus,
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
      <button
        type="button"
        onClick={onMinus}
        style={{
          width: "40px",
          height: "40px",
          background: "var(--wood-mid)",
          border: "1px solid var(--wood-dark)",
          borderRadius: "10px 0 0 10px",
          fontSize: "20px",
          fontWeight: 300,
          cursor: "pointer",
          color: "var(--text-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        −
      </button>
      <div
        style={{
          width: "56px",
          height: "40px",
          background: "var(--cream-white)",
          border: "1px solid var(--wood-dark)",
          borderLeft: "none",
          borderRight: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: 700,
          color: "var(--text-primary)",
        }}
      >
        {value}
      </div>
      <button
        type="button"
        onClick={onPlus}
        style={{
          width: "40px",
          height: "40px",
          background: "var(--accent-gold)",
          border: "1px solid #A0702A",
          borderRadius: "0 10px 10px 0",
          fontSize: "20px",
          fontWeight: 300,
          cursor: "pointer",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        +
      </button>
    </div>
  );
}
