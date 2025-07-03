# 🦷 MyDent – Aligner Treatment Companion App

**MyDent** is a comprehensive **React Native** application that supports users throughout their **aligner treatment journey**. From virtual monitoring and educational content to appointment booking and oral care e-commerce, MyDent provides a seamless and engaging experience for patients, doctors, and administrators alike.

---

## 📱 Features Overview

### 👤 For Patients:
- 📚 **Educational Journey** – Learn every step of your treatment via structured, visual guides.
- 🗓️ **Appointment Booking** – Schedule consultations with certified experts.
- 📷 **Virtual Monitoring** – Upload progress photos and get feedback without clinic visits.
- 🛒 **Oral Care Shop** – Built-in e-commerce platform to purchase dental products and aligner essentials.
- 📈 **Progress Tracker** – View your aligner schedule and track treatment milestones.

### 🧑‍⚕️ Doctor Panel:
- 👨‍⚕️ Manage assigned patients and monitor their virtual check-ins.
- 📸 Review and approve patient-submitted images.
- 🗓️ Respond to appointment requests.
- 📢 Provide personalized recommendations and updates.

### 👨‍💼 Admin Panel:
- 🧾 Manage users, doctors, and appointment data.
- 🎬 Update educational video content and banners.
- 📦 Manage products for the e-commerce section.
- 🔐 Role-based access control for Admin and Doctor accounts.

---

## 🖼️ Screenshots

| 🏠 Home Screen |
|-----------------|
| ![Home](https://i.ibb.co/C3qbhRrP/home.png) |

| Appointment Booking | Video Consultation |
|---------------------|--------------------|
| ![Appointment Booking](https://i.ibb.co/HLnMfSrj/payment.png) | ![Video Consultation](https://i.ibb.co/ptyyLzN/video-consultation.png) |

| E-commerce | Product View | Mydent AI |
|------------|--------------|-----------|
| ![Product View](https://i.ibb.co/DfbVySjr/product-details.png) | ![E-commerce](https://i.ibb.co/4ZBBKP58/product-detail.png) | ![Mydent AI](https://i.ibb.co/jv0gnW9p/mydent-ai.png) |

| Patient Form | Why MyDent is Better |
|--------------|--------------|----------------------|
| ![Cart](https://i.ibb.co/rKT8t42R/patient-form.png) | ![Why MyDent is Better](https://i.ibb.co/7xVXqtn9/why-mydent-is-better-table.png) |

| Contact & Appointment |
|-----------------------|----------------|
| ![Contact](https://i.ibb.co/whRZR13p/doctor-appointment-contact-us.png) |

---

## 🚀 Tech Stack

- **Frontend:** React Native, TypeScript, React Navigation
- **Backend:** NestJS (for APIs), MongoDB
- **Authentication:** JWT-based (user, doctor, and admin roles)
- **Media Handling:** Multer + Cloudinary (or local storage)
- **State Management:** React Context API
- **E-commerce:** Custom cart, product categories, checkout integration

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/mydent.git
cd mydent
npm install
npx expo start --tunnel
