# 🌟 Portfolio Website - Trin Tantrakul

Portfolio website ส่วนตัวที่สร้างด้วย React และ TailwindCSS

## 📸 Preview

เว็บไซต์แสดงผลงาน โปรเจกต์ และข้อมูลติดต่อแบบครบครัน

## 🚀 การติดตั้งและรัน

### 1. Clone repository

```bash
git clone https://github.com/Aelnex/portfolio.git
cd portfolio
```

### 2. ติดตั้ง dependencies

```bash
npm install
```

### 3. รันในเครื่อง

```bash
npm start
```

เปิดเว็บได้ที่ [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy ไปยัง GitHub Pages

### ขั้นตอนที่ 1: เตรียม Repository

1. สร้าง repository ใหม่ใน GitHub ชื่อ `portfolio` (หรือชื่ออื่นตามต้องการ)
2. **อย่า** สร้าง README, .gitignore หรือ license (เพราะมีอยู่แล้ว)

### ขั้นตอนที่ 2: อัพเดตข้อมูลในโค้ด

แก้ไขไฟล์ `package.json` บรรทัดที่ 4:
```json
"homepage": "https://Aelnex.github.io/portfolio",
```
เปลี่ยน `Aelnex` เป็น username GitHub ของคุณ และ `portfolio` เป็นชื่อ repository

### ขั้นตอนที่ 3: Upload โค้ด

```bash
# เริ่มต้น git
git init
git add .
git commit -m "Initial commit: Portfolio website"

# เชื่อมต่อกับ GitHub (เปลี่ยน URL ให้ตรงกับของคุณ)
git remote add origin https://github.com/Aelnex/portfolio.git
git branch -M main
git push -u origin main
```

### ขั้นตอนที่ 4: Deploy

```bash
npm run deploy
```

คำสั่งนี้จะ:
- Build โปรเจกต์
- สร้าง branch `gh-pages` อัตโนมัติ
- Deploy ไปยัง GitHub Pages

### ขั้นตอนที่ 5: เปิดใช้งาน GitHub Pages

1. ไปที่ GitHub repository
2. คลิก **Settings** → **Pages**
3. ตรวจสอบว่า Source เป็น `gh-pages` branch
4. รอสักครู่ แล้วเปิด `https://USERNAME.github.io/portfolio`

## 🎨 ปรับแต่งเว็บไซต์

### แก้ไขข้อมูลส่วนตัว

เปิดไฟล์ `src/Portfolio.jsx` แล้วแก้:

```jsx
const profile = {
  name: "ชื่อของคุณ",
  role: "ตำแหน่ง/สถานะ",
  email: "อีเมลของคุณ",
  github: "https://github.com/username",
  image: "URL รูปของคุณ"
};
```

### เพิ่มโปรเจกต์

```jsx
const projects = [
  {
    title: "ชื่อโปรเจกต์",
    description: "คำอธิบาย",
    link: "URL สำหรับ demo",
    code: "GitHub URL",
    image: "URL รูปภาพ"
  },
  // เพิ่มเท่าที่ต้องการ...
];
```

### แก้ไข Skills

```jsx
const skills = [
  "HTML", "CSS", "JavaScript", 
  // เพิ่มทักษะของคุณ...
];
```

## 📝 เทคโนโลยีที่ใช้

- **React 18** - JavaScript library
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **GitHub Pages** - Free hosting

## 🔄 อัพเดตเว็บไซต์

เมื่อแก้ไขโค้ดแล้ว ให้รันคำสั่ง:

```bash
git add .
git commit -m "Update portfolio"
git push
npm run deploy
```

## 📱 Features

- ✅ Responsive design (ดูดีในทุกอุปกรณ์)
- ✅ Smooth scrolling
- ✅ Hover animations
- ✅ Modern UI/UX
- ✅ SEO friendly
- ✅ Fast loading

## 🆘 การแก้ปัญหา

### ปัญหา: `npm run deploy` ไม่ทำงาน

**วิธีแก้:**
```bash
npm install gh-pages --save-dev
npm run deploy
```

### ปัญหา: หน้าเว็บขึ้น 404

**วิธีแก้:**
1. ตรวจสอบ `homepage` ใน `package.json` ว่าถูกต้อง
2. ไปที่ Settings → Pages ตรวจสอบ branch เป็น `gh-pages`
3. รอ 2-3 นาที แล้วลองใหม่

### ปัญหา: CSS ไม่แสดงผล

**วิธีแก้:**
```bash
npm install tailwindcss postcss autoprefixer --save-dev
npm start
```

## 📄 License

Free to use for personal projects

## 👤 Author

**Trin Tantrakul**
- GitHub: [@Aelnex](https://github.com/Aelnex)
- Email: manuiopface@gmail.com

---

💡 **Tips:** แก้ไขข้อมูลให้เป็นของคุณเองก่อน deploy นะครับ!

Made with ❤️ by Trin
