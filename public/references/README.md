# 📁 /public/references/ — Reference Images for Document Cards

This folder contains the sample images shown inside the **"View sample document"** modal
on the VisaHouse website. When a user clicks a document card (e.g. Passport Front Page),
a modal pops up showing wrong vs. correct examples using images from this folder.

---

## 🗂️ How This Folder Is Organized

```
public/
└── references/
    ├── README.md                        ← You are here
    │
    ├── passport-front-correct.jpg       ← ✅ Correct passport scan example
    ├── passport-front-wrong-flash.jpg   ← ❌ Wrong: camera flash/glare
    ├── passport-front-wrong-blurry.jpg  ← ❌ Wrong: blurry/out of focus
    ├── passport-front-wrong-angled.jpg  ← ❌ Wrong: passport held at angle
    │
    ├── passport-back-correct.jpg        ← ✅ Correct back page scan
    ├── passport-back-wrong.jpg          ← ❌ Wrong back page example
    │
    ├── photo-correct.jpg                ← ✅ Correct passport photo
    ├── photo-wrong-shadow.jpg           ← ❌ Wrong: shadow on face
    ├── photo-wrong-coloured-bg.jpg      ← ❌ Wrong: coloured background
    ├── photo-wrong-glasses.jpg          ← ❌ Wrong: sunglasses worn
    │
    └── (add more as needed per country) ← Follow naming pattern below
```

---

## ✅ How to Add a New Reference Image

### Step 1 — Prepare the image

- Format: **JPG or PNG** (JPG preferred, smaller file size)
- Size: Minimum **600×400px**, maximum **1200×800px**
- File size: Keep under **300KB** per image (compress at tinypng.com if needed)
- Background: Use real document samples with faces/details blurred for privacy

### Step 2 — Name the file correctly

Follow this naming pattern:

```
[document-id]-[correct/wrong]-[reason].jpg
```

Examples:

```
passport-front-correct.jpg
passport-front-wrong-flash.jpg
passport-front-wrong-fingers.jpg
photo-correct.jpg
photo-wrong-shadow.jpg
bank-statement-correct.jpg
bank-statement-wrong-old.jpg
```

### Step 3 — Drop the file into this folder

Just drag and drop the image file into `/public/references/` in your project folder.

### Step 4 — Update the data file

Open this file:

```
lib/data/visaDocuments.ts
```

Find the document entry (e.g. `passport-front`) and update the `referenceImage` block:

```typescript
referenceImage: {
  wrongExamples: [
    '/references/passport-front-wrong-flash.jpg',    // ← add your wrong image paths here
    '/references/passport-front-wrong-blurry.jpg',
    '/references/passport-front-wrong-angled.jpg',
  ],
  correctExample: '/references/passport-front-correct.jpg',  // ← correct image path
  rules: [
    'No camera flash or glare',
    'Flat, straight scan only',
    // ... keep existing rules or add new ones
  ]
}
```

**That's it. No other file needs to be changed.**

---

## ⚠️ Important Rules

| Rule                | Details                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Privacy**         | Never upload real passport images with personal details visible. Always blur/redact names, DOB, passport numbers. |
| **Watermark**       | Add a "SAMPLE" watermark over correct examples to prevent misuse.                                                 |
| **File naming**     | Use only lowercase letters, numbers, and hyphens. No spaces. No underscores.                                      |
| **Wrong examples**  | Always have at least 1 wrong example per document that has a referenceImage entry.                                |
| **Correct example** | Only one correct example per document (the modal layout shows one correct image).                                 |

---

## 📋 Current Image Paths Used in visaDocuments.ts

Copy this checklist and tick off images as you add them:

### Passport Front Page

- [ ] `/references/passport-front-correct.jpg`
- [ ] `/references/passport-front-wrong-flash.jpg`
- [ ] `/references/passport-front-wrong-blurry.jpg`
- [ ] `/references/passport-front-wrong-angled.jpg`

### Passport Back Page

- [ ] `/references/passport-back-correct.jpg`
- [ ] `/references/passport-back-wrong.jpg`

### Passport-Size Photograph

- [ ] `/references/photo-correct.jpg`
- [ ] `/references/photo-wrong-shadow.jpg`
- [ ] `/references/photo-wrong-coloured-bg.jpg`
- [ ] `/references/photo-wrong-glasses.jpg`

---

## 🤝 Who manages this folder?

This folder is managed by the **VisaHouse content team** — no developer needed to add or update images.
If image paths don't match what's in `visaDocuments.ts`, the modal will show a placeholder box
with the expected filename, so you'll know exactly which image is missing.

---

_Last updated: June 2025 | Maintained by VisaHouse_
