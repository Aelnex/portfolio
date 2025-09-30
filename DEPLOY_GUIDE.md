# 🚀 คำแนะนำติดตั้งแบบย่อ

## ขั้นตอนการ Deploy (5 นาทีเสร็จ!)

### 1️⃣ แก้ไขข้อมูลของคุณ

เปิดไฟล์ `src/Portfolio.jsx` แล้วแก้:
- ชื่อ, อีเมล, GitHub
- ข้อมูลโปรเจกต์
- Skills

### 2️⃣ แก้ไข package.json

บรรทัดที่ 4:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/portfolio"
```

### 3️⃣ สร้าง GitHub Repository

1. ไปที่ github.com
2. คลิก "New repository"
3. ตั้งชื่อ `portfolio`
4. **อย่า** เลือก "Add README"
5. Create repository

### 4️⃣ Upload โค้ด

```bash
cd /path/to/portfolio-folder

git init
git add .
git commit -m "My portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### 5️⃣ ติดตั้ง Dependencies และ Deploy

```bash
npm install
npm run deploy
```

### 6️⃣ เปิดใช้งาน GitHub Pages

1. ไปที่ repository → Settings → Pages
2. Source: เลือก `gh-pages` branch
3. Save
4. รอ 2-3 นาที
5. เปิด `https://YOUR_USERNAME.github.io/portfolio`

---

## 🔄 อัพเดตเว็บไซต์ภายหลัง

เมื่อแก้ไขโค้ด:
```bash
git add .
git commit -m "อธิบายการเปลี่ยนแปลง"
git push
npm run deploy
```

---

## ❗ หมายเหตุสำคัญ

- ต้องติดตั้ง Node.js และ Git ก่อน
- Username GitHub ต้องตรงกับที่ใช้ใน homepage
- Repository ชื่อ `portfolio` (หรือชื่ออื่นที่ตรงกับ homepage)

---

## 🆘 เจอปัญหา?

1. ตรวจสอบ homepage ใน package.json
2. ลอง `npm install` ใหม่
3. ลอง `npm run deploy` อีกครั้ง
4. รอ 5 นาที แล้วลอง refresh หน้าเว็บ

---

**สำเร็จแล้ว! 🎉**
